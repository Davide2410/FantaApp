import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/interface/news';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-dettaglio',
  templateUrl: './dettaglio.component.html',
  styleUrls: ['./dettaglio.component.scss']
})
export class DettaglioComponent implements OnInit {

  notizia!: News
  id!: number

  news!: News[]

  array!: []

  constructor(private newSrv: NewsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let stringId: any = params.get("id");
      this.id = parseFloat(stringId)
      this.dettaglio(stringId)
    })
    // this.navbar()
  }

  dettaglio(id: number) {
    this.newSrv.dettaglioNews(id).subscribe(res => {
      console.log(res);
      this.notizia = res
    })
  }

  darkMode() {
    let container = document.getElementById('container')
    let title = document.getElementById('title')
    let title2 = document.getElementById('title2')
    container!.classList.toggle('nero')
    title?.classList.toggle('text-blue')
    title2?.classList.toggle('text-blue')
  }

  right() {
    this.dettaglio(this.id++)
  }

  left() {
    this.dettaglio(this.id--)
  }


  // navbar(){
  //   window.onscroll = function() {
  //   var navbar = document.querySelector('.navbar')
  //     if (document.body.scrollTop > 80) {
  //       navbar!.classList.add('none')
  //     } else {
  //       navbar!.classList.add('bg-transparent')
  //     }
  //   };
  // }



}
