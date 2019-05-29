import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodRoutingModule } from './food-routing.module';
import { FoodListComponent } from './food-list/food-list.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';

@NgModule({
  declarations: [FoodListComponent, FoodDetailComponent],
  imports: [
    CommonModule,
    FoodRoutingModule
  ]
})
export class FoodModule { }
