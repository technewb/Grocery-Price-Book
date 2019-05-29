import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategorySearchComponent } from './category-search/category-search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoryListComponent, CategoryDetailComponent, CategorySearchComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule
  ]
})
export class CategoriesModule { }
