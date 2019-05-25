import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

/**
 * Service to access API data from server host via CRUD
 * Includes @function getAll @function getById , @function updateById
 * @function add @function delete @function search
 */
export class GenericService{

  url: string = 'http://localhost:8000/api';

  constructor(
    private httpClient: HttpClient
  ) { }

  /** GET: Return all items */
  getAll<T>(endpoint: string): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.url}/${endpoint}`)
    .pipe(
      tap(_ => console.log(`fetched ${endpoint}`)),
      catchError(this.handleError<T[]>(`getAll`, []))
    );;
  }

  /** GET: Return a specific item
   * @param id */
  getById<T>(endpoint: string, id: number): Observable<T> {
    const url = `${this.url}/${endpoint}/${id}/`;
    return this.httpClient.get<T>(url).pipe(
      tap(_ => console.log(`fetched ${endpoint} id=${id}`)),
      catchError(this.handleError<T>(`getbyId id=${id}`))
    );
  }

  /** PUT: update the item on the server
   * @param id */
  updateById<T>(model: T, endpoint: string, id: number): Observable<T> {
    return this.httpClient.put(`${this.url}/${endpoint}/${id}/`, model, httpOptions).pipe(
      tap(_ => console.log(`updated ${endpoint} id=${id}`)),
      catchError(this.handleError<any>('updateById'))
    );
  }

  /** POST: add a new item to the server */
  add<T>(model: T, endpoint: string): Observable<T> {
    return this.httpClient.post<T>(`${this.url}/${endpoint}/`, model, httpOptions).pipe(
      tap((newItem: T) => console.log(`added to ${endpoint} w/ id=${newItem['id']}`)),
      catchError(this.handleError<T>('add'))
    );
  }

  /** DELETE: delete the item from the server */
  delete<T>(model: T | number, endpoint: string): Observable<T> {
    const id = typeof model === 'number' ? model : model['id'];

    return this.httpClient.delete<T>(`${this.url}/${endpoint}/${id}/`, httpOptions).pipe(
      tap(_ => console.log(`deleted ${endpoint} id=${id}`)),
      catchError(this.handleError<T>('delete'))
    );
  }

  /** GET item whose name contains search term */
  search<T>(term: string, endpoint: string): Observable<T[]> {
    if (!term.trim()) {
      // If no search term, return empty Food array
      return of([]);
    }

    return this.httpClient.get<T[]>(`${this.url}/${endpoint}/?name=${term}`).pipe(
      tap(_ => console.log(`found ${endpoint} matching "${term}`)),
      catchError(this.handleError<T[]>('searchFood', []))
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
