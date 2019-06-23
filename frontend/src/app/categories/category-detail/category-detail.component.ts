import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Category } from "../category"
import { GenericService } from "../../generic.service";

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  @Input() category: Category;

  // Endpoints
  protected catEndpoint = 'categories';

  constructor(
    private route: ActivatedRoute,
    private genericService: GenericService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Gets id from route parameter
    const id = +this.route.snapshot.paramMap.get('id');

    // Gets information and populates component via the id from route
    this.genericService.getById<Category>(this.catEndpoint, id)
      .subscribe(category => this.category = category);
  }
  
  /** updates category item information */
  save(): void {
    this.genericService.updateById(this.category, this.catEndpoint, this.category.id)
      .subscribe();
    this.goBack();
  }

  /** Go back to previous location */
  goBack(): void {
    this.location.back();
  }


}
