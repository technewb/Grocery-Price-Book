import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../services/category.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  displayedColumns: string [] = ['id', 'name'];
  // Hold data grabbed from Category API
  dataSource = [];

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
    this.categoryService.getFirstPage().subscribe((data: Array<object>) => {
      this.dataSource = data;
    })
  }

}
