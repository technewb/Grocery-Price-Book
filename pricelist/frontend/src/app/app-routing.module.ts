import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { CategoryListComponent } from "./category-list/category-list.component";

const routes: Routes = [
    { path: '', redirectTo: 'categories', pathMatch: 'full' },
    {
        path: 'categories',
        component: CategoryListComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }