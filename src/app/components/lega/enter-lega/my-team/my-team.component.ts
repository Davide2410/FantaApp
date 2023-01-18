import { Component, Input, OnInit } from '@angular/core';
import { AggiungiPlayer, RoseTeam } from 'src/app/components/rosa/rose';
import { RoseService } from 'src/app/components/rosa/rose.service';
import { LegaService } from '../../lega.service';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss']
})
export class MyTeamComponent implements OnInit {

  constructor(private legaSrv: LegaService, private roseSrv: RoseService) { }

  nomeTeam!: string
  budget!: [number]
  id!: number
  idUser!: number
  name!: string

  squadPlayer: RoseTeam[] = []

  player!:AggiungiPlayer
  vuoto: any[] = []


  ngOnInit(): void {
    this.team()
    this.printSquad()
  }

  team() {
    let team: any = localStorage.getItem('team')
    let t = JSON.parse(team)

    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)

    this.name = utente.user.name
    this.id = t.id


    this.legaSrv.recuperaTeam(this.id).subscribe((res => {
      this.nomeTeam = res.nome_team
      this.budget = res.budget
    }))
  }

  printSquad(){
    let user:any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.id = utente.user.id
    
    this.roseSrv.playerRoma().subscribe(res=>{
      this.squadPlayer = res.response[0].players
      this.squadPlayer.forEach(p =>{
        this.roseSrv.fetchAllSquad().subscribe(res=>{
          res.forEach(player=>{
            if(player.userId == utente.user.id){
              if(player.playerId == p.id){
                let b = this.vuoto.push(p)
               }
            }
          })
        })
      })
    })

    this.roseSrv.playerNapoli().subscribe(res=>{
      this.squadPlayer = res.response[0].players
      this.squadPlayer.forEach(p =>{
        this.roseSrv.fetchAllSquad().subscribe(res=>{
          res.forEach(player=>{
            if(player.userId == utente.user.id){
              if(player.playerId == p.id){
                let b = this.vuoto.push(p)
               }
            }
          })
        })
      })
    })
  }

  // b(){
  //   let user:any = localStorage.getItem('user')
  //   let utente = JSON.parse(user)
  //   this.id = utente.user.id

  //   this.roseSrv.fetchAllSquad().subscribe(res=>{
  //     res.forEach(el=>{
  //       console.log(el);
        
  //     })
  //   })

  // }

  // all() {
  //   let user: any = localStorage.getItem('user')
  //   let utente = JSON.parse(user)
  //   this.id = utente.user.id

  
  //   this.roseSrv.playerRoma().subscribe(res => {

  //     this.squadPlayer = res.response[0].players
  //     console.log(this.squadPlayer);
  //     this.squadPlayer.forEach(el => {
  //      console.log(el)
  //     })

  //     this.roseSrv.fetchAllSquad().subscribe(res=>{
  //       res.forEach(player=>{
  //         console.log(player);
  //       })
  //     })

  //   })
  // }






}
