import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/auth';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  name!: string
  avatar!:string
  users: Auth[] = []

  @ViewChild('form') form!: NgForm

  constructor(private authSrv: AuthService, private r: Router) { }

  ngOnInit(): void {
    this.recuperaUtente()
    // this.recuperaAvatar()
  }

  

  recuperaUtente() {
    let x:any = localStorage.getItem('user')
    let y = JSON.parse(x)
    this.name = y.user.name    
  }

  // recuperaAvatar(){
  //   let local:any = localStorage.getItem('avatar')
  //   let y = JSON.parse(local)
  //   this.avatar = y.avatar
  //   console.log(y.avatar);
    
  // }

  reload(){
    location.reload()
  }

  

}
