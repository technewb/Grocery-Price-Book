import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitsRoutingModule } from './units-routing.module';
import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitDetailsComponent } from './unit-details/unit-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UnitListComponent, UnitDetailsComponent],
  imports: [
    CommonModule,
    UnitsRoutingModule,
    FormsModule
  ]
})
export class UnitsModule { }
