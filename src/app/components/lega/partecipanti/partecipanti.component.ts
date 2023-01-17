import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auth, UserPartecipanti, UserPut } from 'src/app/auth/auth';
import { AuthService } from 'src/app/auth/auth.service';
import { Lega } from '../lega';

@Component({
  selector: 'app-partecipanti',
  templateUrl: './partecipanti.component.html',
  styleUrls: ['./partecipanti.component.scss']
})
export class PartecipantiComponent implements OnInit {
  i!: number

  partecipanti!: UserPartecipanti[]
  user:any[]=[]
  name!: string


  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
    this.allPartecipanti()
  }

  allPartecipanti() {
    this.authSrv.allUser().subscribe(res => {
      this.partecipanti = res
      let lega: any = localStorage.getItem('lega')
      let l = JSON.parse(lega)
      l.partecipanti.forEach((p: number) => {
        this.partecipanti.forEach((el: any) => {
          if (el.id == p) {
          let b = this.user.push(el)
          }
        })
      })
    })
  }
}

