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

}
