import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
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
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.categoryService.getCategory(id)
      .subscribe(category => this.category = category);
  }
  
  /** updates category item information */
  save(): void {
    this.categoryService.updateCategory(this.category, this.category.id)
      .subscribe();
  }

  /** Go back to previous location */
  goBack(): void {
    this.location.back();
  }


}
