import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  /**
   * An array of all the Category objects from API
   */
  public categories;

  constructor(private _categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories()
  }

  getCategories() {
    this._categoryService.list().subscribe(
      // On success
      data => {
        this.categories = data;
      },
      // On error
      err => console.error(err),
      // Runs on completion
      () => console.log('done loading categories')
    );
  }

}
