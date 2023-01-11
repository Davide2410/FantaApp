import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Partecipanti } from '../lega/lega';
import { LegaService } from '../lega/lega.service';

@Component({
  selector: 'app-modal-lega',
  templateUrl: './modal-lega.component.html',
  styleUrls: ['./modal-lega.component.scss']
})
export class ModalLegaComponent implements OnInit {

  err: string | undefined

  constructor(public modalRef: MdbModalRef<ModalLegaComponent>, private legaSrv: LegaService, private r: Router) { }

  ngOnInit(): void {
  }

  entra(form: NgForm) {
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)

    let lega: any = localStorage.getItem('lega')
    let a = JSON.parse(lega)

    let data: Partecipanti = {
      nome_team: form.value.nome_team,
      budget: form.value.budget,
      controlloPsw: form.value.controlloPsw === a.passwordLega,
      user_admin: false,
      user_id: utente.user.id,
      nomeLega: a.nomeLega,
      idLega: a.id
    }
    let error = document.getElementById('error');
    if (data.controlloPsw == false) {
      error!.classList.remove('d-none')
      this.err = `La Password non è corretta!`
    }else {
      this.legaSrv.newPartecipanti(data).subscribe(res => {
        console.log(res);
        error!.classList.add('d-none')
        form.reset()
      })
    }
  }

}
