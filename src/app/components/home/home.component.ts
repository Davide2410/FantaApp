import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/auth';
import { AuthService } from 'src/app/auth/auth.service';
import { News } from 'src/app/interface/news';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   news: News[] = []
   
  constructor(private newSrv:NewsService , private r :Router) { }

  ngOnInit(): void {
    this.stampaNews()
  }

  stampaNews(){
    this.newSrv.fetchNews().subscribe(res=>{
      this.news = res
    })
  }
}
