import { Component, OnInit } from '@angular/core';
import { Price } from '../price';
import { GenericService } from 'src/app/generic.service';
import { Store } from 'src/app/stores/store';
import { Unit } from 'src/app/units/unit';
import { Food } from 'src/app/food/food';
import { unit } from "mathjs";
import { combineLatest } from "rxjs";

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
    this.getData();
  }

  /**
   * Grabs data from api all at once, bind it to object arrays, and then runs getCheapest function
   */
  getData() {
    combineLatest(
      this.genericService.getAll<Price>(this.priceEndpoint),
      this.genericService.getAll<Store>(this.storeEndpoint),
      this.genericService.getAll<Unit>(this.unitEndpoint),
      this.genericService.getAll<Food>(this.foodEndpoint))
        .subscribe(
          ([prices, stores, units, food]) => {
            this.prices = prices;
            this.stores = stores;
            this.units = units;
            this.food = food;
  
            this.getCheapest();
          }
        );
  }

  /**
   * Adds data to availableFood for binding on html page, 
   * compares prices, and will update according to cheapest item available
   */
  getCheapest() {

    // Loop through array of Price objects 
    this.prices.forEach(p => {

      // Find data for unit, food, and store connected to prices data
      let unitObj = this.units[this.units.findIndex(u => u.id === p.unit)];
      let foodObj = this.food[this.food.findIndex(f => f.id === p.food)];
      let storeObj = this.stores[this.stores.findIndex(s => s.id === p.store)];

      // Find index to see if food was already added to availabeFood array
      let index = this.availableFood.findIndex(f => p.food === f.food.id);

      // If food listing not already in availableFood array, push data to array
      if(index < 0) {
        this.availableFood.push({'price': p, 'store': storeObj, 'food': foodObj, 'unit': unitObj, 'lowest_price_per': Math.round((p.price / p.amount) * 100) / 100})
      } else {

        // If found, assign obj the location of availableFood index
        let pricePer;
        let obj = this.availableFood[index];

        // If unit measurement can be converted to unit object and compared, then assign pricePer with convertedAmount
        // If error, then assign pricePer without conversion and does not utilize unit object
        try {
          // Create math.unit object with format: number unit-of-measurement' (ex. '12 lbs')
          let currentAmountUnit = unit(`${p.amount} ${unitObj.name}`);

          // Converts the currentAmountUnit to unit of measurement of existing item in availableFood
          // Conversion will allow proper comparsion if units of measurement are different from current price and previous price objects
          // After converting, it will turn into a number instead of an math.unit object
          // (ex. '12 lbs' to 'oz') 
          let convertedAmount = currentAmountUnit.toNumber(obj.unit.name);

          // Finds price per unit of measurement of convertedAmount, which rounds to second decimal
          pricePer = Math.round((p.price / convertedAmount) * 100) / 100;
        } catch(e) {
          // TODO: Deal with units that cannot be converted
          console.log(e);
          // Finds price per amount for a unit of measurement
          pricePer = Math.round((p.price / p.amount) * 100) / 100;
        } 

        // Checks if converted (or non-converted) amount is cheaper than previous price per calculation
        // If it does, then update availableFood item with cheapest amount's information
        if(pricePer < obj.lowest_price_per) {
          obj.price = p;
          obj.unit = unitObj;
          obj.lowest_price_per = Math.round((p.price / p.amount) * 100) / 100;;
          obj.store = storeObj;
          obj.store_id = p.store
        }
      }
    })

    console.log(this.availableFood);
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
