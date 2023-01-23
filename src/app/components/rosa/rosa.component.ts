import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { count } from 'rxjs/internal/operators/count';
import { Auth } from 'src/app/auth/auth';
import { Teams } from 'src/app/interface/teams';
import { AggiungiPlayer, Club, RoseTeam, Search, SearchPlayer, SearchStatistics } from './rose';
import { RoseService } from './rose.service';

@Component({
  selector: 'app-rosa',
  templateUrl: './rosa.component.html',
  styleUrls: ['./rosa.component.scss']
})
export class RosaComponent implements OnInit {

  giocatoriNapoli!: RoseTeam[]
  giocatoriRoma!: RoseTeam[]
  giocatoriMilan!: RoseTeam[]
  giocatoriJuve!: RoseTeam[]
  giocatoriLazio!: RoseTeam[]
  giocatoriInter!: RoseTeam[]
  giocatoriAtalanta!: RoseTeam[]
  giocatoriUdinese!: RoseTeam[]
  giocatoriTorino!: RoseTeam[]
  giocatoriFiorentina!: RoseTeam[]
  giocatoriBologna!: RoseTeam[]
  giocatoriSalernitana!: RoseTeam[]
  giocatoriEmpoli!: RoseTeam[]
  giocatoriMonza!: RoseTeam[]
  giocatoriSassuolo!: RoseTeam[]
  giocatoriSpezia!: RoseTeam[]
  giocatoriCremonese!: RoseTeam[]
  giocatoriSampdoria!: RoseTeam[]
  giocatoriVerona!: RoseTeam[]

  giocatori!: RoseTeam[]
  position!: string
  a!: string
  name!: string
  search!: string
  searchPlayer!: SearchPlayer[]
  searchStat!: SearchStatistics

  team!: Teams[]

  isFav: boolean = false
  preferiti: any

  @ViewChild('user') user!: Auth
  @Input() p!:RoseTeam

  id!:number
  idLega!:number
  count: number = 0
  paga:any[]=[]



  constructor(private roseSrv: RoseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let stringId: any = params.get("id");
      this.idLega = parseFloat(stringId)
      this.addPlayer()
      this.getPlayerAdd()  
    })
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

  fetchNapoli() {
    this.roseSrv.playerNapoli().subscribe(res => {
      this.giocatoriNapoli = res.response[0].players
      this.giocatoriNapoli.forEach(el => {
        el
      })
    })
  }

  fetchRoma() {
    this.roseSrv.playerRoma().subscribe(res => {
      this.giocatoriRoma = res.response[0].players
      this.giocatoriRoma.forEach(el => {
        el
      })
    })
  }

  fetchMilan() {
    this.roseSrv.playerMilan().subscribe(res => {
      this.giocatoriMilan = res.response[0].players
      this.giocatoriMilan.forEach(el => {
        el
      })
    })
  }

  fetchJuventus() {
    this.roseSrv.playerJuventus().subscribe(res => {
      this.giocatoriJuve = res.response[0].players
      this.giocatoriJuve.forEach(el => {
        el
      })
    })
  }

  fetchLazio() {
    this.roseSrv.playerLazio().subscribe(res => {
      this.giocatoriLazio = res.response[0].players
      this.giocatoriLazio.forEach(el => {
        el
      })
    })
  }

  fetchInter() {
    this.roseSrv.playerInter().subscribe(res => {
      this.giocatoriInter = res.response[0].players
      this.giocatoriInter.forEach(el => {
        el
      })
    })
  }

  fetchAtalanta() {
    this.roseSrv.playerAtalanta().subscribe(res => {
      this.giocatoriAtalanta = res.response[0].players
      this.giocatoriAtalanta.forEach(el => {
        el
      })
    })
  }

  fetchUdinese() {
    this.roseSrv.playerUdinese().subscribe(res => {
      this.giocatoriUdinese = res.response[0].players
      this.giocatoriUdinese.forEach(el => {
        el
      })
    })
  }

  fetchTorino() {
    this.roseSrv.playerTorino().subscribe(res => {
      this.giocatoriTorino = res.response[0].players
      this.giocatoriTorino.forEach(el => {
        el
      })
    })
  }

  fetchFiorentina() {
    this.roseSrv.playerFiorentina().subscribe(res => {
      this.giocatoriFiorentina = res.response[0].players
      this.giocatoriFiorentina.forEach(el => {
        el
      })
    })
  }

  fetchBologna() {
    this.roseSrv.playerBologna().subscribe(res => {
      this.giocatoriBologna = res.response[0].players
      this.giocatoriBologna.forEach(el => {
        el
      })
    })
  }

  fetchSalernitana() {
    this.roseSrv.playerSalernitana().subscribe(res => {
      this.giocatoriSalernitana = res.response[0].players
      this.giocatoriSalernitana.forEach(el => {
        el
      })
    })
  }

  fetchEmpoli() {
    this.roseSrv.playerEmpoli().subscribe(res => {
      this.giocatoriEmpoli = res.response[0].players
      this.giocatoriEmpoli.forEach(el => {
        el
      })
    })
  }

  fetchMonza() {
    this.roseSrv.playerMonza().subscribe(res => {
      this.giocatoriMonza = res.response[0].players
      this.giocatoriMonza.forEach(el => {
        el
      })
    })
  }

  fetchSassuolo() {
    this.roseSrv.playerSassuolo().subscribe(res => {
      this.giocatoriSassuolo = res.response[0].players
      this.giocatoriSassuolo.forEach(el => {
        el
      })
    })
  }

  fetchSpezia() {
    this.roseSrv.playerSpezia().subscribe(res => {
      this.giocatoriSpezia = res.response[0].players
      this.giocatoriSpezia.forEach(el => {
        el
      })
    })
  }

  fetchCremonese() {
    this.roseSrv.playerCremonese().subscribe(res => {
      this.giocatoriCremonese = res.response[0].players
      this.giocatoriCremonese.forEach(el => {
        el
      })
    })
  }

  fetchSampdoria() {
    this.roseSrv.playerSampdoria().subscribe(res => {
      this.giocatoriSampdoria = res.response[0].players
      this.giocatoriSampdoria.forEach(el => {
        el
      })
    })
  }

  fetchVerona() {
    this.roseSrv.playerVerona().subscribe(res => {
      this.giocatoriVerona = res.response[0].players
      this.giocatoriVerona.forEach(el => {
        el
      })
    })
  }

}
