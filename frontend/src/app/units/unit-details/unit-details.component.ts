import { Component, OnInit, Input } from '@angular/core';
import { Unit } from '../unit';
import { ActivatedRoute } from '@angular/router';
import { GenericService } from '../../generic.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-unit-details',
  templateUrl: './unit-details.component.html',
  styleUrls: ['./unit-details.component.css']
})
export class UnitDetailsComponent implements OnInit {

  @Input() unit: Unit;

  // Endpoints
  protected unitEndpoint = 'units';

  constructor(
    private route: ActivatedRoute,
    private genericService: GenericService,
    private location: Location
  ) { }

  ngOnInit(): void {
    // Gets id from route parameter
    const id = +this.route.snapshot.paramMap.get('id');

    // Gets info and populates component via id from route
    this.genericService.getById<Unit>(this.unitEndpoint, id)
      .subscribe(unit => this.unit = unit);
  }

  save(): void {
    this.genericService.updateById<Unit>(this.unit, this.unitEndpoint, this.unit.id)
      .subscribe();
    this.goBack();
  }

  // Go back to previous location
  goBack(): void {
    this.location.back();
  }

}
