import { TestBed, inject } from '@angular/core/testing';

import { ProductService } from './product.service';
import {HttpModule} from "@angular/http";

describe('ProductService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [ProductService]
    });
  });

  it('should be created', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));

});
