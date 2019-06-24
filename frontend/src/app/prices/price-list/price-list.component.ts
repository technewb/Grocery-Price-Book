import { Component, OnInit } from '@angular/core';
import { Price } from '../price';
import { GenericService } from 'src/app/generic.service';
import { Store } from 'src/app/stores/store';
import { Unit } from 'src/app/units/unit';
import { Food } from 'src/app/food/food';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {

  // Hold data grabbed from Price api
  private prices: Price[];
  private stores: Store[];
  private units: Unit[];
  private food: Food[];

  // Arrays
  private availableFood = [];

  // Endpoints
  protected priceEndpoint = 'prices';
  protected storeEndpoint = 'stores';
  protected unitEndpoint = 'units';
  protected foodEndpoint = 'food';

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
      .subscribe(prices => {
        this.prices = prices
        
        prices.forEach(p => {
          if(!this.availableFood.find(f => p.food === f.id)) {
            let index = this.availableFood.push({'id': p.food})
            console.log(index);
          }
        })

        console.log(this.availableFood);

        this.getData();
      });
  }

  getData() {
    this.genericService.getAll<Store>(this.storeEndpoint)
      .subscribe(stores => this.stores = stores);

    this.genericService.getAll<Unit>(this.unitEndpoint)
      .subscribe(units => this.units = units);

    this.genericService.getAll<Food>(this.foodEndpoint)
      .subscribe(food => {
        this.food = food

        food.forEach(f => {
          if(this.availableFood.find(a => a.id === f.id)) {
            let index = this.availableFood.findIndex(a => a.id === f.id);
            this.availableFood[index].name = f.name;
          }
        })
      
      console.log(this.availableFood);
      });
  }

  

  add(date: Date, food: number, store: number, amount: number, 
    unit: number, price: number, on_sale: boolean, expiration_date: Date): void {
      if(!price) { return; }
      // Check if expiration date has been entered, if not then do not pass empty date otherwise it will fail to add to backend
      if(!expiration_date) {
        this.genericService.add<Price>({ store, food, price, on_sale, date, unit, amount } as Price, this.priceEndpoint)
          .subscribe(price => {
            this.prices.push(price)
          }
        );
      } else {
          this.genericService.add<Price>({ store, food, price, on_sale, date, expiration_date, unit, amount } as Price, this.priceEndpoint)
            .subscribe(unit => {
              this.prices.push(unit)
          }
        );
      }
    }

}
