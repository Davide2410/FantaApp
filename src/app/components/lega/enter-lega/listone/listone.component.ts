import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Club, RoseTeam, Search, SearchPlayer, SearchStatistics } from 'src/app/components/rosa/rose';
import { RoseService } from 'src/app/components/rosa/rose.service';
import { Teams } from 'src/app/interface/teams';
import { NewsService } from 'src/app/service/news.service';


@Component({
  selector: 'app-listone',
  templateUrl: './listone.component.html',
  styleUrls: ['./listone.component.scss']
})
export class ListoneComponent implements OnInit {

  giocatoriNapoli!: RoseTeam[]
  napoli!: Club

  giocatoriRoma!: RoseTeam[]
  roma!: Club

  giocatoriMilan!: RoseTeam[]
  milan!: Club

  giocatoriJuve!: RoseTeam[]
  juve!: Club

  giocatoriLazio!: RoseTeam[]
  lazio!: Club

  giocatoriInter!: RoseTeam[]
  inter!: Club

  giocatoriAtalanta!: RoseTeam[]
  atalanta!: Club

  giocatoriUdinese!: RoseTeam[]
  udinese!: Club

  giocatoriTorino!: RoseTeam[]
  torino!: Club

  giocatoriFiorentina!: RoseTeam[]
  fiorentina!: Club

  giocatoriBologna!: RoseTeam[]
  bologna!: Club

  giocatoriSalernitana!: RoseTeam[]
  salernitana!: Club

  giocatoriEmpoli!: RoseTeam[]
  empoli!: Club

  giocatoriMonza!: RoseTeam[]
  monza!: Club

  giocatoriSassuolo!: RoseTeam[]
  sassuolo!: Club

  giocatoriSpezia!: RoseTeam[]
  spezia!: Club

  giocatoriCremonese!: RoseTeam[]
  cremonese!: Club

  giocatoriSampdoria!: RoseTeam[]
  sampdoria!: Club

  giocatoriVerona!: RoseTeam[]
  verona!: Club

  giocatori!: RoseTeam[]
  position!: string
  a!: string
  name!: string
  id!: number
  search!: string
  searchPlayer!: SearchPlayer[]
  searchStat!: SearchStatistics

  team!: Teams[]

  arrayVuoto!:[]

  // serieA = [492, 489, 496, 487, 505, 497, 494, 503, 502, 500, 514, 511, 488, 515, 498, 504, 499]
  // options = {
  //   headers: {
  //     'X-RapidAPI-Key': '0bdbd40b81mshff3b7e623d1c230p103862jsn8f8e68750807',
  //     'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  //   }
  // }
  // path = `https://api-football-v1.p.rapidapi.com/v3/players/squads?team=`
  constructor(private roseSrv: RoseService) { }

  ngOnInit(): void {
    this.fetchRoma()
    // this.fetchNapoli()
    // this.fetchMilan()
    // this.fetchInter()
    // this.fetchJuventus()
    // this.fetchLazio()
    // this.fetchAtalanta()
    // this.fetchBologna()
    // this.fetchCremonese()
    // this.fetchEmpoli()
    // this.fetchFiorentina()
    // this.fetchMonza()
    // this.fetchVerona()
    // this.fetchSalernitana()
    // this.fetchSampdoria()
    // this.fetchSassuolo()
    // this.fetchVerona()
    // this.ciclaSerieA()
  }

  // L'API SCELTA COME MOLTE NON HA ALL'INTERNO DELLA SUA LEGA GLI ARRAY DELLE SQUADRE, QUESTA RICERCA PUO' ESSERE EFFETTUATA SOLAMENTE TRAMITE L'ID DELLA SQUDRA, HO CREATO COSI' UN ARRAY SERIEA CON AL SUO INTERNO GLI ID DELLE CORRISPETTIVE SQUADRE, LA FUNZIONE CICLASERIEA EFFETUAVA PER OGNI ELEMENTO DELL'ARRAY UNA CHIAMATA GET AL SERVICE, QUESTO HA GENERATO UN NUOVO PROBLEMA CIOE' L'ERRORE 429, PER GIRACI IN TORNO HO QUINDI INSERITO UN SET TIMEOUT PER RITARDARE LA SINGOLA CHIMATA, MA IL PROBLEMA PERSITE QUINDI HO DOVUTO EFFETTURAE LA SINGOLA CHIMATA PER OGNI SQUADRA 
  // ciclaSerieA() {
  //   return this.serieA.forEach(el => {   
  //     setTimeout(()=>{
  //       return this.http.get<Rose>(this.path + el, this.options).subscribe(res => {
  //         this.giocatori = res.response[0].players
  //         this.giocatori.forEach(player => {
  //           console.log(player);
  //         })
  //       })
  //     },1000)
  //     })
  // }

  back(){
    history.back()
  }

  reload() {
    location.reload()
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

  fetchNapoli() {
    this.roseSrv.playerNapoli().subscribe(res => {      
      this.giocatoriNapoli = res.response[0].players
      this.napoli = res.response[0].team
      this.giocatoriNapoli.forEach(el => {
        el
      })
    })
  }

  fetchRoma() {
    this.roseSrv.playerRoma().subscribe(res => {      
      this.giocatoriRoma = res.response[0].players
      this.roma = res.response[0].team
      this.giocatoriRoma.forEach(el => {
        el
      })
    })
  }

  fetchMilan() {
    this.roseSrv.playerMilan().subscribe(res => {      
      this.giocatoriMilan = res.response[0].players
      this.milan = res.response[0].team
      this.giocatoriMilan.forEach(el => {
        el
      })
    })
  }

  fetchJuventus() {
    this.roseSrv.playerJuventus().subscribe(res => {      
      this.giocatoriJuve = res.response[0].players
      this.juve = res.response[0].team
      this.giocatoriJuve.forEach(el => {
        el
      })
    })
  }

  fetchLazio() {
    this.roseSrv.playerLazio().subscribe(res => {      
      this.giocatoriLazio = res.response[0].players
      this.lazio = res.response[0].team
      this.giocatoriLazio.forEach(el => {
        el
      })
    })
  }

  fetchInter() {
    this.roseSrv.playerInter().subscribe(res => {      
      this.giocatoriInter = res.response[0].players
      this.inter = res.response[0].team
      this.giocatoriInter.forEach(el => {
        el
      })
    })
  }

  fetchAtalanta() {
    this.roseSrv.playerAtalanta().subscribe(res => {      
      this.giocatoriAtalanta = res.response[0].players
      this.atalanta = res.response[0].team
      this.giocatoriAtalanta.forEach(el => {
        el
      })
    })
  }

  fetchUdinese() {
    this.roseSrv.playerUdinese().subscribe(res => {      
      this.giocatoriUdinese = res.response[0].players
      this.udinese = res.response[0].team
      this.giocatoriUdinese.forEach(el => {
        el
      })
    })
  }

  fetchTorino() {
    this.roseSrv.playerTorino().subscribe(res => {      
      this.giocatoriTorino = res.response[0].players
      this.torino = res.response[0].team
      this.giocatoriTorino.forEach(el => {
        el
      })
    })
  }

  fetchFiorentina() {
    this.roseSrv.playerFiorentina().subscribe(res => {      
      this.giocatoriFiorentina = res.response[0].players
      this.fiorentina = res.response[0].team
      this.giocatoriFiorentina.forEach(el => {
        el
      })
    })
  }

  fetchBologna() {
    this.roseSrv.playerBologna().subscribe(res => {      
      this.giocatoriBologna = res.response[0].players
      this.bologna = res.response[0].team
      this.giocatoriBologna.forEach(el => {
        el
      })
    })
  }

  fetchSalernitana() {
    this.roseSrv.playerSalernitana().subscribe(res => {      
      this.giocatoriSalernitana = res.response[0].players
      this.salernitana = res.response[0].team
      this.giocatoriSalernitana.forEach(el => {
        el
      })
    })
  }

  fetchEmpoli() {
    this.roseSrv.playerEmpoli().subscribe(res => {      
      this.giocatoriEmpoli = res.response[0].players
      this.empoli = res.response[0].team
      this.giocatoriEmpoli.forEach(el => {
        el
      })
    })
  }

  fetchMonza() {
    this.roseSrv.playerMonza().subscribe(res => {      
      this.giocatoriMonza = res.response[0].players
      this.monza = res.response[0].team
      this.giocatoriMonza.forEach(el => {
        el
      })
    })
  }

  fetchSassuolo() {
    this.roseSrv.playerSassuolo().subscribe(res => {      
      this.giocatoriSassuolo = res.response[0].players
      this.sassuolo = res.response[0].team
      this.giocatoriSassuolo.forEach(el => {
        el
      })
    })
  }

  fetchSpezia() {
    this.roseSrv.playerSpezia().subscribe(res => {      
      this.giocatoriSpezia = res.response[0].players
      this.spezia = res.response[0].team
      this.giocatoriSpezia.forEach(el => {
        el
      })
    })
  }

  fetchCremonese() {
    this.roseSrv.playerCremonese().subscribe(res => {      
      this.giocatoriCremonese = res.response[0].players
      this.cremonese = res.response[0].team
      this.giocatoriCremonese.forEach(el => {
        el
      })
    })
  }

  fetchSampdoria() {
    this.roseSrv.playerSampdoria().subscribe(res => {      
      this.giocatoriSampdoria = res.response[0].players
      this.sampdoria = res.response[0].team
      this.giocatoriSampdoria.forEach(el => {
        el
      })
    })
  }

  fetchVerona() {
    this.roseSrv.playerVerona().subscribe(res => {      
      this.giocatoriVerona = res.response[0].players
      this.verona = res.response[0].team
      this.giocatoriVerona.forEach(el => {
        el
      })
    })
  }

  // type(position:string){
  //   this.position = position

  //   this.roseSrv.playerNapoli().subscribe(res=>{
  //    this.giocatori = res.response[0].players
  //    this.giocatoriNapoli = this.giocatori.filter(el=> this.position == el.position )
  //   })

  //   this.roseSrv.playerRoma().subscribe(res=>{
  //     this.giocatori = res.response[0].players
  //     this.giocatoriRoma = this.giocatori.filter(el=> this.position == el.position )
  //    })

  //    this.roseSrv.playerMilan().subscribe(res=>{
  //     this.giocatori = res.response[0].players
  //     this.giocatoriMilan = this.giocatori.filter(el=> this.position == el.position )
  //    })

  //    this.roseSrv.playerJuventus().subscribe(res=>{
  //     this.giocatori = res.response[0].players
  //     this.giocatoriJuve = this.giocatori.filter(el=> this.position == el.position )
  //    })

  //    this.roseSrv.playerLazio().subscribe(res=>{
  //     this.giocatori = res.response[0].players
  //     this.giocatoriLazio = this.giocatori.filter(el=> this.position == el.position )
  //    })

  //    this.roseSrv.playerInter().subscribe(res=>{
  //     this.giocatori = res.response[0].players
  //     this.giocatoriInter = this.giocatori.filter(el=> this.position == el.position )
  //    })

  //    this.roseSrv.playerAtalanta().subscribe(res=>{
  //     this.giocatori = res.response[0].players
  //     this.giocatoriAtalanta = this.giocatori.filter(el=> this.position == el.position )
  //    })

  //    this.roseSrv.playerUdinese().subscribe(res=>{
  //     this.giocatori = res.response[0].players
  //     this.giocatoriUdinese = this.giocatori.filter(el=> this.position == el.position )
  //    })

  //    this.roseSrv.playerTorino().subscribe(res=>{
  //     this.giocatori = res.response[0].players
  //     this.giocatoriTorino = this.giocatori.filter(el=> this.position == el.position )
  //    })

  //    this.roseSrv.playerFiorentina().subscribe(res=>{
  //     this.giocatori = res.response[0].players
  //     this.giocatoriFiorentina = this.giocatori.filter(el=> this.position == el.position )
  //    })

  //    this.roseSrv.playerBologna().subscribe(res=>{
  //     this.giocatori = res.response[0].players
  //     this.giocatoriBologna = this.giocatori.filter(el=> this.position == el.position )
  //    })

  //    this.roseSrv.playerSalernitana().subscribe(res=>{
  //     this.giocatori = res.response[0].players
  //     this.giocatoriSalernitana = this.giocatori.filter(el=> this.position == el.position )
  //    })

  //    this.roseSrv.playerEmpoli().subscribe(res=>{
  //     this.giocatori = res.response[0].players
  //     this.giocatoriEmpoli = this.giocatori.filter(el=> this.position == el.position )
  //    })

  //    this.roseSrv.playerMonza().subscribe(res=>{
  //     this.giocatori = res.response[0].players
  //     this.giocatoriMonza = this.giocatori.filter(el=> this.position == el.position )
  //    })

  //    this.roseSrv.playerSassuolo().subscribe(res=>{
  //     this.giocatori = res.response[0].players
  //     this.giocatoriSassuolo = this.giocatori.filter(el=> this.position == el.position )
  //    })

  //    this.roseSrv.playerSpezia().subscribe(res=>{
  //     this.giocatori = res.response[0].players
  //     this.giocatoriSpezia = this.giocatori.filter(el=> this.position == el.position )
  //    })

  //    this.roseSrv.playerCremonese().subscribe(res=>{
  //     this.giocatori = res.response[0].players
  //     this.giocatoriCremonese = this.giocatori.filter(el=> this.position == el.position )
  //    })

  //    this.roseSrv.playerSampdoria().subscribe(res=>{
  //     this.giocatori = res.response[0].players
  //     this.giocatoriSampdoria = this.giocatori.filter(el=> this.position == el.position )
  //    })

  //    this.roseSrv.playerVerona().subscribe(res=>{
  //     this.giocatori = res.response[0].players
  //     this.giocatoriVerona = this.giocatori.filter(el=> this.position == el.position )
  //    })
  // }

}
