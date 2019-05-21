import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../services/category.service";
import { Category } from "../category";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  displayedColumns: string [] = ['id', 'name'];
  // Hold data grabbed from Category API
  private categories: Category[];

  show(val) {
    return typeof val === 'number';
  }

  /** 
  * Dependency injection for Category Service 
  */
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    // Run get categories on component load
    this.getCategories();
  }

  /**
   * Grabs data from api and puts it into categories
   */
  getCategories() {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  /** Submits category to be added to server and updates list on page */
  add(name: string): void {
    name = name.trim();
      if (!name) { return; }
      this.categoryService.addCategory({ name } as Category)
        .subscribe(category => {
          this.categories.push(category);
        });
    }

    /** Deleted category from server and filters it out from list on page */
    delete(category: Category): void {
      this.categories = this.categories.filter(c => c !== category);
      this.categoryService.deleteCategory(category).subscribe();
    }

}
