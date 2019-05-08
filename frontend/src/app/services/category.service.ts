import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// Grab and return Category API data from Django server
export class CategoryService {

  API_URL ='http://localhost:8000/api';

  constructor(private httpClient: HttpClient) { }

  getFirstPage() {
    return this.httpClient.get(`${this.API_URL}/categories/`);
  }
}
