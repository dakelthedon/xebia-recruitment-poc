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
  public getOffers = (books: Book[]): Observable<any> => {
    return this._httpClient.get(this.getCommercialOffersUrl(this.getParameterForOffers(books))).map(
      (response) => {
        return response.json();
      }
    );
  }

  /**
   * Method to get commercial Offers url
   * @param {string} param
   * @returns {string}
   */
  private getCommercialOffersUrl = (param: string): string => {
    return 'http://henri-potier.xebia.fr/books/' + param + '/commercialOffers';
  }

  /**
   * Method to get best commercial offer
   * @param {number} globalPrice
   * @param {Offer[]} offers
   * @returns {Offer}
   */
  public getBestCommercialOffer = (globalPrice: number, offers: Offer[]): Offer => {
    if (!isNullOrUndefined(offers) && offers.length > 0) {
      for (const o of offers) {
        switch (o.type) {
          case 'percentage':
            o.reducePrice = globalPrice - (o.value * globalPrice / 100);
            break;
          case 'minus':
            o.reducePrice = globalPrice - o.value;
            break;
          case 'slice':
            o.refund = (globalPrice * o.value / o.sliceValue);
            o.reducePrice = globalPrice - o.refund;
            break;

          default:
            break;
        }
      }
      return offers.sort((o1, o2) => o1.reducePrice - o2.reducePrice)[0];
    }
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
