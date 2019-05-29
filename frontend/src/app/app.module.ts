import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";
import { CategoryDetailComponent } from './categories/category-detail/category-detail.component';
import { CategorySearchComponent } from './categories/category-search/category-search.component';
import { FoodListComponent } from "./food/food-list/food-list.component";
import { FoodDetailComponent } from './food/food-detail/food-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    CategoryDetailComponent,
    CategorySearchComponent,
    FoodListComponent,
    FoodDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
