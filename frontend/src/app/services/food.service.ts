import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Food } from '../food';
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

// Grab and return Food API data from Django server
export class FoodService {

  API_URL ='http://localhost:8000/api/food';

  constructor(private httpClient: HttpClient) { }

  /** GET: Return all items in Food */
  getAllFood(): Observable<Food[]> {
    return this.httpClient.get<Food[]>(this.API_URL)
    .pipe(
      tap(_ => console.log('fetched food')),
      catchError(this.handleError<Food[]>('getAllFood', []))
    );
  }

  /** GET: Return a specific Food via @param id */
  getFood(id: number): Observable<Food> {
    const url = `${this.API_URL}/${id}/`;
    return this.httpClient.get<Food>(url).pipe(
      tap(_ => console.log(`fetched food id=${id}`)),
      catchError(this.handleError<Food>('getFood id=${id}'))
    );
  }

  /** PUT: update the Food on the server */
  updateFood (food: Food, id: number): Observable<any> {
    return this.httpClient.put(`${this.API_URL}/${id}/`, Food, httpOptions).pipe(
      tap(_ => console.log(`updated food id=${food.id}`)),
      catchError(this.handleError<any>('updateFood'))
    );
  }

  /** POST: add a new Food to the server */
  addFood (food: Food): Observable<Food> {
    return this.httpClient.post<Food>(`${this.API_URL}/`, food, httpOptions).pipe(
      tap((newFood: Food) => console.log(`added food w/ id=${newFood.id}`)),
      catchError(this.handleError<Food>('addFood'))
    );
  }

  /** DELETE: delete the Food from the server */
  deleteFood (food: Food | number): Observable<Food> {
    const id = typeof food === 'number' ? Food : food.id;
    const url = `${this.API_URL}/${id}/`;

    return this.httpClient.delete<Food>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted food id=${id}`)),
      catchError(this.handleError<Food>('deleteFood'))
    );
  }

  /** GET food whose name contains search term */
  searchFood(term: string): Observable<Food[]> {
    if (!term.trim()) {
      // If no search term, return empty Food array
      return of([]);
    }

    return this.httpClient.get<Food[]>(`${this.API_URL}/?name=${term}`).pipe(
      tap(_ => console.log(`found food matching "${term}`)),
      catchError(this.handleError<Food[]>('searchFood', []))
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
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
