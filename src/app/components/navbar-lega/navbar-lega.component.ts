import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private legaSrv:LegaService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let stringId: any = params.get("id");
      this.id = parseFloat(stringId)
      console.log(this.id);
      this.lega()
    })
  }


  lega(){
    this.legaSrv.fetchLeghe().subscribe(res=>{
      res.forEach(el=>{
        if(el.id == this.id){
          this.presidente = el.nomeAdmin
          this.nomeLega = el.nomeLega
        }
      })
    })
  }


  reload(){
    location.reload()
  }

  

}
