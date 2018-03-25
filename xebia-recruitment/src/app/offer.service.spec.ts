import { TestBed, inject } from '@angular/core/testing';

import { OfferService } from './offer.service';
import {BrowserModule} from "@angular/platform-browser";
import {Http, HttpModule} from "@angular/http";

describe('OfferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [OfferService]
    });
  });

  it('should be created', inject([OfferService], (service: OfferService) => {
    expect(service).toBeTruthy();
  }));
});
