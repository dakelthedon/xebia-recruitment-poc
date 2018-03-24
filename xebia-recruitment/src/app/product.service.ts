import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Book} from '../entities/book';
import {UrlConstants} from '../utils/url-constants';
import 'rxjs/Rx';
import {Http} from '@angular/http';
import {isNullOrUndefined} from "util";

@Injectable()
export class ProductService {

  private _httpClient: Http;
  constructor(httpClient: Http) {
    this._httpClient = httpClient;
  }

  /**
   * Method to get all books (catalog)
   * @returns {Observable<R>}
   */
  public getBooks = (): Observable<Book[]> => {
    return this._httpClient.get(UrlConstants.URL_GET_BOOKS).map(
      (response) => {
        return response.json() as Book[];
      }
    );
  }

  /**
   * Method to get Book From Isbn
   * @param {string} isbn
   * @returns {Observable<Book>}
   */
  public getBookFromIsbn = (isbn: string): Observable<Book> => {
    return this._httpClient.get(UrlConstants.URL_GET_BOOKS).map(
      (response) => {
        let book = {};
        const books = response.json() as Book[];
        if (!isNullOrUndefined(books) && books.length > 0) {
          for (const b of books) {
            if (b.isbn === isbn) {
              book = b;
              break;
            }
          }
        }
        return book as Book;
      }
    );
  }
}
