import { Component, OnInit } from '@angular/core';
import { Store } from '../store';
import { GenericService } from 'src/app/generic.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {

  // Hold data grabbed from Store API
  private stores: Store[];

  // Endpoints
  protected storeEndpoint = 'stores';

  /**
   * Dependency injection for Store Service
   */
  constructor(private genericService: GenericService) { }

  ngOnInit() {
    this.getStores();
  }

  /**
   * Grabs data from api and puts it into stores
   */
  getStores() {
    this.genericService.getAll<Store>(this.storeEndpoint)
      .subscribe(stores => this.stores = stores);
  }

  /** Submits store to be added to server and updates list on page */
  add(name: string, location: string): void {
    name = name.trim();
    location = location.trim();

    if(!name && !location) { return; }
    this.genericService.add<Store>({ name, location} as Store, this.storeEndpoint)
      .subscribe(store => {
        this.stores.push(store);
      })
  }

  /** Deleted store from server and filters it out from list on page */
  delete(store: Store): void {
    this.stores = this.stores.filter(s => s !== store);
    this.genericService.delete<Store>(store, this.storeEndpoint).subscribe();
  }

}
