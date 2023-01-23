import { Component, OnInit } from '@angular/core';
import { Lega } from '../lega/lega';
import { LegaService } from '../lega/lega.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalLegaComponent } from '../modal-lega/modal-lega.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-lega',
  templateUrl: './search-lega.component.html',
  styleUrls: ['./search-lega.component.scss']
})
export class SearchLegaComponent implements OnInit {

  leghe: Lega[] = []
  modalRef: MdbModalRef<ModalLegaComponent> | null = null;
  id!:number
  l!:Lega
  a!:number
  i!:Lega
  name!:string

  constructor(private legaSrv: LegaService, private modalService: MdbModalService, private r:Router) { }

  ngOnInit(): void {
    this.allLeghe()
  }

  allLeghe() {
    this.legaSrv.fetchLeghe().subscribe(res => {
     this.leghe = res
     this.leghe.forEach(el=>{
      this.name = el.nomeAdmin
     })
    })
  }


  openModal(l:Lega, id:any) {  
    let user:any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.id = utente.user.id
    
   this.legaSrv.recuperaLega(id).subscribe(res=>{
     res.partecipanti.forEach((p:number)=>{
       if(p == this.id){
        this.a = p
        console.log(this.a);
       }
     })
     if(this.a == utente.user.id){
      console.log('ciao');
     }else{
       this.modalRef = this.modalService.open(ModalLegaComponent, {
         data: { 
           l,
           id
         },
       });
     }
   })
  }

}
