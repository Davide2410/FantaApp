import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {  UserPut } from 'src/app/auth/auth';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  heroForm!: FormGroup;
  id!: number
  email!:string
  password!:string
  name!: string
  gender!:string
  birthday!:string

  constructor(private authSrv: AuthService, private r: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.popolaForm()
  }


  popolaForm() {
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.id = utente.user.id
    this.email = utente.user.email,
    this.password = utente.user.password


    this.authSrv.recuperaUtente(utente.user.id).subscribe((res => {
      let x = res

      this.name = res.name

      this.heroForm = this.fb.group({
        newName: this.fb.control(x.name),
        newGender: this.fb.control(x.gender),
        newBirthday: this.fb.control(x.birthday),
        newEmail: this.fb.control(x.email),
        newPassword: this.fb.control(null)
      })

    }))
  }

  submit() {
    let data: UserPut = {
      name: this.heroForm.value.newName,
      gender: this.heroForm.value.newGender,
      birthday: this.heroForm.value.newBirthday,
      email: this.heroForm.value.newEmail,
      password: this.heroForm.value.newPassword
    }

    this.authSrv.modificaUtente(data, this.id).subscribe((res => {
      this.heroForm.reset()
      res
    }))
  }


  elimina() {
    this.authSrv.eliminaUtente(this.id).subscribe(res => {
      res
      console.log(res);
    })
    this.r.navigate(['/login'])
  }


  logOut() {
    this.authSrv.logOut()
    this.r.navigate(['login'])
  }



}
