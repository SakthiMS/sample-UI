import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  base_url = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

  doSearch(data){
    return this.http.get(this.base_url+'/search.php?s='+data)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  getCategories(){
    return this.http.get(this.base_url+'/categories.php')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  getItem(id){
    return this.http.get(this.base_url+'/lookup.php?i='+id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}
