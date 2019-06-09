import { TestBed, inject } from '@angular/core/testing';

import { GenericService } from './generic.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Category } from './categories/category';

describe('GenericService', () => {
  let service: GenericService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GenericService]
    })
    .compileComponents();

    service = TestBed.get(GenericService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: GenericService = TestBed.get(GenericService);
    expect(service).toBeTruthy();
  });

  it('#getAll<T> should return list of objects', () => {
    let catData: Category[] = [{id: 1, name: 'Produce'},
      {id: 5,name: 'Snacks'}]

    service.getAll<Category>('categories').subscribe((data: any) => {
      expect(data).toBe(catData)
      console.log(data);
    })

    const req = httpMock.expectOne('http://localhost:8000/api/categories', 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush(catData);

    httpMock.verify();
  });

  it('#getById<T> should return single object', () => {
    let catData: Category = {id: 1, name: 'Produce'}

    service.getById<Category>('categories', 1).subscribe((data: any) => {
      expect(data.id).toBe(1);
      expect(data.name).toBe('Produce');
      console.log(data);
    })

    const req = httpMock.expectOne('http://localhost:8000/api/categories/1/', 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush(catData);

    httpMock.verify();
  });

  it('#updateById<T> should update a single object', () => {
    let catData: Category = {id: 1, name: 'Fruits & Vegetables'};

    service.updateById<Category>(catData, 'categories', 1).subscribe((data: any) => {
      expect(data.id).toBe(1);
      expect(data.name).toBe('Fruits & Vegetables');
      console.log(data);
    })

    const req = httpMock.expectOne('http://localhost:8000/api/categories/1/', 'call to api');
    expect(req.request.method).toBe('PUT');

    req.flush(catData);

    httpMock.verify();
  });

  it('#add<T> should add a object', () => {
    let catData = {name: 'Frozen Produce'};

    service.add(catData, 'categories').subscribe((data: any) => {
      expect(data.name).toBe('Frozen Produce');
      console.log(data);
    })

    const req = httpMock.expectOne('http://localhost:8000/api/categories/', 'call to api');
    expect(req.request.method).toBe('POST');

    req.flush(catData);

    httpMock.verify();

  });

  it('#delete<T> should add a object', () => {
    let catData: Category = {id: 7, name: 'Frozen Produce'};

    service.delete<Category>(catData, 'categories').subscribe((data: any) => {
      expect(data.name).toBe('Frozen Produce');
      console.log(data);
    })

    const req = httpMock.expectOne('http://localhost:8000/api/categories/7/', 'call to api');
    expect(req.request.method).toBe('DELETE');

    req.flush(catData);

    httpMock.verify();

  });

  it('#search<T> with search term "duce" should return a list of objects', () => {
    let catData: Category[] = [{id: 7, name: 'Frozen Produce'},
    {id: 1, name: 'Produce'}];

    let searchTerm = 'duce';

    service.search(searchTerm, 'categories').subscribe((data: any) => {
      expect(searchTerm).toBe('duce');
      console.log(data);
    })

    const req = httpMock.expectOne(`http://localhost:8000/api/categories/?name=${searchTerm}`, 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush(catData);

    httpMock.verify();

  });

  it('#search<T> with no search term should return empty array', () => {
    let catData: Category[] = [];

    let searchTerm = '';

    service.search(searchTerm, 'categories').subscribe((data: any) => {
      expect(searchTerm).toBe('');
      expect(data).toEqual([]);
      console.log(data);
    })

  });

    it('#search<Category> should add a object', () => {
    let catData: Category[] = [{id: 7, name: 'Frozen Produce'},
    {id: 1, name: 'Produce'}];

    let searchTerm = 'duce';

    service.search(searchTerm, 'categories').subscribe((data: any) => {
      expect(searchTerm).toBe('duce');
      console.log(data);
    })

    const req = httpMock.expectOne(`http://localhost:8000/api/categories/?name=${searchTerm}`, 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush(catData);

    httpMock.verify();

  });

  it('#getAll<T> should return an error', () => {

    let errorEvent: ErrorEvent;

    service.getAll<Category>('categorie').subscribe();

    httpMock.expectOne('http://localhost:8000/api/categorie', 'call to api').error(errorEvent);

    httpMock.verify();
  });

})
