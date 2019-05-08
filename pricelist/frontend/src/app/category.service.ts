import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CategoryService {
    
    constructor(private http: HttpClient) { }

    // Uses http.get() to load data from API endpoint
    list() {
        return this.http.get('../api/categories/')
    }

}