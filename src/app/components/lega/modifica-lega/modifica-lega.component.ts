import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Numbers } from 'src/app/interface/numbers';
import { LegaModifica } from '../lega';
import { LegaService } from '../lega.service';

@Component({
  selector: 'app-modifica-lega',
  templateUrl: './modifica-lega.component.html',
  styleUrls: ['./modifica-lega.component.scss']
})
export class ModificaLegaComponent implements OnInit {

  numbers!: Numbers[]
  negative!: Numbers[]
  legaForm!:FormGroup
  id!:number
  constructor(private legaSrv:LegaService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.popolaForm()
    this.allNegative()
    this.allNumbers()
  }

  popolaForm(){
    let lega: any = localStorage.getItem('lega')
    let a = JSON.parse(lega)
    this.id = a.id

    this.legaSrv.recuperaLega(a.id).subscribe(res=>{
      let x = res
      this.legaForm = this.fb.group({
        newNomeLega:this.fb.control(x.nomeLega),
        newPasswordLega:this.fb.control(x.passwordLega),
        newGol:this.fb.control(x.gol),
        newAutogol:this.fb.control(x.autogol),
        newAssist:this.fb.control(x.assist),
        newAmmonizione:this.fb.control(x.ammonizione),
        newEspulsione:this.fb.control(x.espulsione),
        newRigoreSbagliato:this.fb.control(x.rigoreSbagliato),
        newRigoreSegnato:this.fb.control(x.rigoreSegnato),
        newRigoreParato:this.fb.control(x.rigoreParato),
        newGolSubito:this.fb.control(x.golSubito),
        newGolVittoria:this.fb.control(x.golVittoria),
        newGolPareggio:this.fb.control(x.golPareggio),
        newClenSheet:this.fb.control(x.cleanSheet),
        newFascia_1:this.fb.control(x.fascia_1),
        newFascia_2:this.fb.control(x.fascia_2),
        newFascia_3:this.fb.control(x.fascia_3),
        newFascia_4:this.fb.control(x.fascia_4),
        newFascia_5:this.fb.control(x.fascia_5),
        newFascia_6:this.fb.control(x.fascia_6),
        newFascia_7:this.fb.control(x.fascia_7),
        newFascia_8:this.fb.control(x.fascia_8),
        newFascia_9:this.fb.control(x.fascia_9),
        newFascia_10:this.fb.control(x.fascia_10)
      })
    })

  }

  modifica(){
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    let lega: any = localStorage.getItem('lega')
    let a = JSON.parse(lega)
    this.id = utente.user.id
    let data: LegaModifica = {
      nomeLega: this.legaForm.value.newNomeLega,
      passwordLega: this.legaForm.value.newPasswordLega,
      user_id: utente.user.id,
      nomeAdmin:utente.user.name,
      partecipanti:utente.user.id,
      gol: this.legaForm.value.newGol,
      autogol: this.legaForm.value.newAutogol,
      assist: this.legaForm.value.newAssist,
      ammonizione: this.legaForm.value.newAmmonizione,
      espulsione: this.legaForm.value.newEspulsione,
      rigoreSegnato: this.legaForm.value.newRigoreSegnato,
      rigoreSbagliato: this.legaForm.value.newRigoreSbagliato,
      rigoreParato: this.legaForm.value.newRigoreParato,
      golSubito: this.legaForm.value.newGolSubito,
      golVittoria: this.legaForm.value.newGolVittoria,
      golPareggio: this.legaForm.value.newGolPareggio,
      cleanSheet: this.legaForm.value.newCleanSheet,
      fascia_1: this.legaForm.value.newFascia_1,
      fascia_2: this.legaForm.value.newFascia_2,
      fascia_3: this.legaForm.value.newFascia_3,
      fascia_4: this.legaForm.value.newFascia_4,
      fascia_5: this.legaForm.value.newFascia_5,
      fascia_6: this.legaForm.value.newFascia_6,
      fascia_7: this.legaForm.value.newFascia_7,
      fascia_8: this.legaForm.value.newFascia_8,
      fascia_9: this.legaForm.value.newFascia_9,
      fascia_10: this.legaForm.value.newFascia_10
    }
    this.legaSrv.modificaLega(data, a.id).subscribe((res=>{
      this.legaForm.reset()
      res
    }))
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
}
