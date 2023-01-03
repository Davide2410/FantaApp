import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/interface/news';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-ultime-notizie',
  templateUrl: './ultime-notizie.component.html',
  styleUrls: ['./ultime-notizie.component.scss']
})
export class UltimeNotizieComponent implements OnInit {

  filter!:News[]

  constructor(private newSrv:NewsService) { }

  ngOnInit(): void {
    this.ultimeNews()
  }

  ultimeNews(){
   this.newSrv.fetchNews().subscribe(res=>{
    this.filter = res.filter(el=> el.category == 'Ultime Notizie')
    console.log(this.filter);
   })
  }

}
