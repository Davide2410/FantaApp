import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Teams } from 'src/app/interface/teams';
import { NewsService } from 'src/app/service/news.service';
import { Club, Rose, RoseTeam, Search, SearchData, SearchPlayer, SearchStatistics } from './rose';
import { RoseService } from './rose.service';

@Component({
  selector: 'app-rosa',
  templateUrl: './rosa.component.html',
  styleUrls: ['./rosa.component.scss']
})
export class RosaComponent implements OnInit {

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
  search!: string
  searchPlayer!: SearchPlayer[]
  searchStat!: SearchStatistics

  team!: Teams[]

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
    // this.fetchRoma()
    this.fetchNapoli()
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

  // dettaglioNapoli() {
  //   this.roseSrv.playerNapoli().subscribe(res => {
  //     this.id = res.response[0].players[0].id
  //     console.log(res.response[0].players[0].id);
  //     this.roseSrv.fetchById(this.id).subscribe(res=>{
  //       console.log(res);
  //     })
  //   })
  // }

  


  fetchNapoli() {
    this.roseSrv.playerNapoli().subscribe(res => {
      console.log(res.response[0].players);
      console.log(res.response[0].team);
      this.giocatoriNapoli = res.response[0].players
      this.napoli = res.response[0].team
      this.giocatoriNapoli.forEach(el => {
        console.log(el);
      })
    })
  }

  fetchRoma() {
    this.roseSrv.playerRoma().subscribe(res => {
      console.log(res.response[0].players);
      console.log(res.response[0].team);
      this.giocatoriRoma = res.response[0].players
      this.roma = res.response[0].team
      this.giocatoriRoma.forEach(el => {
        console.log(el);
      })
    })
  }

  fetchMilan() {
    this.roseSrv.playerMilan().subscribe(res => {
      console.log(res.response[0].players);
      console.log(res.response[0].team);
      this.giocatoriMilan = res.response[0].players
      this.milan = res.response[0].team
      this.giocatoriMilan.forEach(el => {
        console.log(el);
      })
    })
  }

  fetchJuventus() {
    this.roseSrv.playerJuventus().subscribe(res => {
      console.log(res.response[0].players);
      console.log(res.response[0].team);
      this.giocatoriJuve = res.response[0].players
      this.juve = res.response[0].team
      this.giocatoriJuve.forEach(el => {
        console.log(el);
      })
    })
  }

  fetchLazio() {
    this.roseSrv.playerLazio().subscribe(res => {
      console.log(res.response[0].players);
      console.log(res.response[0].team);
      this.giocatoriLazio = res.response[0].players
      this.lazio = res.response[0].team
      this.giocatoriLazio.forEach(el => {
        console.log(el);
      })
    })
  }

  fetchInter() {
    this.roseSrv.playerInter().subscribe(res => {
      console.log(res.response[0].players);
      console.log(res.response[0].team);
      this.giocatoriInter = res.response[0].players
      this.inter = res.response[0].team
      this.giocatoriInter.forEach(el => {
        console.log(el);
      })
    })
  }

  fetchAtalanta() {
    this.roseSrv.playerAtalanta().subscribe(res => {
      console.log(res.response[0].players);
      console.log(res.response[0].team);
      this.giocatoriAtalanta = res.response[0].players
      this.atalanta = res.response[0].team
      this.giocatoriAtalanta.forEach(el => {
        console.log(el);
      })
    })
  }

  fetchUdinese() {
    this.roseSrv.playerUdinese().subscribe(res => {
      console.log(res.response[0].players);
      console.log(res.response[0].team);
      this.giocatoriUdinese = res.response[0].players
      this.udinese = res.response[0].team
      this.giocatoriUdinese.forEach(el => {
        console.log(el);
      })
    })
  }

  fetchTorino() {
    this.roseSrv.playerTorino().subscribe(res => {
      console.log(res.response[0].players);
      console.log(res.response[0].team);
      this.giocatoriTorino = res.response[0].players
      this.torino = res.response[0].team
      this.giocatoriTorino.forEach(el => {
        console.log(el);
      })
    })
  }

  fetchFiorentina() {
    this.roseSrv.playerFiorentina().subscribe(res => {
      console.log(res.response[0].players);
      console.log(res.response[0].team);
      this.giocatoriFiorentina = res.response[0].players
      this.fiorentina = res.response[0].team
      this.giocatoriFiorentina.forEach(el => {
        console.log(el);
      })
    })
  }

  fetchBologna() {
    this.roseSrv.playerBologna().subscribe(res => {
      console.log(res.response[0].players);
      console.log(res.response[0].team);
      this.giocatoriBologna = res.response[0].players
      this.bologna = res.response[0].team
      this.giocatoriBologna.forEach(el => {
        console.log(el);
      })
    })
  }

  fetchSalernitana() {
    this.roseSrv.playerSalernitana().subscribe(res => {
      console.log(res.response[0].players);
      console.log(res.response[0].team);
      this.giocatoriSalernitana = res.response[0].players
      this.salernitana = res.response[0].team
      this.giocatoriSalernitana.forEach(el => {
        console.log(el);
      })
    })
  }

  fetchEmpoli() {
    this.roseSrv.playerEmpoli().subscribe(res => {
      console.log(res.response[0].players);
      console.log(res.response[0].team);
      this.giocatoriEmpoli = res.response[0].players
      this.empoli = res.response[0].team
      this.giocatoriEmpoli.forEach(el => {
        console.log(el);
      })
    })
  }

  fetchMonza() {
    this.roseSrv.playerMonza().subscribe(res => {
      console.log(res.response[0].players);
      console.log(res.response[0].team);
      this.giocatoriMonza = res.response[0].players
      this.monza = res.response[0].team
      this.giocatoriMonza.forEach(el => {
        console.log(el);
      })
    })
  }

  fetchSassuolo() {
    this.roseSrv.playerSassuolo().subscribe(res => {
      console.log(res.response[0].players);
      console.log(res.response[0].team);
      this.giocatoriSassuolo = res.response[0].players
      this.sassuolo = res.response[0].team
      this.giocatoriSassuolo.forEach(el => {
        console.log(el);
      })
    })
  }

  fetchSpezia() {
    this.roseSrv.playerSpezia().subscribe(res => {
      console.log(res.response[0].players);
      console.log(res.response[0].team);
      this.giocatoriSpezia = res.response[0].players
      this.spezia = res.response[0].team
      this.giocatoriSpezia.forEach(el => {
        console.log(el);
      })
    })
  }

  fetchCremonese() {
    this.roseSrv.playerCremonese().subscribe(res => {
      console.log(res.response[0].players);
      console.log(res.response[0].team);
      this.giocatoriCremonese = res.response[0].players
      this.cremonese = res.response[0].team
      this.giocatoriCremonese.forEach(el => {
        console.log(el);
      })
    })
  }

  fetchSampdoria() {
    this.roseSrv.playerSampdoria().subscribe(res => {
      console.log(res.response[0].players);
      console.log(res.response[0].team);
      this.giocatoriSampdoria = res.response[0].players
      this.sampdoria = res.response[0].team
      this.giocatoriSampdoria.forEach(el => {
        console.log(el);
      })
    })
  }

  fetchVerona() {
    this.roseSrv.playerVerona().subscribe(res => {
      console.log(res.response[0].players);
      console.log(res.response[0].team);
      this.giocatoriVerona = res.response[0].players
      this.verona = res.response[0].team
      this.giocatoriVerona.forEach(el => {
        console.log(el);
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
