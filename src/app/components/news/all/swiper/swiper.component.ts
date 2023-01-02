import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-swiper',
  template: ``,
  styleUrls: ['./swiper.component.scss']
})
export class SwiperComponent implements OnInit {

  constructor(private newSrv:NewsService) { }

  ngOnInit(): void {
  }

  allCategory(){
    this.newSrv.fetchNews().subscribe(res=>{
    let categoriesWrapper = document.querySelector('#categories')
    let categories = Array.from(new Set(res.map(el=> el.category)))
    categories.forEach(category => {
      let div = document.createElement('div')
      div.innerHTML = 
      `
      <button type="button" class="btn btn-rounded button-category text-blue">${category}</button>
      `
      categoriesWrapper?.appendChild(div)
    })
    })
  }
}
