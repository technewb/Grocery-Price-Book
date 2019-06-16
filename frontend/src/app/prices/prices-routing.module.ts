import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PriceListComponent } from './price-list/price-list.component';
import { PriceDetailsComponent } from './price-details/price-details.component';

const routes: Routes = [
  {
    path: '',
    component: PriceListComponent
  },
  {
    path: ':id',
    component: PriceDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricesRoutingModule { }
