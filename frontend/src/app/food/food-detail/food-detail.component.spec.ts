import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDetailComponent } from './food-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('FoodDetailComponent', () => {
  let component: FoodDetailComponent;
  let fixture: ComponentFixture<FoodDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodDetailComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
