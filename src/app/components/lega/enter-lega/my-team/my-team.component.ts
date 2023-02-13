import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AggiungiPlayer, Rose, RoseTeam } from 'src/app/components/rosa/rose';
import { RoseService } from 'src/app/components/rosa/rose.service';
import { LegaService } from '../../lega.service';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss']
})
export class MyTeamComponent implements OnInit {

  constructor(private legaSrv: LegaService, private roseSrv: RoseService, private route: ActivatedRoute) { }

  nomeTeam!: string
  budget!: any[number]
  id!: number
  idUser!: number
  name!: string
  portieri: number = 0
  difensori: number = 0
  centrocampisti: number = 0
  attaccanti: number = 0

  squadPlayer: RoseTeam[] = []
  player!: AggiungiPlayer
  vuoto: any[] = []
  newBudget: number = 0
  isFav: boolean = false
  preferiti: any
  presidente!: string
  nomeLega!: string

  attivo: boolean = false



  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let stringId: any = params.get("id");
      this.id = parseFloat(stringId)
      console.log(this.id);
      this.lega()
      this.team()
      this.cicla()
    })
    this.printSquadRoma()
    this.printSquadMilan()
    this.printSquadNapoli()
    this.printSquadAtalanta()
    this.printSquadInter()
    this.printSquadJuve()
    this.printSquadLazio()
    // this.printSquadFiore()
  }

  back() {
    history.back()
  }

  reload() {
    location.reload()
  }
  
  lega() {
    this.legaSrv.fetchLeghe().subscribe(res => {
      res.forEach(el => {
        if (this.id == el.id) {
          this.presidente = el.nomeAdmin
          this.nomeLega = el.nomeLega
        }
      })
    })
  }

  team() {
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.idUser = utente.user.id

    console.log(this.id);
    this.legaSrv.allTeamUser().subscribe(res => {
      res.forEach(el => {
        if (el.idLega == this.id && el.user_id == this.idUser) {
          console.log(el);
          this.nomeTeam = el.nome_team
          this.budget = el.budget
        }
      })
    })
  }

  cicla() {
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.idUser = utente.user.id

    this.roseSrv.fetchAllSquad().subscribe(res => {
      console.log(res);
      res.forEach(el => {
        if (el.userId == utente.user.id && el.legaId == this.id) {
          let b = this.vuoto.push(el.paid)
          this.newBudget = this.vuoto.reduce((total, num) => {
            return total + num;
          })
        }
      })
      this.budget = this.budget - this.newBudget
    })

  }

  printSquadRoma() {
    setTimeout(() => {
      let user: any = localStorage.getItem('user')
      let utente = JSON.parse(user)
      this.idUser = utente.user.id
      this.roseSrv.playerRoma().subscribe(res => {
        this.squadPlayer = res.response[0].players
        this.squadPlayer.forEach(p => {
          if (p.position == 'Goalkeeper') {
            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.portieri++
                    }
                  }
                }
              })
            })

          } else if (p.position == 'Defender') {

            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.difensori++
                    }
                  }
                }
              })
            })
          } else if (p.position == 'Midfielder') {

            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.centrocampisti++
                    }
                  }
                }
              })
            })
          } else if (p.position == 'Attacker') {

            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.attaccanti++
                    }
                  }
                }
              })
            })
          }
        })
      })
    })
  }

  printSquadNapoli() {
    setTimeout(() => {
      let user: any = localStorage.getItem('user')
      let utente = JSON.parse(user)
      this.idUser = utente.user.id
      this.roseSrv.playerNapoli().subscribe(res => {
        this.squadPlayer = res.response[0].players
        this.squadPlayer.forEach(p => {
          if (p.position == 'Goalkeeper') {
            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.portieri++
                    }
                  }
                }
              })
            })

          } else if (p.position == 'Defender') {

            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.difensori++
                    }
                  }
                }
              })
            })
          } else if (p.position == 'Midfielder') {

            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.centrocampisti++
                    }
                  }
                }
              })
            })
          } else if (p.position == 'Attacker') {

            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.attaccanti++
                    }
                  }
                }
              })
            })
          }
        })
      })
    })
  }

  printSquadMilan() {
    setTimeout(() => {
      let user: any = localStorage.getItem('user')
      let utente = JSON.parse(user)
      this.idUser = utente.user.id
      this.roseSrv.playerMilan().subscribe(res => {
        this.squadPlayer = res.response[0].players
        this.squadPlayer.forEach(p => {
          if (p.position == 'Goalkeeper') {
            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.portieri++
                    }
                  }
                }
              })
            })

          } else if (p.position == 'Defender') {

            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.difensori++
                    }
                  }
                }
              })
            })
          } else if (p.position == 'Midfielder') {

            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.centrocampisti++
                    }
                  }
                }
              })
            })
          } else if (p.position == 'Attacker') {

            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.attaccanti++
                    }
                  }
                }
              })
            })
          }
        })
      })
    })
  }

  printSquadJuve() {
    setTimeout(() => {
      let user: any = localStorage.getItem('user')
      let utente = JSON.parse(user)
      this.idUser = utente.user.id
      this.roseSrv.playerJuventus().subscribe(res => {
        this.squadPlayer = res.response[0].players
        this.squadPlayer.forEach(p => {
          if (p.position == 'Goalkeeper') {
            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.portieri++
                    }
                  }
                }
              })
            })

          } else if (p.position == 'Defender') {

            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.difensori++
                    }
                  }
                }
              })
            })
          } else if (p.position == 'Midfielder') {

            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.centrocampisti++
                    }
                  }
                }
              })
            })
          } else if (p.position == 'Attacker') {

            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.attaccanti++
                    }
                  }
                }
              })
            })
          }
        })
      })
    })
  }

  printSquadLazio() {
    setTimeout(() => {
      let user: any = localStorage.getItem('user')
      let utente = JSON.parse(user)
      this.idUser = utente.user.id
      this.roseSrv.playerLazio().subscribe(res => {
        this.squadPlayer = res.response[0].players
        this.squadPlayer.forEach(p => {
          if (p.position == 'Goalkeeper') {
            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.portieri++
                    }
                  }
                }
              })
            })

          } else if (p.position == 'Defender') {

            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.difensori++
                    }
                  }
                }
              })
            })
          } else if (p.position == 'Midfielder') {

            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.centrocampisti++
                    }
                  }
                }
              })
            })
          } else if (p.position == 'Attacker') {

            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.attaccanti++
                    }
                  }
                }
              })
            })
          }
        })
      })
    })
  }

  printSquadInter() {
    setTimeout(() => {
      let user: any = localStorage.getItem('user')
      let utente = JSON.parse(user)
      this.idUser = utente.user.id
      this.roseSrv.playerInter().subscribe(res => {
        this.squadPlayer = res.response[0].players
        this.squadPlayer.forEach(p => {
          if (p.position == 'Goalkeeper') {
            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.portieri++
                    }
                  }
                }
              })
            })

          } else if (p.position == 'Defender') {

            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.difensori++
                    }
                  }
                }
              })
            })
          } else if (p.position == 'Midfielder') {

            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.centrocampisti++
                    }
                  }
                }
              })
            })
          } else if (p.position == 'Attacker') {

            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.attaccanti++
                    }
                  }
                }
              })
            })
          }
        })
      })
    })
  }

  printSquadAtalanta() {
    setTimeout(() => {
      let user: any = localStorage.getItem('user')
      let utente = JSON.parse(user)
      this.idUser = utente.user.id
      this.roseSrv.playerAtalanta().subscribe(res => {
        this.squadPlayer = res.response[0].players
        this.squadPlayer.forEach(p => {
          if (p.position == 'Goalkeeper') {
            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.portieri++
                    }
                  }
                }
              })
            })

          } else if (p.position == 'Defender') {

            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.difensori++
                    }
                  }
                }
              })
            })
          } else if (p.position == 'Midfielder') {

            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.centrocampisti++
                    }
                  }
                }
              })
            })
          } else if (p.position == 'Attacker') {

            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.attaccanti++
                    }
                  }
                }
              })
            })
          }
        })
      })
    })
  }

  printSquadFiore() {
    setTimeout(() => {
      let user: any = localStorage.getItem('user')
      let utente = JSON.parse(user)
      this.idUser = utente.user.id
      this.roseSrv.playerFiorentina().subscribe(res => {
        this.squadPlayer = res.response[0].players
        this.squadPlayer.forEach(p => {
          if (p.position == 'Goalkeeper') {
            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.portieri++
                    }
                  }
                }
              })
            })

          } else if (p.position == 'Defender') {

            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.difensori++
                    }
                  }
                }
              })
            })
          } else if (p.position == 'Midfielder') {

            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.centrocampisti++
                    }
                  }
                }
              })
            })
          } else if (p.position == 'Attacker') {

            this.roseSrv.fetchAllSquad().subscribe(res => {
              res.forEach(player => {
                if (player.userId == utente.user.id && player.legaId == this.id) {
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
                      this.attivo = true
                      this.attaccanti++
                    }
                  }
                }
              })
            })
          }
        })
      })
    })
  }

}
