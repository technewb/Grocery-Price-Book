import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

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
    {
        path: 'stores',
        loadChildren: () => import('./stores/stores.module').then(mod => mod.StoresModule)
    },
];

@NgModule({
    // Import created module with routes directions
    imports: [RouterModule.forRoot(routes)],
    // Export the module for use
    exports: [RouterModule]
})
export class AppRoutingModule { }