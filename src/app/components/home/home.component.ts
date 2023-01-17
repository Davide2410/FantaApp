import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { News } from 'src/app/interface/news';
import { Teams } from 'src/app/interface/teams';
import { NewsService } from 'src/app/service/news.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from 'src/app/modal/modal.component';
import { LegaService } from '../lega/lega.service';
import { Lega, LegaInfo} from '../lega/lega';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  modalRef: MdbModalRef<ModalComponent> | null = null;

   news: News[] = []
   teams!:Teams[]
   leghe:LegaInfo[]=[]
   categoria!: string
   user_id!:Lega[]
   id!:number
   nomeTeam:string|undefined

   
  constructor(private newSrv:NewsService , private r :Router, private modalService: MdbModalService, private legheSrv:LegaService, private authSrv:AuthService) { }

  ngOnInit(): void {
    this.stampaNews()
    this.allTeams()
    this.allLeghe()
    // this.squadraDettaglio()
  }

  stampaNews(){
    this.newSrv.fetchNews().subscribe(res=>{
      this.news = res
    })
  }

  allTeams(){
    this.newSrv.fetchTeams().subscribe(res=>{
      this.teams = res  
    })
  }

  click(){
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.id = utente.user.id
    this.authSrv.recuperaLegaLogIn(this.id)
    this.authSrv.recuperaTeamLogIn(this.id)
  }
  // squadraDettaglio(){
  //   let team: any = localStorage.getItem('team')
  //   let t = JSON.parse(team)
  //   this.id = t.id
   
  //   this.legheSrv.recuperaTeam(t.id).subscribe(res=>{
  //        this.nomeTeam = res.nome_team
  //   })
  // }

  allLeghe(){
    setTimeout(()=>{
      let lega: any = localStorage.getItem('lega')
    let a = JSON.parse(lega)

    let team: any = localStorage.getItem('team')
    let b = JSON.parse(team)
   
    this.legheSrv.fetchLeghe().subscribe(res=>{
      if(a.id == b.idLega){
       this.leghe = res
      }else{
        console.log('NESSUNA LEGA');
      }
    })
    }, 100)
  }

  squad(team:string){
    this.categoria = team
    this.newSrv.fetchNews().subscribe((res)=>{  
     this.news = res.filter(category=> this.categoria == category.team);
    })
  }

  openModal() {
    this.modalRef = this.modalService.open(ModalComponent)
  }
}
