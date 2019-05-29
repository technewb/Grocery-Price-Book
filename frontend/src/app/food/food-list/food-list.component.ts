import { Component, OnInit } from '@angular/core';
import { GenericService } from "../../generic.service";
import { Food } from "../../models";
import { Category } from "../../categories/category";

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  
  // Hold data grabbed from Food & Category API to objects
  private food: Food[];
  private categories: Category[];

  // Holds data of categories that have food connected to it
  private categoriesUsing: Category[];

  // Endpoints
  protected foodEndpoint = 'food';
  protected catEndPoint = 'categories';


  /** Dependency injects for Generic Service */
  constructor(private genericService: GenericService) { }

  ngOnInit() {
    // Run get all food & categories
    this.getData();
  }

  /** Grabs data from api */
  getData() {

    // Hold array of category ids that have food connected to it
    let usedCategories = [];

    // Get food data via service
    this.genericService.getAll<Food>(this.foodEndpoint)
      .subscribe(foodData => {
        // Assign food all food data
        this.food = foodData;

        // Loop thru each food item and push category id to usedCategories array if not there already
        foodData.forEach(food => {
          if(!usedCategories.includes(food.category_id)) {
            usedCategories.push(food.category_id)
          }
        });
    });
    
    // Get category data via service
    this.genericService.getAll<Category>(this.catEndPoint)
      .subscribe(catData => {
        // Assigned all category list data
        this.categories = catData;

        // Filter out any categories not in the usedCategories list and assign remaining to categoriesUsing
        this.categoriesUsing = catData.filter(c =>  usedCategories.includes(c.id));
    });
  }

  // Add new food item to database
  add(name: string, category_id: number): void {
    name = name.trim();
    if (!name) { return; }
    this.genericService.add({ name , category_id } as Food, this.foodEndpoint)
      .subscribe(f => {
        this.food.push(f)
      });
  }

  // Delete food item from database and filters it out of food variable on page
  delete(food: Food): void {
    this.food = this.food.filter(f => f !== food);
    this.genericService.delete(food, this.foodEndpoint).subscribe();
  }

}
