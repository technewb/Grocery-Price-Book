import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreListComponent } from './store-list/store-list.component';
import { StoresRoutingModule } from './stores-routing.module';
import { StoreDetailComponent } from './store-detail/store-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [StoreListComponent, StoreDetailComponent],
  imports: [
    CommonModule,
    StoresRoutingModule,
    FormsModule
  ]
})
export class StoresModule { }
