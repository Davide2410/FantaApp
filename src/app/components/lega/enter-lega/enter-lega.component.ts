import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  err: string | undefined

  constructor(private legaSrv: LegaService, private r:Router) { }

  ngOnInit(): void {
    this.team()
  }

  team() {
    let team: any = localStorage.getItem('team')
    let t = JSON.parse(team)
    this.id = t.id
    this.legaSrv.recuperaTeam(this.id).subscribe((res => {
      this.nomeTeam = res.nome_team
      this.budget = res.budget
    }))
  }

  admin(){
    let team: any = localStorage.getItem('team')
    let t = JSON.parse(team)
    let err = document.getElementById('err')
    if(t.user_admin == true){
      this.r.navigate(['/impostazioni/lega'])
    }else{
      err!.classList.toggle('d-none')
    }
  }

}
