import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreDetailComponent } from './store-detail/store-detail.component';

const routes: Routes = [
  {
    // Main page goes to category list
    path: '',
    component: StoreListComponent
  },
  {
    // Main page goes to category list
    path: ':id',
    component: StoreDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoresRoutingModule { }
