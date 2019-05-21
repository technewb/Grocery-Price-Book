import { Component, OnInit } from '@angular/core';
import { FoodService } from "../services/food.service";
import { Food } from "../food";

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  // Hold food data grabbed from Food API
  private food: Food[];

  /** Dependency injects for Food Service */
  constructor(private foodService: FoodService) { }

  ngOnInit() {
    // Run get all food on component load
    this.getAllFood();
  }

  /** Grabs data from api and puts it into food */
  getAllFood() {
    this.foodService.getAllFood()
      .subscribe(food => this.food = food)
  }

}
