import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { CategoryListComponent } from "./categories/category-list/category-list.component";
import { CategoryDetailComponent } from "./categories/category-detail/category-detail.component";
import { FoodListComponent } from './food/food-list/food-list.component';
import { FoodDetailComponent } from './food/food-detail/food-detail.component';

/**
 * Routes to components
 */
const routes: Routes = [
    // Redirects on load to categories
    { path: '', redirectTo: 'categories', pathMatch: 'full' },
    // Other links and paths
    {
        path: 'categories',
        component: CategoryListComponent
    },
    {
        path: 'categories/:id',
        component: CategoryDetailComponent
    },
    {
        path: 'food',
        component: FoodListComponent
    },
    {
        path: 'food/:id',
        component: FoodDetailComponent
    }
];

@NgModule({
    // Import created module with routes directions
    imports: [RouterModule.forRoot(routes)],
    // Export the module for use
    exports: [RouterModule]
})
export class AppRoutingModule { }