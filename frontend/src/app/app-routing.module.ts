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
    // Redirects on load
    { 
        path: '', 
        redirectTo: '', 
        pathMatch: 'full' 
    },
    // Other links and paths
    {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then(mod => mod.CategoriesModule)
    },
    {
        path: 'food',
        loadChildren: () => import('./food/food.module').then(mod => mod.FoodModule)
    },
];

@NgModule({
    // Import created module with routes directions
    imports: [RouterModule.forRoot(routes)],
    // Export the module for use
    exports: [RouterModule]
})
export class AppRoutingModule { }