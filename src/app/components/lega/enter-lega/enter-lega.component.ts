import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { LegaInfo } from '../lega';
import { LegaService } from '../lega.service';

@Component({
  selector: 'app-enter-lega',
  templateUrl: './enter-lega.component.html',
  styleUrls: ['./enter-lega.component.scss']
})
export class EnterLegaComponent implements OnInit {

  nomeTeam!: string
  budget!: [number]
  id!: number
  idUser!: number
  err: string | undefined
 


  constructor(private legaSrv: LegaService, private r:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let stringId: any = params.get("id");
      this.id = parseFloat(stringId)
      this.team()
    })
  }

  team() {
    let user:any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.idUser = utente.user.id

    console.log(this.id);
    this.legaSrv.allTeamUser().subscribe(res=>{
      res.forEach(el=>{
        if(el.idLega == this.id && el.user_id == this.idUser){
          console.log(el);
          this.nomeTeam = el.nome_team
          this.budget = el.budget
        }
      })
    })

  }

  admin(){
    let team: any = localStorage.getItem('team')
    let t = JSON.parse(team)
    let err = document.getElementById('err')
    if(t.user_admin == true){
      this.r.navigate(['/impostazioni/lega/'+ this.id])
    }else{
      err!.classList.toggle('d-none')
    }
  }

}
