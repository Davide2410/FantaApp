import { Component, OnInit } from '@angular/core';
import { LegaService } from '../lega/lega.service';

@Component({
  selector: 'app-navbar-lega',
  templateUrl: './navbar-lega.component.html',
  styleUrls: ['./navbar-lega.component.scss']
})
export class NavbarLegaComponent implements OnInit {

  presidente!:string
  nomeLega!:string
  id!:number

  constructor(private legaSrv:LegaService) { }

  ngOnInit(): void {
    let lega:any = localStorage.getItem('lega')
    let l = JSON.parse(lega)
    this.id = l.id
    this.legaSrv.recuperaLega(this.id).subscribe(res=>{
      this.presidente = res.nomeAdmin,
      this.nomeLega = res.nomeLega
    })
  }

  reload(){
    location.reload()
  }

}
