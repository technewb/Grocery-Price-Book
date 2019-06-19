import { Component, OnInit, Input } from '@angular/core';
import { Price } from '../price';
import { ActivatedRoute } from '@angular/router';
import { GenericService } from 'src/app/generic.service';
import { Location } from '@angular/common';
import { Store } from 'src/app/stores/store';
import { Unit } from 'src/app/units/unit';
import { Food } from 'src/app/food/food';

@Component({
  selector: 'app-price-details',
  templateUrl: './price-details.component.html',
  styleUrls: ['./price-details.component.css']
})
export class PriceDetailsComponent implements OnInit {

  @Input() price: Price;
  private stores: Store[];
  private units: Unit[];
  private food: Food[];

  // Endpoints
  protected priceEndpoint = 'prices';
  protected storeEndpoint = 'stores';
  protected unitEndpoint = 'units';
  protected foodEndpoint = 'food';

  constructor(
    private route: ActivatedRoute,
    private genericService: GenericService,
    private location: Location
  ) { }

  ngOnInit() {
    // Gets id from route parameter
    const id =+this.route.snapshot.paramMap.get('id');

    // Gets information and populates component via the id from route
    this.genericService.getById<Price>(this.priceEndpoint, id)
      .subscribe(price => this.price = price);
    
    this.getData();
  }

  // Go back to previous location
  goBack(): void {
    this.location.back();
  }

  getData() {
    this.genericService.getAll<Store>(this.storeEndpoint)
      .subscribe(stores => this.stores = stores);

    this.genericService.getAll<Unit>(this.unitEndpoint)
      .subscribe(units => this.units = units);

    this.genericService.getAll<Food>(this.foodEndpoint)
      .subscribe(food => this.food = food);
  }

  save(): void {
    this.genericService.updateById(this.price, this.priceEndpoint, this.price.id)
      .subscribe();
  }

}
