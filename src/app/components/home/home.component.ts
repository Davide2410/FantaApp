import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/auth';
import { AuthService } from 'src/app/auth/auth.service';
import { News } from 'src/app/interface/news';
import { Teams } from 'src/app/interface/teams';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   news: News[] = []
   teams!:Teams[]
   categoria!: string

   
  constructor(private newSrv:NewsService , private r :Router) { }

  ngOnInit(): void {
    this.stampaNews()
    this.allTeams()
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

  squad(team:string){
    this.categoria = team
    this.newSrv.fetchNews().subscribe((res)=>{  
     this.news = res.filter(category=> this.categoria == category.team);
    })
  }
}
