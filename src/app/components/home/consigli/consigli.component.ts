import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/interface/news';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-consigli',
  templateUrl: './consigli.component.html',
  styleUrls: ['./consigli.component.scss']
})
export class ConsigliComponent implements OnInit {

  filter!:News[]

  constructor(private newSrv:NewsService) { }

  ngOnInit(): void {
    this.consigliNews()
  }

  consigliNews(){
   this.newSrv.fetchNews().subscribe(res=>{
    this.filter = res.filter(el=> el.category == 'Consigli Fantacalcio')
    console.log(this.filter);
   })
  }

}
