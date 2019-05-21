import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { CategoryListComponent } from "./category-list/category-list.component";
import { CategoryDetailComponent } from "./category-detail/category-detail.component";

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
];

@NgModule({
    // Import created module with routes directions
    imports: [RouterModule.forRoot(routes)],
    // Export the module for use
    exports: [RouterModule]
})
export class AppRoutingModule { }