import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Search, SearchPlayer, SearchStatistics } from '../rose';
import { RoseService } from '../rose.service';

@Component({
  selector: 'app-search-player',
  templateUrl: './search-player.component.html',
  styleUrls: ['./search-player.component.scss']
})
export class SearchPlayerComponent implements OnInit {
  searchPlayer!: SearchPlayer[]
  searchStat!: SearchStatistics
  
  constructor(private roseSrv:RoseService) { }

  ngOnInit(): void {
  }
 

}
