import { Component, OnInit } from '@angular/core';
import { Lega } from '../lega';
import { LegaService } from '../lega.service';

@Component({
  selector: 'app-leghe',
  templateUrl: './leghe.component.html',
  styleUrls: ['./leghe.component.scss']
})
export class LegheComponent implements OnInit {

  leghe!:Lega[]

  constructor(private legheSrv:LegaService) { }

  ngOnInit(): void {
    this.allLeghe()
  }

  allLeghe(){
    this.legheSrv.fetchLeghe().subscribe(res=>{
      this.leghe = res
    })
  }

}
