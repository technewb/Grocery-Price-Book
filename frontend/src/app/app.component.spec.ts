import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from "@angular/router/testing";
import { Category } from './categories/category';
import { Food } from './food/food';
import { Store } from './stores/store';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Grocery Price Book'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Grocery Price Book');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Grocery Price Book');
  });

});

describe('Model Classes', () => {
  let categoryObj: Category;
  let foodObj: Food;
  let storeObj: Store;

  it('should create new Category object', () => {
    categoryObj = new Category({id: 1, name: 'Produce'});
    expect(categoryObj.id).toBe(1);
    expect(categoryObj.name).toBe('Produce');
  });

  it('should create new Food object', () => {
    foodObj = new Food({id: 7, name: 'Frozen Pizza', category_id: 3});
    expect(foodObj.id).toBe(7);
    expect(foodObj.name).toBe('Frozen Pizza');
    expect(foodObj.category_id).toBe(3);
  });

  it('should create new Store object', () => {
    storeObj = new Store({id: 3, name: 'Kroger', location: 'Houston, TX #3102'});
    expect(storeObj.id).toBe(3);
    expect(storeObj.name).toBe('Kroger');
    expect(storeObj.location).toBe('Houston, TX #3102');
  })

})
