import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricesRoutingModule } from './prices-routing.module';
import { PriceListComponent } from './price-list/price-list.component';
import { PriceDetailsComponent } from './price-details/price-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PriceListComponent, PriceDetailsComponent],
  imports: [
    CommonModule,
    PricesRoutingModule,
    FormsModule
  ]
})
export class PricesModule { }
