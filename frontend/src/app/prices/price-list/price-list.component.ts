import { Component, OnInit } from '@angular/core';
import { Price } from '../price';
import { GenericService } from 'src/app/generic.service';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {

  // Hold data grabbed from Price api
  private prices: Price[];

  // Endpoints
  protected priceEndpoint = 'prices';

  /**
   * Dependency injection for Price Service
   */
  constructor(private genericService: GenericService) { }

  ngOnInit() {
    this.getPrices();
  }

  /**
   * Grabs data from api and puts it into prices
   */
  getPrices() {
    this.genericService.getAll<Price>(this.priceEndpoint)
      .subscribe(prices => this.prices = prices);
  }

}
