import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/interface/news';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-home-news',
  templateUrl: './home-news.component.html',
  styleUrls: ['./home-news.component.scss']
})
export class HomeNewsComponent implements OnInit {

  filter!: News[]

  constructor(private newSrv: NewsService) { }

  ngOnInit(): void {
    this.calciomercatoNews()
  }

  calciomercatoNews() {
    this.newSrv.fetchNews().subscribe(res => {
      this.filter = res.filter(res => res.category == 'Calciomercato')
    })
  }

}
