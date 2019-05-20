import { Component, OnInit, Input } from '@angular/core';
import { Location } from "@angular/common";

import { Category } from "../category";
import { CategoryService } from "../services/category.service";

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  @Input() category: Category;

  constructor(
    private categoryService: CategoryService,
    private location: Location
  ) {}

  ngOnInit() {
  }
  
  save(): void {
    this.categoryService.updateCategory(this.category, this.category.id)
      .subscribe();
  }


}
