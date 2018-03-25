import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import {testingConfig} from "../conf.spec";
import {ProductService} from "../product.service";
import {BOOK_MOCK} from "../../utils/test-mocks";
import {Observable} from "rxjs/Observable";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let productService: ProductService;

  beforeEach(async(testingConfig));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    productService = fixture.debugElement.injector.get(ProductService);
    spyOn(productService, 'getBookFromIsbn').and.returnValue(
      Observable.of(BOOK_MOCK)
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should book be defined', () => {
    expect(component.book).toBeDefined();
  });

  it('should show bookDefined', () => {
    let el:DebugElement = fixture.debugElement.query(By.css('div'));
    expect(el.nativeElement.id).toBe('bookDetail');
  });
});
