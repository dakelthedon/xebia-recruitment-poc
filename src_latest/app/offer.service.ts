import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {UrlConstants} from '../utils/url-constants';
import {isNullOrUndefined} from 'util';
import {Offer} from '../entities/offer';
import {Observable} from 'rxjs/Observable';
import {Book} from "../entities/book";

@Injectable()
export class OfferService {

  private _httpClient: Http;
  constructor(httpClient: Http) {
    this._httpClient = httpClient;
  }

  /**
   * Method to get commercial Offers
   * @param books
   * @returns {Observable<R>}
   */
  public getOffers = (books: Book): Observable<Offer[]> => {
    return this._httpClient.get(this.getCommercialOffersUrl(this.getParameterForOffers(books))).map(
      (response) => {
        return response.json() as Offer[];
      }
    );
  }

  public getCommercialOffersUrl = (param: string): string => {
    return 'http://henri-potier.xebia.fr/books/' + param + '/commercialOffers';
  }

  /**
   * Method to get parameter for commercial Offers
   * @param books
   * @returns {string}
   */
  public getParameterForOffers = (books: Book[]): string => {
    let param = '';
    if (!isNullOrUndefined(books) && books.length > 0) {
      for (let i = 0; i < books.length; i++) {
        param += books[i].isbn;
        if (i !== (books.length - 1)) {
          param += ',';
        }
      }
    }
    return param;
  }
}
