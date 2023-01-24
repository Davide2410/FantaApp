import { Component, Input, OnInit } from '@angular/core';
import { RoseTeam } from 'src/app/components/rosa/rose';

@Component({
  selector: 'app-giocatore',
  templateUrl: './giocatore.component.html',
  styleUrls: ['./giocatore.component.scss']
})
export class GiocatoreComponent implements OnInit {

  @Input() p!:RoseTeam

  constructor() { }

  ngOnInit(): void {
  }

}
