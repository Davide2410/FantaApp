import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LegaTeam, Partecipanti, TeamModify } from '../../lega';
import { LegaService } from '../../lega.service';

@Component({
  selector: 'app-modifica',
  templateUrl: './modifica.component.html',
  styleUrls: ['./modifica.component.scss']
})
export class ModificaComponent implements OnInit {

  teamForm!: FormGroup
  id!: number
  // nome!:string
  // budget!:number


  constructor(private legaSrv:LegaService,private fb: FormBuilder, private r:Router) { }

  ngOnInit(): void {
    this.popola()
  }

  popola(){
    let team:any= localStorage.getItem('team')
    let t = JSON.parse(team)
    this.id = t.id
    this.legaSrv.recuperaTeam(t.id).subscribe((res=>{
      let a = res
      this.teamForm = this.fb.group({
        newNameTeam: this.fb.control(a.nome_team),
        newBudget: this.fb.control(a.budget),
      })
    }))

  }

  submit(){
    let team:any= localStorage.getItem('team')
    let t = JSON.parse(team)
    let data: LegaTeam|Partecipanti = {
      nome_team: this.teamForm.value.newNameTeam,
      budget: this.teamForm.value.newBudget,
      user_admin:t.user_admin,
      idLega:t.idLega,
      user_id:t.user_id,
      nomeLega:t.nomeLega,
    }
    this.legaSrv.modificaTeam(data, this.id).subscribe((res=>{
      this.teamForm.reset()
      res.nome_team = data.nome_team
      this.r.navigate(['/lega'])
    }))
  }

}
