import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Lega, Partecipanti } from '../lega/lega';
import { LegaService } from '../lega/lega.service';

@Component({
  selector: 'app-modal-lega',
  templateUrl: './modal-lega.component.html',
  styleUrls: ['./modal-lega.component.scss']
})
export class ModalLegaComponent implements OnInit {

  err: string | undefined

  l!: Lega

  a!: Lega['partecipanti']

  constructor(public modalRef: MdbModalRef<ModalLegaComponent>, private legaSrv: LegaService, private r: Router) { }

  ngOnInit(): void {
  }



  entra(form: NgForm) {
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.l.partecipanti.push(utente.user.id)

    this.legaSrv.modificaLega(this.l, this.l.id).subscribe(res => {
      console.log(res);
      localStorage.setItem('lega', JSON.stringify(res))
    })


    let data: Partecipanti = {
      nome_team: form.value.nome_team,
      budget: form.value.budget,
      controlloPsw: form.value.controlloPsw === this.l.passwordLega,
      user_admin: false,
      user_id: utente.user.id,
      nomeLega: this.l.nomeLega,
      idLega: this.l.id
    }
    let error = document.getElementById('error');
    if (data.controlloPsw == false) {
      error!.classList.remove('d-none')
      this.err = `La Password non è corretta!`
    } else {
      this.legaSrv.newPartecipanti(data).subscribe(res => {
        console.log(res);
        error!.classList.add('d-none')
        form.reset()
        this.modalRef.close()
        history.back()
      })
    }
  }

}
