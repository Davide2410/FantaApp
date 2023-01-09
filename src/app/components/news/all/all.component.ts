import { Component, Input, OnInit } from '@angular/core';
import { News } from 'src/app/interface/news';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

  news!: News[]
  categoria!: string
  team!:string

  constructor(private newSrv: NewsService) { }

  ngOnInit(): void {
    this.allNews()
  }

  allNews() {
    this.newSrv.fetchNews().subscribe(res => {
      this.news = res
    })
  }

  type(categoria:string){
    this.categoria = categoria
    this.newSrv.fetchNews().subscribe((res)=>{  
     this.news = res.filter(category=> this.categoria == category.category);
    })
  }

  squad(team:string){
    this.categoria = team
    this.newSrv.fetchNews().subscribe((res)=>{  
     this.news = res.filter(category=> this.categoria == category.team);
    })
  }

  heartClick() {
    let heart = document.getElementById('heart')
    heart!.classList.toggle('text-danger')
  }


  // truncate(a:string){
  //   if(a.length > 10){
  //     return a.substring(0) + '...'
  //   }else{
  //     return a
  //   }
  // }
}
