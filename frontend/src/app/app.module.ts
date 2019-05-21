import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryListComponent } from './category-list/category-list.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategorySearchComponent } from './category-search/category-search.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    CategoryDetailComponent,
    CategorySearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
