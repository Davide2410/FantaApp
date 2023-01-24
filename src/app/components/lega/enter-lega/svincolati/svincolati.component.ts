import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Rose, RoseTeam } from 'src/app/components/rosa/rose';
import { RoseService } from 'src/app/components/rosa/rose.service';

@Component({
  selector: 'app-svincolati',
  templateUrl: './svincolati.component.html',
  styleUrls: ['./svincolati.component.scss']
})
export class SvincolatiComponent implements OnInit {

  idLega!: number
  arrayRoma!: RoseTeam[]
  arrayMilan!: RoseTeam[]
  arrayLazio!: RoseTeam[]
  arrayNapoli!: RoseTeam[]
  arrayInter!: RoseTeam[]
  arrayJuve!: RoseTeam[]
  arrayAtalanta!: RoseTeam[]
  arrayFiore!: RoseTeam[]
  vuoto: any[] = []

  constructor(private roseSrv: RoseService, private route: ActivatedRoute, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let stringId: any = params.get("id");
      this.idLega = parseFloat(stringId)
      this.printAta()
      this.printFiore()
      this.printInter()
      this.printJuve()
      this.printLazio()
      this.printMilan()
      this.printNapoli()
      this.printRoma()
    })
  }

  back() {
    history.back()
  }

  reload() {
    window.location.reload()
  }

  printNapoli() {
    this.roseSrv.fetchAllSquad().subscribe(res => {
      this.vuoto = res
      this.roseSrv.playerNapoli().subscribe(res => {
        this.arrayNapoli = res.response[0].players
        this.vuoto.forEach(el => {
          if (el.legaId == this.idLega) {
            let b = this.arrayNapoli.filter(x => x.id != el.playerId)
            this.arrayNapoli = b
          }
        })
        console.log(this.arrayNapoli);
      })
    })
  }

  printRoma() {
    this.roseSrv.fetchAllSquad().subscribe(res => {
      this.vuoto = res
      this.roseSrv.playerRoma().subscribe(res => {
        this.arrayRoma = res.response[0].players
        this.vuoto.forEach(el => {
          if (el.legaId == this.idLega) {
            let b = this.arrayRoma.filter(x => x.id != el.playerId)
            this.arrayRoma = b
          }
        })
        console.log(this.arrayRoma);
      })
    })
  }

  printMilan() {
    this.roseSrv.fetchAllSquad().subscribe(res => {
      this.vuoto = res
      this.roseSrv.playerMilan().subscribe(res => {
        this.arrayMilan = res.response[0].players
        this.vuoto.forEach(el => {
          if (el.legaId == this.idLega) {
            let b = this.arrayMilan.filter(x => x.id != el.playerId)
            this.arrayMilan = b
          }
        })
        console.log(this.arrayMilan);
      })
    })
  }


  printInter() {
    this.roseSrv.fetchAllSquad().subscribe(res => {
      this.vuoto = res
      this.roseSrv.playerInter().subscribe(res => {
        this.arrayInter = res.response[0].players
        this.vuoto.forEach(el => {
          if (el.legaId == this.idLega) {
            let b = this.arrayInter.filter(x => x.id != el.playerId)
            this.arrayInter = b
          }
        })
        console.log(this.arrayInter);
      })
    })
  }


  printJuve() {
    this.roseSrv.fetchAllSquad().subscribe(res => {
      this.vuoto = res
      this.roseSrv.playerJuventus().subscribe(res => {
        this.arrayJuve = res.response[0].players
        this.vuoto.forEach(el => {
          if (el.legaId == this.idLega) {
            let b = this.arrayJuve.filter(x => x.id != el.playerId)
            this.arrayJuve = b
          }
        })
        console.log(this.arrayJuve);
      })
    })
  }


  printLazio() {
    this.roseSrv.fetchAllSquad().subscribe(res => {
      this.vuoto = res
      this.roseSrv.playerLazio().subscribe(res => {
        this.arrayLazio = res.response[0].players
        this.vuoto.forEach(el => {
          if (el.legaId == this.idLega) {
            let b = this.arrayLazio.filter(x => x.id != el.playerId)
            this.arrayLazio = b
          }
        })
        console.log(this.arrayLazio);
      })
    })
  }


  printAta() {
    this.roseSrv.fetchAllSquad().subscribe(res => {
      this.vuoto = res
      this.roseSrv.playerAtalanta().subscribe(res => {
        this.arrayAtalanta = res.response[0].players
        this.vuoto.forEach(el => {
          if (el.legaId == this.idLega) {
            let b = this.arrayAtalanta.filter(x => x.id != el.playerId)
            this.arrayAtalanta = b
          }
        })
        console.log(this.arrayAtalanta);
      })
    })
  }

  printFiore() {
    this.roseSrv.fetchAllSquad().subscribe(res => {
      this.vuoto = res
      this.roseSrv.playerFiorentina().subscribe(res => {
        this.arrayFiore = res.response[0].players
        this.vuoto.forEach(el => {
          if (el.legaId == this.idLega) {
            let b = this.arrayFiore.filter(x => x.id != el.playerId)
            this.arrayFiore = b
          }
        })
        console.log(this.arrayFiore);
      })
    })
  }


}
