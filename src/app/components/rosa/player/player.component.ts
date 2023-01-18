import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Club, RoseTeam } from '../rose';
import { RoseService } from '../rose.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input()p!: RoseTeam
  @Input()roma!: Club
  
  id!:number
  count: number = 0
  isFav: boolean = false
  preferiti: any

  constructor(private roseSrv: RoseService) { }

  ngOnInit(): void {
    this.addPlayer()
    this.getPlayerAdd()
  }

  // calcola(budget:NgForm){


  // }

  // CONTA I LIKE
  getPlayerAdd(){  
    this.roseSrv.getConutFav(this.p.id).subscribe(res=>{
      let lunghezza = res
      this.count = lunghezza.length
    })
  }

  addPlayer(){
    this.roseSrv.getSquad().subscribe(res=>{
      let favorities = res
      let f = favorities.find((a:any)=> a.playerId == this.p.id )
      if(f){
        this.isFav = true
        this.count++
        this.preferiti = f
      }else{
        this.isFav = false
      }
    })
  }

  add(id:number){
    this.roseSrv.aggiungiGiocatore(id).subscribe(res=>{
      console.log(res);
      this.isFav = true
      this.addPlayer()
      this.getPlayerAdd()
    })
  }

  rimuoviLike(){
    this.roseSrv.deleteGiocatore(this.preferiti.id).subscribe(res=>{
      console.log(res);
    })
    this.isFav = false
    this.count--
  }
}
