import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-lega',
  templateUrl: './navbar-lega.component.html',
  styleUrls: ['./navbar-lega.component.scss']
})
export class NavbarLegaComponent implements OnInit {

  presidente!:string
  nomeLega!:string

  constructor() { }

  ngOnInit(): void {
    let lega:any = localStorage.getItem('lega')
    let l = JSON.parse(lega)
    this.presidente = l.nomeAdmin
    this.nomeLega = l.nomeLega
  }

  reload(){
    location.reload()
  }

}
