import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../category';
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

// Grab and return Category API data from Django server
export class CategoryService {

  API_URL ='http://localhost:8000/api/categories';

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.API_URL)
    .pipe(
      tap(_ => console.log('fetched categories')),
      catchError(this.handleError<Category[]>('getCategories', []))
    );
  }

  getCategory(id: number): Observable<Category> {
    const url = `${this.API_URL}/${id}/`;
    return this.httpClient.get<Category>(url).pipe(
      tap(_ => console.log(`fetched category id=${id}`)),
      catchError(this.handleError<Category>('getCategory id=${id}'))
    );
  }

  /** PUT: update the category on the server */
  updateCategory (category: Category, id: number): Observable<any> {
    return this.httpClient.put(`${this.API_URL}/${id}/`, category, httpOptions).pipe(
      tap(_ => console.log(`updated category id=${category.id}`)),
      catchError(this.handleError<any>('updateCategory'))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
