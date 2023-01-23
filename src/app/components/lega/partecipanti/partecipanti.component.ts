import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auth, UserPartecipanti, UserPut } from 'src/app/auth/auth';
import { AuthService } from 'src/app/auth/auth.service';
import { Lega, LegaTeam, Partecipanti } from '../lega';
import { LegaService } from '../lega.service';

@Component({
  selector: 'app-partecipanti',
  templateUrl: './partecipanti.component.html',
  styleUrls: ['./partecipanti.component.scss']
})
export class PartecipantiComponent implements OnInit {
  i!: number

  partecipanti!: UserPartecipanti[]
  user:any[]=[]
  player:any[]=[]
  idLega!:number


  name!: string

  oggetto!:Partecipanti|LegaTeam

  constructor(private authSrv: AuthService , private legaSrv:LegaService , private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let stringId: any = params.get("id");
      this.idLega = parseFloat(stringId)
      this.allPartecipanti()
    })
  }


  allPartecipanti(){
    this.authSrv.allUser().subscribe(res=>{
      this.partecipanti = res
      console.log(res);
      this.legaSrv.fetchLeghe().subscribe(res=>{
        res.forEach(lega=>{
          if(lega.id == this.idLega ){
            console.log(lega.partecipanti);
            lega.partecipanti.forEach((element:number) => {
              this.partecipanti.forEach((el:any)=>{
                if(el.id == element && lega.id == this.idLega){
                  this.user.push(el)
                }
              })
            });
          }
        })
      })
    })
  }

}

