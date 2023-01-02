import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { News } from 'src/app/interface/news';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  @Input() n!: any


  constructor(private newSrv:NewsService , private r:Router) { }

  ngOnInit(): void {
  }

 
  

}
