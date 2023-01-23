import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AggiungiPlayer, RoseTeam } from 'src/app/components/rosa/rose';
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
    // this.printSquadMilan()
    // this.printSquadNapoli()
    // this.printSquadAta()
    // this.printSquadInter()
    // this.printSquadJuve()
    // this.printSquadLazio()
    // this.printSquadBologna()
    // this.printSquadCremona()
    // this.printSquadEmpoli()
    // this.printSquadFiorentina()
    // this.printSquadMonza()
    // this.printSquadSale()
    // this.printSquadSamp()
    // this.printSquadSassuolo()
    // this.printSquadToro()
    // this.printSquadUdine()
    // this.printSquadVerona()
    // this.printSquadSpezia()
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

  printSquadNapoli() {
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

  printSquadMilan() {
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
 
  printSquadJuve() {
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

  printSquadLazio() {
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

  printSquadInter() {
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

  printSquadAtalanta() {
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

  printSquadUdinese() {
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.idUser = utente.user.id
    this.roseSrv.playerUdinese().subscribe(res => {
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

  printSquadTorino() {
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.idUser = utente.user.id
    this.roseSrv.playerTorino().subscribe(res => {
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

  printSquadFiore() {
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

  printSquadBologna() {
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.idUser = utente.user.id
    this.roseSrv.playerBologna().subscribe(res => {
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

  printSquadSale() {
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.idUser = utente.user.id
    this.roseSrv.playerSalernitana().subscribe(res => {
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

  printSquadEmpoli() {
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.idUser = utente.user.id
    this.roseSrv.playerEmpoli().subscribe(res => {
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

  printSquadMonza() {
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.idUser = utente.user.id
    this.roseSrv.playerMonza().subscribe(res => {
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

  printSquadSassuolo() {
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.idUser = utente.user.id
    this.roseSrv.playerSassuolo().subscribe(res => {
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

  printSquadSpezia() {
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.idUser = utente.user.id
    this.roseSrv.playerSpezia().subscribe(res => {
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

  printSquadCremonese() {
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.idUser = utente.user.id
    this.roseSrv.playerCremonese().subscribe(res => {
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

  printSquadSampdoria() {
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.idUser = utente.user.id
    this.roseSrv.playerSampdoria().subscribe(res => {
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

  printSquadVerona() {
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.idUser = utente.user.id
    this.roseSrv.playerVerona().subscribe(res => {
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
