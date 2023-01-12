import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Lega, LegaTeam, Partecipanti } from '../components/lega/lega';
import { LegaService } from '../components/lega/lega.service';
import { Auth, AuthLogin, AuthRegister, UserPut } from './auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlPath = 'http://localhost:4201/users'

  urlRegister = 'http://localhost:4201/register'
  urlLogin = 'http://localhost:4201/login'
  urlLega = 'http://localhost:4201/leghe'
  urlTeam = 'http://localhost:4201/squadre'
  lega:Lega[]=[]

  authSubj = new BehaviorSubject<null | Auth>(null)
  // un oggetto che può essere osservato o osservatore, il suo compito è quando ci loggiamo con l'utente salviamo al suo inetrno i valori dell'utente(dati) e tutti i subscribe che vengono chiamti successivamente , ricevono gli stessi valori dell'utente
  user$ = this.authSubj.asObservable()

  jwtHelper = new JwtHelperService()
// scadenza token

  timeOut:any

  constructor(private http:HttpClient , private r: Router) {
    this.restore()
   }


  submit(data:AuthRegister){
   return this.http.post<Auth>(this.urlRegister, data).pipe(catchError(err=>{
    console.log(err);
    throw err
   }))
  }


  logIn(data:AuthLogin){
    return this.http.post<Auth>(this.urlLogin, data).pipe(catchError(err=>{
      console.log(err);
      throw err
     }),tap((res=>{
      this.authSubj.next(res)
      localStorage.setItem('user' , JSON.stringify(res))
      this.recuperaTeamLogIn(res.user.id)
      this.recuperaLegaLogIn(res.user.id)
     })))
  }

  recuperaTeamLogIn(id:number){
    return this.http.get<LegaTeam[]|Partecipanti[]>(`http://localhost:4201/squadre?user_id=${id}`).subscribe(res=>{
      localStorage.setItem('team' , JSON.stringify(res[0]))
    })
  }

  recuperaLegaLogIn(id:number){
    return this.http.get<Lega[]>('http://localhost:4201/leghe').subscribe(res=>{
      let a
      this.lega = res
      this.lega.forEach(element => {
        element.partecipanti.forEach(el=>{
         if( el == id){
            a = element
         }
        })
      });
      localStorage.setItem('lega' , JSON.stringify(a))
    })
  }


  logOut(){
    localStorage.removeItem('user')
    localStorage.removeItem('team')
    localStorage.removeItem('lega')
    this.authSubj.next(null)
    if(this.timeOut){
      clearTimeout(this.timeOut)
    }
    this.r.navigate(['/login'])
  }
  
  autoLogOut(data:Auth){
    const scadenza = this.jwtHelper.getTokenExpirationDate(data.accessToken) as Date
    const intervallo = scadenza.getTime() - new Date().getTime()
    this.timeOut = setTimeout(()=>{
      this.logOut()
    }, intervallo)
  }

  restore(){
    const user = localStorage.getItem('user')
    if(!user){
      return
    }
    const userData:Auth = JSON.parse(user)
    if(this.jwtHelper.isTokenExpired(userData.accessToken)){
      return
    }
    this.authSubj.next(userData)
    this.autoLogOut(userData)
  }


  recuperaUtente(id:number){
    return this.http.get<UserPut>(this.urlPath + `/${id}`).pipe(catchError(err=>{
      console.log(err);
      throw err
    }))
  }


  modificaUtente(data:UserPut , id:number){
    return this.http.put<UserPut>(this.urlPath + `/${id}`, data).pipe(catchError(err=>{
      console.log(err);
      throw err
    }))
  }

  eliminaUtente(id: number) {
    return this.http.delete(this.urlPath + `/${id}`)
  }
  
}
