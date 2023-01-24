import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { News } from 'src/app/interface/news';
import { Teams } from 'src/app/interface/teams';
import { NewsService } from 'src/app/service/news.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from 'src/app/modal/modal.component';
import { LegaService } from '../lega/lega.service';
import { Lega, LegaInfo } from '../lega/lega';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  modalRef: MdbModalRef<ModalComponent> | null = null;

  news: News[] = []
  teams!: Teams[]
  name!: string
  leghe!: LegaInfo
  categoria!: string
  user_id!: Lega[]
  id!: number
  nomeTeam: string | undefined
  arrayVuoto: LegaInfo[] = []


  constructor(private newSrv: NewsService, private r: Router, private modalService: MdbModalService, private legheSrv: LegaService, private authSrv: AuthService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.stampaNews()
      this.allTeams()
      this.allLeghe()
    }, 500)
  }

  stampaNews() {
    this.newSrv.fetchNews().subscribe(res => {
      this.news = res
    })
  }

  allTeams() {
    this.newSrv.fetchTeams().subscribe(res => {
      this.teams = res
    })
  }

  click() {
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.id = utente.user.id

    this.authSrv.recuperaLegaLogIn(this.id)
    this.authSrv.recuperaTeamLogIn(this.id)
  }


  allLeghe() {
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.id = utente.user.id

    let max = 10

    this.legheSrv.fetchLeghe().subscribe(res => {
      res.forEach(l => {
        l.partecipanti.forEach((el: any) => {
          if (this.id == el) {
            let sospeso = this.arrayVuoto.push(l)
            this.leghe = l
            console.log(this.leghe);
            l.numPartecipanti = l.partecipanti.length
          }
        })
      })
    })
  }



  squad(team: string) {
    this.categoria = team
    this.newSrv.fetchNews().subscribe((res) => {
      this.news = res.filter(category => this.categoria == category.team);
    })
  }

  openModal() {
    this.modalRef = this.modalService.open(ModalComponent)
  }
}
