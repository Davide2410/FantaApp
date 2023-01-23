import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoseTeam } from 'src/app/components/rosa/rose';
import { RoseService } from 'src/app/components/rosa/rose.service';
import { LegaService } from '../../lega.service';

@Component({
  selector: 'app-dettaglio-team',
  templateUrl: './dettaglio-team.component.html',
  styleUrls: ['./dettaglio-team.component.scss']
})
export class DettaglioTeamComponent implements OnInit {
  id!: number
  nomeTeam!: string
  budget!: any[number]
  portieri: number = 0
  difensori: number = 0
  centrocampisti: number = 0
  attaccanti: number = 0
  presidente!: string
  nomeLega!: string
  name!: string
  vuoto: any[] = []
  idLega!: number
  newBudget!: number
  squadPlayer: RoseTeam[] = []
  isFav: boolean = false
  currentBudget!: number


  constructor(private roseSrv: RoseService, private route: ActivatedRoute, private legaSrv: LegaService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let stringId: any = params.get("id");
      this.id = parseFloat(stringId)
      let stringIdLega: any = params.get("idLega")
      this.idLega = parseFloat(stringIdLega)
      console.log(this.id);
      console.log(this.idLega);
      this.lega()
      this.team()
      this.ciclaBudget()
    })
    this.printRoma()
  }

  back(){
    history.back()
  }

  reload() {
    location.reload()
  }

  lega() {
    this.legaSrv.fetchLeghe().subscribe(res => {
      res.forEach(el => {
        if (this.idLega == el.id) {
          this.presidente = el.nomeAdmin
          this.nomeLega = el.nomeLega
        }
      })
    })
  }

  team() {
    this.legaSrv.allTeamUser().subscribe(res => {
      res.forEach(el => {
        if (el.idLega == this.idLega && el.user_id == this.id) {
          this.nomeTeam = el.nome_team
          this.budget = el.budget
          console.log(this.budget);

        }
      })
    })
  }

  ciclaBudget() {
    this.roseSrv.fetchAllSquad().subscribe(res => {
      res.forEach(el => {
        if (el.userId == this.id && el.legaId == this.idLega) {
          let b = this.vuoto.push(el.paid)
          this.newBudget = this.vuoto.reduce((total, num) => {
            return total + num;
          })
        }
      })
      if (this.currentBudget = this.budget - this.newBudget) {
        this.budget = this.currentBudget
      } else {
        return this.budget
      }
    })
  }

  printRoma() {
    this.roseSrv.playerRoma().subscribe(res => {
      this.squadPlayer = res.response[0].players
      this.squadPlayer.forEach(p => {
        if (p.position == 'Goalkeeper') {
          this.roseSrv.fetchAllSquad().subscribe(res => {
            res.forEach(player => {
              if (player.userId == this.id && player.legaId == this.idLega) {
                if (player.playerId == p.id) {
                  if (this.portieri >= 3) {
                    this.roseSrv.deleteGiocatore(player.id!).subscribe(res => {
                      console.log(res);
                    })
                    this.isFav = false
                    return
                  } else {
                    let b = this.vuoto.push(p)
                    console.log(this.portieri);
                    this.portieri++
                  }
                }
              }
            })
          })
        } else if (p.position == 'Defender') {

          this.roseSrv.fetchAllSquad().subscribe(res => {
            res.forEach(player => {
              if (player.userId == this.id && player.legaId == this.idLega) {
                if (player.playerId == p.id) {
                  if (this.difensori >= 8) {
                    this.roseSrv.deleteGiocatore(player.id!).subscribe(res => {
                      console.log(res);
                    })
                    this.isFav = false
                    return
                  } else {
                    let b = this.vuoto.push(p)
                    console.log(this.difensori);
                    this.difensori++
                  }
                }
              }
            })
          })
        } else if (p.position == 'Midfielder') {

          this.roseSrv.fetchAllSquad().subscribe(res => {
            res.forEach(player => {
              if (player.userId == this.id && player.legaId == this.idLega) {
                if (player.playerId == p.id) {
                  if (this.centrocampisti >= 8) {
                    this.roseSrv.deleteGiocatore(player.id!).subscribe(res => {
                      console.log(res);
                    })
                    this.isFav = false
                    return
                  } else {
                    let b = this.vuoto.push(p)
                    console.log(this.centrocampisti);
                    this.centrocampisti++
                  }
                }
              }
            })
          })
        } else if (p.position == 'Attacker') {

          this.roseSrv.fetchAllSquad().subscribe(res => {
            res.forEach(player => {
              if (player.userId == this.id && player.legaId == this.idLega) {
                if (player.playerId == p.id) {
                  if (this.attaccanti >= 6) {
                    this.roseSrv.deleteGiocatore(player.id!).subscribe(res => {
                      console.log(res);
                    })
                    this.isFav = false
                    return
                  } else {
                    let b = this.vuoto.push(p)
                    console.log(this.attaccanti);
                    this.attaccanti++
                  }
                }
              }
            })
          })
        }
      })
    })
  }

}
