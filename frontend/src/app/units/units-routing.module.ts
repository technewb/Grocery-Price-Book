import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnitListComponent } from './unit-list/unit-list.component';

const routes: Routes = [
  {
    // Main pages goes to unit list
    path: '',
    component: UnitListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitsRoutingModule { }
