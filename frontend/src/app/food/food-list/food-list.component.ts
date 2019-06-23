import { Component, OnInit } from '@angular/core';
import { GenericService } from "../../generic.service";
import { Food } from "../food";
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

  // Holds filtered data of categories using data from foodCategories
  private filteredCategories: Category[];

  // Hold array of category ids and count numbers of food within the categories
  private foodCategories = [];

  // Endpoints
  protected foodEndpoint = 'food';
  protected catEndPoint = 'categories';


  /** Dependency injects for Generic Service */
  constructor(private genericService: GenericService) { }

  ngOnInit() {
    // Run get all food & categories
    this.getFood();
  }


  getFood() {
    // Get food data via service
    this.genericService.getAll<Food>(this.foodEndpoint)
      .subscribe(foodData => {
        // Assign food all food data
        this.food = foodData;

        // Loop thru each food item and push category id to foodCategories with count array if not there already
        // If data already exists, then increase count number
        foodData.forEach(food => {
          if(!this.foodCategories.find(f => f.id === food.category_id)) {
            this.foodCategories.push({'id': food.category_id, 'count': 1})
          } else {
            let index = this.foodCategories.findIndex(f => f.id === food.category_id);
            this.foodCategories[index].count += 1;
          }
        });
        
        // Run after getFood finishes in order to utilize data from food
        this.getCategories()
    });
  }

  getCategories() {
    // Get category data via service
    this.genericService.getAll<Category>(this.catEndPoint)
      .subscribe(catData => {
        // Assigned all category list data
        this.categories = catData;

        // Filter out any categories not in the usedCategories list and assign remaining to categoriesUsing
        this.filteredCategories = catData.filter(c => this.foodCategories.find(f => f.id === c.id));
    });
  }

  // Add new food item to database
  add(name: string, category_id: number): void {
    // Remove white space around name
    name = name.trim();

    // Do nothing if no name is entered
    if (!name) { return; }

    // If name entered, add as Food object to food api
    this.genericService.add({ name , category_id } as Food, this.foodEndpoint)
      .subscribe(f => {
        // Check if category id is already available on paid via foodCategories
        let foodCatIndex = this.foodCategories.findIndex(c => f.category_id === c.id);

        // If category id doesn't exist, add it to foodCategories array
        if (foodCatIndex < 0) {
          this.foodCategories.push({'id': f.category_id, 'count': 1});
        } else {
          // Otherwise, updated existing category count
          this.foodCategories[foodCatIndex].count += 1;
        }

        // Update filteredCategories to updated array of foodCategories
        this.filteredCategories = this.categories.filter(c => this.foodCategories.find(f => f.id === c.id));

        // Push new food to list
        this.food.push(f);

      });
  }

  /**
   * Deletes food item from api and removes from the page dynamically.
   * Also removes category object visually if there is no existing food data within
   * that category on the page
   */
  delete(food: Food): void {
    // Filters out deleted food
    this.food = this.food.filter(f => f !== food);

    // Find foodCategories index based in category id
    let foodCatIndex = this.foodCategories.findIndex(c => food.category_id === c.id);

    // Subtract by one food category count on delete
    this.foodCategories[foodCatIndex].count -= 1;

    // Check if foodCategory count is less than 1
    if(this.foodCategories[foodCatIndex].count < 1) {
      // Find index of category object with less than count less than 1
      let filteredCatIndex = this.filteredCategories.findIndex(c => this.foodCategories[foodCatIndex].id === c.id);

      // Remove data related to category from foodCategory data array and filteredCategory object array
      this.foodCategories.splice(foodCatIndex, 1);
      this.filteredCategories.splice(filteredCatIndex, 1);
    }

    // Remove food from api
    this.genericService.delete(food, this.foodEndpoint).subscribe();
    
  }

}
