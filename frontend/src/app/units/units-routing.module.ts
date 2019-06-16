import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitDetailsComponent } from './unit-details/unit-details.component';

const routes: Routes = [
  {
    // Main pages goes to unit list
    path: '',
    component: UnitListComponent
  },
  {
    // Goes to specific unit detail page by id
    path: ':id',
    component: UnitDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitsRoutingModule { }
