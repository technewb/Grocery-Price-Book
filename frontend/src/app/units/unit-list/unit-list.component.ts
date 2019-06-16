import { Component, OnInit } from '@angular/core';
import { Unit } from '../unit';
import { GenericService } from 'src/app/generic.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit {

  // Holde data grabbed from Unit API
  private units: Unit[];

  // Endpoints
  protected unitEndpoint = 'units';

  /**
   * Dependency injection for Unit Service
   */
  constructor(private genericService: GenericService) { }

  ngOnInit() {
    this.getUnits();
  }

  /**
   * Grabs data from api and puts it into units
   */
  getUnits() {
    this.genericService.getAll<Unit>(this.unitEndpoint)
      .subscribe(units => this.units = units);
  }

  /** Submits unit to be added to server and updates list on page */
  add(name: string): void {
    name = name.trim();

    if(!name) { return; }
    this.genericService.add<Unit>({ name } as Unit, this.unitEndpoint)
      .subscribe(unit => {
        this.units.push(unit)
      });
  }

  /** Deleted unit from server and filters it out from list on page */
  delete(unit: Unit): void {
    this.units = this.units.filter(u => u !== unit);
    this.genericService.delete<Unit>(unit, this.unitEndpoint).subscribe();
  }

}
