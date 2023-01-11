import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Numbers } from 'src/app/interface/numbers';
import { Teams } from 'src/app/interface/teams';
import { Lega, LegaTeam } from '../lega';
import { LegaService } from '../lega.service';

@Component({
  selector: 'app-impostazioni',
  templateUrl: './impostazioni.component.html',
  styleUrls: ['./impostazioni.component.scss']
})
export class ImpostazioniComponent implements OnInit {

  teams!: Teams[]
  numbers!: Numbers[]
  negative!: Numbers[]
  admin!: boolean
  constructor(private legaSrv: LegaService, private r: Router) { }

  ngOnInit(): void {
    this.allNumbers()
    this.allNegative()
  }

  // FORM 1
  registrati(form: NgForm): void {
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)

    let data: Lega = {
      nomeLega: form.value.nomeLega,
      passwordLega: form.value.passwordLega,
      user_id: utente.user.id,
      nomeAdmin:utente.user.name,
      gol: form.value.gol,
      autogol: form.value.autogol,
      assist: form.value.assist,
      ammonizione: form.value.ammonizione,
      espulsione: form.value.espulsione,
      rigoreSegnato: form.value.rigoreSegnato,
      rigoreSbagliato: form.value.rigoreSbagliato,
      rigoreParato: form.value.rigoreParato,
      golSubito: form.value.golSubito,
      golVittoria: form.value.golVittoria,
      golPareggio: form.value.golPareggio,
      cleanSheet: form.value.cleanSheet,
      fascia_1: form.value.fascia_1,
      fascia_2: form.value.fascia_2,
      fascia_3: form.value.fascia_3,
      fascia_4: form.value.fascia_4,
      fascia_5: form.value.fascia_5,
      fascia_6: form.value.fascia_6,
      fascia_7: form.value.fascia_7,
      fascia_8: form.value.fascia_8,
      fascia_9: form.value.fascia_9,
      fascia_10: form.value.fascia_10
    }

    this.legaSrv.submit(data).subscribe(res => {
      console.log(res);
      form.reset()
      let form1 = document.querySelector('.form1')
      let form2 = document.querySelector('.form2')
      form1?.classList.add('d-none')
      form2?.classList.remove('d-none')
    })
  }


  register(team: NgForm): void {
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)

    let lega: any = localStorage.getItem('lega')
    let a = JSON.parse(lega)
    let data: LegaTeam = {
      nome_team: team.value.nome_team,
      budget: team.value.budget,
      user_id: utente.user.id,
      user_admin:true,
      idLega: a.id,
      nomeLega: a.nomeLega

    }
    this.legaSrv.invio(data).subscribe(res => {
      console.log(res);
      team.reset()
      this.r.navigate([''])
    })
  }


  // NEXT "PRIMO" FORM
  next1() {
    let generale = document.querySelector('.generale')
    let bonus = document.querySelector('.bonus')
    generale?.classList.add('d-none')
    bonus?.classList.remove('d-none')
  }

  // BACK DA 2 A 1
  back1() {
    let generale = document.querySelector('.generale')
    let bonus = document.querySelector('.bonus')
    generale?.classList.remove('d-none')
    bonus?.classList.add('d-none')
  }
  // NEXT "SECONDO" FORM
  next2() {
    let bonus = document.querySelector('.bonus')
    let fasceGol = document.querySelector('.fasceGol')
    fasceGol?.classList.remove('d-none')
    bonus?.classList.add('d-none')
  }
  // BACK DA 3 A 2
  back2() {
    let bonus = document.querySelector('.bonus')
    let fasceGol = document.querySelector('.fasceGol')
    fasceGol?.classList.add('d-none')
    bonus?.classList.remove('d-none')
  }


  // ARRAY NUM POSITIVI
  allNumbers() {
    this.legaSrv.fetchNumbers().subscribe(res => {
      this.numbers = res
    })
  }
  // ARRAY NUM NEGATIVI
  allNegative() {
    this.legaSrv.fetchNegative().subscribe(res => {
      this.negative = res
    })
  }
  // COUNT FASCIA GOL DA 60 A 120
  count() {
    for (let i = 60; i <= 120; i += 0.5) {
      i
    }
  }

}
