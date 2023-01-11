import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enter-lega',
  templateUrl: './enter-lega.component.html',
  styleUrls: ['./enter-lega.component.scss']
})
export class EnterLegaComponent implements OnInit {

  nomeTeam!:string
  budget!:boolean

  constructor() { }

  ngOnInit(): void {
    this.team()
  }

  team(){
    let team:any = localStorage.getItem('team')
    let b = JSON.parse(team)
    this.nomeTeam = b.nome_team
    this.budget = b.budget
  }

}
