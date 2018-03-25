import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogComponent } from './catalog.component';
import {testingConfig} from "../conf.spec";
import {CartService} from "../cart.service";
import {ProductService} from "../product.service";
import {BOOKS_MOCK} from "../../utils/test-mocks";
import {Observable} from "rxjs/Observable";

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let productService: ProductService;
  let cartService: CartService;

  beforeEach(async(testingConfig));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogComponent);
    productService = fixture.debugElement.injector.get(ProductService);
    cartService = fixture.debugElement.injector.get(CartService);
    spyOn(productService, 'getBooks').and.returnValue(
      Observable.of(BOOKS_MOCK)
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('catalog should be defined', () => {
    expect(component.books).toBeDefined();
  });
});
