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
   * Grabs data from api and puts it into dataSource
   */
  getCategories() {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  selectedCategory: Category;
  onSelect(category: Category): void {
    console.log(category);
    this.selectedCategory = category;
  }

  add(name: string): void {
    name = name.trim();
      if (!name) { return; }
      this.categoryService.addCategory({ name } as Category)
        .subscribe(category => {
          console.log(category);
          this.categories.push(category);
        });
    }

}
