import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getTopRatedMovies(): Observable<any>{
    return this.http.get(''); 

  }

  getMovieDetails(){


  }


}
