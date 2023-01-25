import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Auth } from 'src/app/auth/auth';
import { Teams } from 'src/app/interface/teams';
import { AggiungiPlayer, Club, Rose, RoseTeam, Search, SearchPlayer, SearchStatistics } from './rose';
import { RoseService } from './rose.service';

@Component({
  selector: 'app-rosa',
  templateUrl: './rosa.component.html',
  styleUrls: ['./rosa.component.scss']
})
export class RosaComponent implements OnInit {

  

  giocatori!: RoseTeam[]
  position!: string
  a!: string
  name!: string
  search!: string
  searchPlayer!: SearchPlayer[]
  searchStat!: SearchStatistics

  arrayVuoto:any[]=[]

  team!: Teams[]

  isFav: boolean = false
  preferiti: any

  @ViewChild('user') user!: Auth
  @Input() p!:RoseTeam

  id!:number
  idLega!:number
  count: number = 0
  paga:any[]=[]
  serieA = [492,489,496,487, 505, 497, 494]
    options = {
      headers: {
        'X-RapidAPI-Key': '0bdbd40b81mshff3b7e623d1c230p103862jsn8f8e68750807',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    }
    path = `https://api-football-v1.p.rapidapi.com/v3/players/squads?team=`


  constructor(private roseSrv: RoseService, private route: ActivatedRoute,private http:HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let stringId: any = params.get("id");
      this.idLega = parseFloat(stringId)
      this.addPlayer()
      this.getPlayerAdd()  
    })
    this.allSerieA()
    this.scroll()
  }

  scroll(){
    let top = document.getElementById('top')
    window.onscroll = function (){
      if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
        top!.classList.remove('d-none')
      }else{
        top!.classList.add('d-none')
      }
    }
  }

  top(){
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0;
  }

  reload() {
    location.reload()
  }
  calcola(budget: NgForm, id: number) {
    let user:any = localStorage.getItem('user')
      let utente = JSON.parse(user)
      let uId = utente.user.id

      let data: AggiungiPlayer = {
        legaId: this.idLega,
        playerId: id,
        userId: uId,
        paid: budget.value.budget
      }

      this.roseSrv.getSquad().subscribe(res => {
        let favorities = res
        if (favorities.length < 25) {
          this.roseSrv.newPlayer(data).subscribe(res => {
            console.log(res);
            budget.reset()
            this.isFav = true
            this.addPlayer()
            this.getPlayerAdd()
          })
        } else {
          let errore = document.getElementById('errore')
          errore!.classList.remove('d-none')
          errore!.addEventListener("click", function () {
            errore!.remove();
          })
          return
        }
      })
  }


  // CONTA I LIKE
  getPlayerAdd() {
    this.roseSrv.getConutFav(this.id).subscribe(res => {
      let lunghezza = res
      this.count = lunghezza.length
    })
  }

  addPlayer() {
    this.roseSrv.getSquad().subscribe(res => {
      let favorities = res
      for(let i = 0; i < this.searchPlayer.length; i++){
        let f = favorities.find((a: any) => a.playerId == this.searchPlayer[i].player.id && a.legaId == this.idLega)
        if (f) {
          this.isFav = true
          this.preferiti = f
          console.log(this.preferiti);
          return
        } else {
          this.isFav = false
        }
      } 
    })
  }


  rimuoviLike() {
    this.roseSrv.deleteGiocatore(this.preferiti.id).subscribe(res => {
      console.log(res);
    })
    this.isFav = false
    this.count--
  }
  


  cerca(s: NgForm) {
    let data: Search = {
      search: s.value.search
    }
    this.roseSrv.fetchSearch(data.search).subscribe(res => {
      let container = document.getElementById('all')
      this.searchPlayer = res.response
      console.log(this.searchPlayer);
      
      this.searchStat = res.response[0].statistics[0]
      container!.innerHTML = ''
    })
  }

  searchForm() {
    let input = document.querySelector('.searchBar')
    let icon = document.querySelector('.fa-search')
    input?.classList.toggle('d-none')
    icon?.classList.toggle('right')
  }

  allSerieA(){
    this.serieA.forEach(el => {   
        return this.http.get<Rose>(this.path + el, this.options).subscribe(res => {
          this.giocatori = res.response[0].players
          this.giocatori.forEach(el=>{
            let b = this.arrayVuoto.push(el)
            console.log(el);
          })
        })
      })
  }

}
