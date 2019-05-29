import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import { Category } from "../../models";
import { GenericService } from "../../generic.service";

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.css']
})
export class CategorySearchComponent implements OnInit {

  // $ indicates variable is Observable
  categories$: Observable<Category[]>;

  // Hold all the search terms
  private searchTerms = new Subject<string>();

  // Endpoints
  protected catEndpoint = 'categories';

  constructor(private genericService: GenericService) { }

  // Push search term into obserable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.categories$ = <Observable<Category[]>>this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering next term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time term changes
      switchMap((term: string) => this.genericService.search(term, this.catEndpoint)),
    );
  }

}
