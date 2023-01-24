import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Club, Rose, RoseTeam, Search, SearchPlayer, SearchStatistics } from 'src/app/components/rosa/rose';
import { RoseService } from 'src/app/components/rosa/rose.service';
import { Teams } from 'src/app/interface/teams';
import { NewsService } from 'src/app/service/news.service';


@Component({
  selector: 'app-listone',
  templateUrl: './listone.component.html',
  styleUrls: ['./listone.component.scss']
})
export class ListoneComponent implements OnInit {

  giocatori!: RoseTeam[]
  position!: string
  a!: string
  name!: string
  id!: number
  search!: string
  searchPlayer!: SearchPlayer[]
  searchStat!: SearchStatistics

  team!: Teams[]

  arrayVuoto:any[]=[]

  serieA = [492,489,496,487, 505, 497, 494,502,502,488]
  options = {
    headers: {
      'X-RapidAPI-Key': '0bdbd40b81mshff3b7e623d1c230p103862jsn8f8e68750807',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  }
  path = `https://api-football-v1.p.rapidapi.com/v3/players/squads?team=`
  constructor(private http:HttpClient, private roseSrv: RoseService) { }

  ngOnInit(): void {
   this.allSerieA()
  }

  back(){
    history.back()
  }

  reload() {
    location.reload()
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


  cerca(s: NgForm) {
    let data: Search = {
      search: s.value.search
    }
    this.roseSrv.fetchSearch(data.search).subscribe(res => {
      let container = document.getElementById('all')
      this.searchPlayer = res.response
      if(data.search.length < 4){
        console.log(this.searchPlayer); 
        let errore = document.getElementById('errore')
        errore!.classList.remove('d-none')
        errore!.addEventListener("click", function() {
        errore!.remove();
        })
      }else{
        this.searchStat = res.response[0].statistics[0]
        container!.innerHTML = ''
      }
    })
  }

  searchForm() {
    let input = document.querySelector('.searchBar')
    let icon = document.querySelector('.fa-search')
    input?.classList.toggle('d-none')
    icon?.classList.toggle('right')
  }

 
}
