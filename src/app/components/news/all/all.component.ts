import { Component, Input, OnInit } from '@angular/core';
import { News } from 'src/app/interface/news';
import { Teams } from 'src/app/interface/teams';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

  news!: News[]
  teams!:Teams[]
  categoria!: string
  attivo:boolean = false
  

  constructor(private newSrv: NewsService) { }

  ngOnInit(): void {
    this.allTeams()
    setTimeout(()=>{this.newSrv.fetchNews().subscribe(res=>{
      this.news = res
      this.attivo = true
    })},1500)
  }

  allNews() {
    this.newSrv.fetchNews().subscribe(res => {
      this.news = res
    })
  }

  allTeams(){
    this.newSrv.fetchTeams().subscribe(res=>{
      this.teams = res  
    })
  }

  type(categoria:string){
    this.categoria = categoria
    setTimeout(()=>{
      this.newSrv.fetchNews().subscribe((res)=>{  
        this.news = res.filter(category=> this.categoria == category.category);
        this.attivo = true
       })
    })
  }

  squad(team:string){
    this.categoria = team
    this.newSrv.fetchNews().subscribe((res)=>{  
     this.news = res.filter(category=> this.categoria == category.team);
    })
  }

  // truncate(a:string){
  //   if(a.length > 10){
  //     return a.substring(0) + '...'
  //   }else{
  //     return a
  //   }
  // }
}
