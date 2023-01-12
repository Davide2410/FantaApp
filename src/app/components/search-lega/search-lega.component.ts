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

  constructor(private legaSrv: LegaService, private modalService: MdbModalService, private r:Router) { }

  ngOnInit(): void {
    this.allLeghe()
  }

  allLeghe() {
    this.legaSrv.fetchLeghe().subscribe(res => {
     this.leghe = res
    })
  }

  openModal(l:Lega) {
    this.modalRef = this.modalService.open(ModalLegaComponent, {
      data: { l },
    });
  }

}
