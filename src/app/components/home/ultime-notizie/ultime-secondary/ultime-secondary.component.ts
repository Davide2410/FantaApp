import { Component, Input, OnInit } from '@angular/core';
import { News } from 'src/app/interface/news';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-ultime-secondary',
  templateUrl: './ultime-secondary.component.html',
  styleUrls: ['./ultime-secondary.component.scss']
})
export class UltimeSecondaryComponent implements OnInit {

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
