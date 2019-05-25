import { Component, OnInit } from '@angular/core';
import { GenericService } from "../generic.service";
import { Category } from "../models";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  // Hold data grabbed from Category API
  private categories: Category[];

  // Endpoints
  protected catEndpoint = 'categories';

  /** 
  * Dependency injection for Category Service 
  */
  constructor(private genericService: GenericService) { }

  ngOnInit() {
    // Run get categories on component load
    this.getCategories();
  }

  /**
   * Grabs data from api and puts it into categories
   */
  getCategories() {
    this.genericService.getAll<Category>(this.catEndpoint)
      .subscribe(categories => this.categories = categories);
  }

  /** Submits category to be added to server and updates list on page */
  add(name: string): void {
    name = name.trim();
      if (!name) { return; }
      this.genericService.add({ name } as Category, this.catEndpoint)
        .subscribe(category => {
          this.categories.push(category);
        });
  }


    /** Deleted category from server and filters it out from list on page */
    delete(category: Category): void {
      this.categories = this.categories.filter(c => c !== category);
      this.genericService.delete(category, this.catEndpoint).subscribe();
    }

}
