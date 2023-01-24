import { Component, OnInit } from '@angular/core';
import { RoseService } from '../rose.service';
import { ActivatedRoute } from '@angular/router';
import { SearchPlayer, SearchStatistics } from '../rose';

@Component({
  selector: 'app-dettaglio-giocatore',
  templateUrl: './dettaglio-giocatore.component.html',
  styleUrls: ['./dettaglio-giocatore.component.scss'],
  styles:['.info{font-size: 11px;}']
})
export class DettaglioGiocatoreComponent implements OnInit {

  id!: number
  searchPlayer!: SearchPlayer
  searchStat!: SearchStatistics


  constructor(private roseSrv: RoseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let stringId: any = params.get("id");
      this.id = parseFloat(stringId)
      this.dettaglio(stringId)
    })
  }

  back(){
    history.back()
  }

  dettaglio(id: number) {
    this.roseSrv.fetchById(id).subscribe(res => {
      this.searchPlayer = res.response[0]
      this.searchStat = res.response[0].statistics[0]
      let wrapper: any = document.querySelector('#statistics')
      if (this.searchStat.games.position == 'Goalkeeper' || this.searchStat.games.position == 'Defender' || this.searchStat.games.position == 'Midfielder' || this.searchStat.games.position == 'Attacker') {
        this.searchStat.goals.assists += 0
      }
    
      let div = document.createElement('div')
      if (this.searchStat.games.position == 'Goalkeeper') {
        // div.classList.add('lead')
        wrapper.innerHTML +=
          `
      <div class="col-4">
        <span>${this.searchStat.games.appearences}</span>
        <p>Presenze</p>
      </div>
      <div class="col-4">
          <span>${this.searchStat.games.lineups}</span>
          <p>Titolare</p> 
      </div>
      <div class="col-4">
          <span>'${this.searchStat.games.minutes}</span>
          <p>Minuti</p>
      </div>

      <div class="col-4">
          <span id="assist">${this.searchStat.goals.assists}</span>
          <p>Assist</p>
      </div>
      <div class="col-4">
          <span>${this.searchStat.goals.conceded}</span>
          <p>Gol Subiti</p> 
      </div>
      <div class="col-4">
          <span>${this.searchStat.penalty.missed}</span>
          <p>Rigori Subiti</p>
      </div>

      <div class="col-4">
          <span>${this.searchStat.penalty.saved}</span>
          <p>Rigori Parati</p>
      </div>
      <div class="col-4">
          <span>${this.searchStat.passes.accuracy}%</span>
          <p>Precisione Passaggi</p> 
      </div>
      <div class="col-4">
          <span>${this.searchStat.passes.total}</span>
          <p>Totale Passaggi</p>
      </div>

      <div class="col-4">
          <span>${this.searchStat.cards.yellow}</span>
          <p>Ammonizioni</p>
      </div>
      <div class="col-4">
          <span>${this.searchStat.cards.red}</span>
          <p>Espulsioni</p>
      </div>

        `

      } else if (this.searchStat.games.position == 'Defender' || this.searchStat.games.position == 'Midfielder' || this.searchStat.games.position == 'Attacker') {
        wrapper.innerHTML +=
          `
       <div class="col-4">
         <span>${this.searchStat.games.appearences}</span>
         <p>Presenze</p>
       </div>
       <div class="col-4">
           <span>${this.searchStat.games.lineups}</span>
           <p>Titolare</p> 
       </div>
       <div class="col-4">
           <span>'${this.searchStat.games.minutes}</span>
           <p>Min. Giocati</p>
       </div>
 
       
       <div class="col-4">
           <span>${this.searchStat.tackles.total}</span>
           <p>Contrasiti Totali</p> 
       </div>
       <div class="col-4">
           <span>${this.searchStat.tackles.interceptions}</span>
           <p>Contrasti Intercettati</p>
       </div>

       <div class="col-4">
           <span>${this.searchStat.goals.total}</span>
           <p>Goal</p>
       </div>
 
       <div class="col-4">
           <span id="assist">${this.searchStat.goals.assists}</span>
           <p>Assist</p>
       </div>
 
       <div class="col-4">
           <span>${this.searchStat.passes.key}</span>
           <p>Passaggi Chiave</p>
       </div>
       <div class="col-4">
           <span>${this.searchStat.passes.accuracy}%</span>
           <p>Precisione Passaggi</p> 
       </div>
 
       <div class="col-4">
           <span>${this.searchStat.passes.total}</span>
           <p>Totale Passaggi</p>
       </div>
 
       <div class="col-4">
           <span>${this.searchStat.cards.yellow}</span>
           <p>Ammonizioni</p>
       </div>
       <div class="col-4">
           <span>${this.searchStat.cards.red}</span>
           <p>Espulsioni</p>
       </div>
 
         `
      }
      wrapper!.appendChild(div)
    })
  }



}
