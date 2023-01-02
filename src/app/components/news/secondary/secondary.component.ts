import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { News } from 'src/app/interface/news';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-secondary',
  templateUrl: './secondary.component.html',
  styleUrls: ['./secondary.component.scss']
})
export class SecondaryComponent implements OnInit {

  @Input() n!: any

 
  constructor(private newSrv:NewsService , private r:Router) { }

  ngOnInit(): void {
  }
}
