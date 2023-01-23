import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { RoseTeam } from 'src/app/components/rosa/rose';
import { RoseService } from 'src/app/components/rosa/rose.service';

@Component({
  selector: 'app-svincolati',
  templateUrl: './svincolati.component.html',
  styleUrls: ['./svincolati.component.scss']
})
export class SvincolatiComponent implements OnInit {

  idLega!: number

  arrayRoma!: RoseTeam[]
  arrayPlayer!: RoseTeam
  vuoto: any[] = []

  constructor(private roseSrv: RoseService, private route: ActivatedRoute , private authSrv:AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let stringId: any = params.get("id");
      this.idLega = parseFloat(stringId)
      this.svincolatiRoma()
    })
  }

  svincolatiRoma() {
    this.roseSrv.fetchAllSquad().subscribe(res=>{
      res.forEach(el=>{
        if(el.legaId == this.idLega){
          this.roseSrv.playerRoma().subscribe(res=>{
            this.arrayRoma = res.response[0].players
            let b = this.arrayRoma.filter(x=> x.id != el.playerId)
            console.log(b);
          })
        }
      })
    })
  }

  // trova(){
  //   this.roseSrv.fetchAllSquad().subscribe(res=>{
  //     res.forEach(el=>{
  //       if(el.legaId == this.idLega){
  //         this.roseSrv.playerRoma().subscribe(res=>{
  //           this.arrayRoma = res.response[0].players
  //           this.arrayRoma.forEach(a =>{
  //            if(a.id == el.playerId){
  //             let b = this.vuoto.push(a)
  //             this.vuoto.forEach(v=>{
  //               this.authSrv.allUser().subscribe(res=>{
  //                 res.forEach((u:any)=>{
  //                  if(u.id == el.userId){
  //                   let c = this.vuoto.push(u)
  //                  }
  //                 })
  //               })
  //             })
  //            }
  //           })
  //         })
  //       }
  //     })
  //   })
  // }
}
