import { Component, OnInit, Input } from '@angular/core';
import { Food, Category } from '../models';
import { ActivatedRoute } from '@angular/router';
import { GenericService } from '../generic.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {

  // TODO
  @Input() food: Food;
  private categories: Category[];

  // Endpoints
  protected foodEndpoint = 'food';
  protected catEndPoint = 'categories';

  constructor(
    private route: ActivatedRoute,
    private genericService: GenericService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.genericService.getById<Food>(this.foodEndpoint, id)
      .subscribe(food => this.food = food);

    this.getAllCategories();
  }

  getAllCategories() {
    this.genericService.getAll<Category>(this.catEndPoint)
      .subscribe(categories => this.categories = categories);
  }

  save(): void {
    this.genericService.updateById(this.food, this.foodEndpoint, this.food.id)
      .subscribe();
  }

  goBack(): void {
    this.location.back();
  }

}
