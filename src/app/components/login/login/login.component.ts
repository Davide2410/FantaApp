import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthLogin } from 'src/app/auth/auth';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  err: string | undefined

  constructor(private authSrv:AuthService, private r:Router) { }

  ngOnInit(): void {
  }

  accedi(form:NgForm):void{
    let data : AuthLogin = {
      email: form.value.email,
      password: form.value.password
    }
    this.authSrv.logIn(data).pipe(catchError(err=>{
    let error = document.getElementById('error');
      if (err.error == "Cannot find user") {
        error!.classList.remove('none')
        this.err = `Utente non registrato`
      } else if (err.error == "Incorrect password") {
        error!.classList.remove('none')
        this.err = `Password errata`
      }else if (err.error == "Password is too short") {
        error!.classList.remove('none')
        this.err = `Password troppo corta`
      }
       else if (err.error == "Email format is invalid") {
        error!.classList.remove('none')
        this.err = `Formato email errato`
      }
      throw err
    })).subscribe((res=>{
      console.log(`${res} sono arrivato`);
      this.r.navigate(['/'])
    }))
  }

}
