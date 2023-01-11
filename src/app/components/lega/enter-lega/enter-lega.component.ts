import { Component, OnInit } from '@angular/core';
import { LegaService } from '../lega.service';

@Component({
  selector: 'app-enter-lega',
  templateUrl: './enter-lega.component.html',
  styleUrls: ['./enter-lega.component.scss']
})
export class EnterLegaComponent implements OnInit {

  nomeTeam!: string
  budget!: [number]
  id!: number

  constructor(private legaSrv: LegaService) { }

  ngOnInit(): void {
    this.team()
  }

  team() {
    let team: any = localStorage.getItem('team')
    let t = JSON.parse(team)
    this.id = t.id
    this.legaSrv.recuperaTeam(t.id).subscribe((res => {
      this.nomeTeam = res.nome_team
      this.budget = res.budget
    }))
  }

}
