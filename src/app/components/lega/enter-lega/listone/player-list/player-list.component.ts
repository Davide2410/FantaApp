import { Component, Input, OnInit } from '@angular/core';
import { Club, Rose, RoseTeam } from 'src/app/components/rosa/rose';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  @Input() p!: RoseTeam
  constructor() { }

  ngOnInit(): void {
  }

}
