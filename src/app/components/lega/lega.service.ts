import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Numbers } from 'src/app/interface/numbers';
import { Lega,LegaTeam, Partecipanti } from './lega';

@Injectable({
  providedIn: 'root'
})
export class LegaService {

  urlNumbers = 'http://localhost:4201/numbers'
  urlNegative = 'http://localhost:4201/negativeNumbr'

  urlLega = 'http://localhost:4201/leghe'
  urlTeam = 'http://localhost:4201/squadre'


  constructor(private http: HttpClient) { }

  // 1' FORM
  submit(data: Lega) {
    return this.http.post<Lega>(this.urlLega, data).pipe(catchError(err => {
      console.log(err);
      throw err
    }), tap((res => {
      localStorage.setItem('lega', JSON.stringify(res))
    })))
  }

  // 2' FORM
  invio(data: LegaTeam) {
    return this.http.post<LegaTeam>(this.urlTeam, data).pipe(catchError(err => {
      console.log(err);
      throw err
    }), tap((res => {
      localStorage.setItem('team', JSON.stringify(res))
    })))
  }

  newPartecipanti(data:Partecipanti){
    return this.http.post<Partecipanti>(this.urlTeam, data).pipe(catchError(err=>{
      console.log(err);
      throw err
    }), tap((res => {
      localStorage.setItem('team', JSON.stringify(res))
    })))
  }

  fetchLeghe(){
    return this.http.get<Lega[]>(this.urlLega).pipe(catchError(err=>{
      console.log(err);
      throw err
    }))
  }

  fetchNumbers() {
    return this.http.get<Numbers[]>(this.urlNumbers).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }
  fetchNegative() {
    return this.http.get<Numbers[]>(this.urlNegative).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

}
