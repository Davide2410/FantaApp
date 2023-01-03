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

  constructor(private newSrv: NewsService) { }

  ngOnInit(): void {
    this.allNews()
    this.allCategory()
    // this.allTeam()
  }

  allNews() {
    this.newSrv.fetchNews().subscribe(res => {
      console.log(res);
      this.news = res
    })
  }

  allCategory() {
    this.newSrv.fetchNews().subscribe(res => {
      let categoriesWrapper = document.querySelector('#categories')
      let categories = Array.from(new Set(res.map(el => el.category)))
      categories.forEach(category => {
        let div = document.createElement('div')
        div.innerHTML =
          `
      <button type="button" class="btn btn-rounded btn-light button-category text-blue" >${category}</button>
      `
        categoriesWrapper?.appendChild(div)
      })
    })
  }



  allTeam() {
    this.newSrv.fetchNews().subscribe(res => {
      let categoriesWrapper = document.querySelector('#categories')
      let teams = Array.from(new Set(res.map(el => el.team)))
      console.log(teams);
      teams.forEach(team => {
        let div = document.createElement('div')
        div.innerHTML =
          `
        <button type="button" class="btn btn-rounded button-category text-blue">${team}</button>
        
        `
        categoriesWrapper?.appendChild(div)

      })

    })
  }

  heartClick() {
    let heart = document.getElementById('heart')
    heart?.classList.toggle('text-danger')
  }
}
