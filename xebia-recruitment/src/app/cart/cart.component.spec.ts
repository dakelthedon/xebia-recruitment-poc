import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import {testingConfig} from "../conf.spec";
import {OfferService} from "../offer.service";
import {BOOKS_MOCK, OFFER_MOCK, OFFERS_MOCK} from "../../utils/test-mocks";
import {Observable} from "rxjs/Observable";

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let offerService: OfferService;

  beforeEach(async(testingConfig));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    offerService = fixture.debugElement.injector.get(OfferService);
    spyOn(offerService, 'getOffers').and.returnValue(
      Observable.of(OFFERS_MOCK)
    );
    spyOn(offerService, 'getBestCommercialOffer').and.returnValue(
      Observable.of(OFFER_MOCK)
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cart should be defined', () => {
    expect(component.books).toBeDefined();
  });
});
