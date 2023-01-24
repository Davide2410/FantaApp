import { Component, Input, OnInit } from '@angular/core';
import { Auth } from 'src/app/auth/auth';
import { RoseTeam } from 'src/app/components/rosa/rose';

@Component({
  selector: 'app-tova-giocatore',
  templateUrl: './tova-giocatore.component.html',
  styleUrls: ['./tova-giocatore.component.scss']
})
export class TovaGiocatoreComponent implements OnInit {

  @Input() p!:RoseTeam 

  constructor() { }

  ngOnInit(): void {
  }

}
