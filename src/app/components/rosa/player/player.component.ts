import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AggiungiPlayer, Club, RoseTeam } from '../rose';
import { RoseService } from '../rose.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() p!: RoseTeam
  @Input() roma!: Club

  id!: number
  idLega!: number
  count: number = 0
  isFav: boolean = false
  preferiti: any
  plus: boolean = true
  minus: boolean = false

  paga: any[] = []

  constructor(private roseSrv: RoseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let stringId: any = params.get("id");
      this.idLega = parseFloat(stringId)
      console.log(this.idLega);

      this.addPlayer()
      this.getPlayerAdd()
    })

  }

  calcola(budget: NgForm, id: number) {
    let user: any = localStorage.getItem('user')
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
    this.roseSrv.getConutFav(this.p.id).subscribe(res => {
      let lunghezza = res
      this.count = lunghezza.length
    })
  }

  addPlayer() {
    
    this.roseSrv.getSquad().subscribe(res => {
      let favorities = res

      let f = favorities.find((a: any) => a.playerId == this.p.id && a.legaId == this.idLega)

      if (f) {
        this.plus = false
        this.minus = true
        this.isFav = true
        this.preferiti = f
      } else {
        this.plus = true
        this.minus = false
        this.isFav = false
      }

    })
  }


  rimuoviLike() {
    this.roseSrv.deleteGiocatore(this.preferiti.id).subscribe(res => {
      console.log(res);
    })
    this.plus = true
    this.minus = false
    this.isFav = false
    this.count--
  }
}
