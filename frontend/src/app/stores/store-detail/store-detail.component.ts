import { Component, OnInit, Input } from '@angular/core';
import { Store } from '../store';
import { ActivatedRoute } from '@angular/router';
import { GenericService } from '../../generic.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.css']
})
export class StoreDetailComponent implements OnInit {

  @Input() store: Store;

  // Endpoints
  protected storeEndpoint = 'stores';

  constructor(
    private route: ActivatedRoute,
    private genericService: GenericService,
    private location: Location
  ) { }

  ngOnInit(): void {
    // Gets id from route parameter
    const id = +this.route.snapshot.paramMap.get('id');

    // Gets information and populates component via the id from route
    this.genericService.getById<Store>(this.storeEndpoint, id)
      .subscribe(store => this.store = store);
  }

  save(): void {
    this.genericService.updateById(this.store, this.storeEndpoint, this.store.id)
      .subscribe();
  }

  /** Go back to previous location */
  goBack(): void {
    this.location.back();
  }
}
