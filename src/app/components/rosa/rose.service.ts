import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Rose, Search, SearchData, SearchPlayer } from './rose';

@Injectable({
  providedIn: 'root'
})
export class RoseService {
  serieA = [492, 489, 496, 487, 505, 497, 494, 503, 502, 500, 514, 511, 488, 515, 498, 504, 499]
  napoli = 492
  milan = 489
  juventus = 496
  lazio = 487
  inter = 505
  roma = 497
  atalanta = 499
  udinese = 494
  torino = 503
  fiorentina = 502
  bologna = 500
  salernitana = 514
  empoli = 511
  monza = 1579
  sassuolo = 488
  spezia = 515
  sampdoria = 498
  verona = 504
  cremonese = 520

  id!:number

  options = {
    headers: {
      'X-RapidAPI-Key': '0bdbd40b81mshff3b7e623d1c230p103862jsn8f8e68750807',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  }
  path = `https://api-football-v1.p.rapidapi.com/v3/players/squads?team=`
  patchSearch = `https://api-football-v1.p.rapidapi.com/v3/players?league=135&season=2022&search=`

  pathId = `https://api-football-v1.p.rapidapi.com/v3/players?id=`


  constructor(private http: HttpClient) { }


  fetchById(id:number){
    return this.http.get<SearchData>(this.pathId + id + `&season=2022`, this.options).pipe(catchError(err=>{
      console.log(err);
      throw err
    }))
  }


  fetchSearch(search:string){
    return this.http.get<SearchData>(this.patchSearch + search, this.options )
  }

  

  playerNapoli() {
    return this.http.get<Rose>(this.path + `${this.napoli}`, this.options).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

  playerRoma() {
    return this.http.get<Rose>(this.path + `${this.roma}`, this.options).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

  playerMilan(){
    return this.http.get<Rose>(this.path + `${this.milan}`, this.options).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

  playerJuventus(){
    return this.http.get<Rose>(this.path + `${this.juventus}`, this.options).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

  playerLazio(){
    return this.http.get<Rose>(this.path + `${this.lazio}`, this.options).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

  playerInter(){
    return this.http.get<Rose>(this.path + `${this.inter}`, this.options).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }


  playerAtalanta(){
    return this.http.get<Rose>(this.path + `${this.atalanta}`, this.options).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

  playerUdinese(){
    return this.http.get<Rose>(this.path + `${this.udinese}`, this.options).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

  playerTorino(){
    return this.http.get<Rose>(this.path + `${this.torino}`, this.options).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

  playerFiorentina(){
    return this.http.get<Rose>(this.path + `${this.fiorentina}`, this.options).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

  playerBologna(){
    return this.http.get<Rose>(this.path + `${this.bologna}`, this.options).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

  playerSalernitana(){
    return this.http.get<Rose>(this.path + `${this.salernitana}`, this.options).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

  playerEmpoli(){
    return this.http.get<Rose>(this.path + `${this.empoli}`, this.options).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

  playerMonza(){
    return this.http.get<Rose>(this.path + `${this.monza}`, this.options).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

  playerSassuolo(){
    return this.http.get<Rose>(this.path + `${this.sassuolo}`, this.options).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

  playerSpezia(){
    return this.http.get<Rose>(this.path + `${this.spezia}`, this.options).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

  playerCremonese(){
    return this.http.get<Rose>(this.path + `${this.cremonese}`, this.options).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

  playerSampdoria(){
    return this.http.get<Rose>(this.path + `${this.sampdoria}`, this.options).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

  playerVerona(){
    return this.http.get<Rose>(this.path + `${this.verona}`, this.options).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

}

