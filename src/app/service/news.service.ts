import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { News } from '../interface/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  urlPath = 'https://63a3176d9704d18da0857d94.mockapi.io/news'
 
  dettagli!:News

  news:News[]=[]

  constructor(private http:HttpClient) { }

  fetchNews(){
    return this.http.get<News[]>(this.urlPath).pipe(catchError(err=>{
      console.log(err);
      throw err
    }))
  }


  dettaglioNews(id:number){
    return this.http.get<News>(this.urlPath + `/${id}`).pipe(catchError(err=>{
      throw err
    }))
  }

  


}
