import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.scroll()
  }

  scroll(){
    let top = document.getElementById('top')
    window.onscroll = function (){
      if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
        top!.classList.remove('d-none')
      }else{
        top!.classList.add('d-none')
      }
    }
  }

  top(){
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0;
  }

}
