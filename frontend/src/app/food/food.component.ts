import { Component, OnInit } from '@angular/core';
import { GenericService } from "../generic.service";
import { Food, Category } from "../models";

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  // Hold data grabbed from Food API to objects
  private food: Food[];
  private categories: Category[];

  // Endpoints
  protected foodEndpoint = 'food';
  protected catEndPoint = 'categories';


  /** Dependency injects for Generic Service */
  constructor(private genericService: GenericService) { }

  ngOnInit() {
    // Run get all food & categories
    this.getAllFood();
    this.getAllCategories();
  }

  /** Grabs data from api and puts it into food */
  getAllFood() {
    this.genericService.getAll<Food>(this.foodEndpoint)
      .subscribe(food => this.food = food);
  }

  /** Grabs data from api and puts it into categories */
  getAllCategories() {
    this.genericService.getAll<Category>(this.catEndPoint)
      .subscribe(categories => this.categories = categories);
  }

  add(name: string, category_id: number): void {
    name = name.trim();
    if (!name) { return; }
    this.genericService.add({ name , category_id } as Food, this.foodEndpoint)
      .subscribe(f => {
        this.food.push(f)
      });
  }

  delete(food: Food): void {
    this.food = this.food.filter(f => f !== food);
    this.genericService.delete(food, this.foodEndpoint).subscribe();
  }

}
