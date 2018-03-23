import { Injectable } from '@angular/core';
import {Book} from '../entities/book';

@Injectable()
export class CartService {

  private _books: Book[];

  constructor() {
    this._books = [];
  }

  /**
   * Method to add a book to cart
   * @param book
   */
  public add = (book: Book): void => {
    this._books.push(book);
  }

  /**
   * Method to remove book from cart
   * @param book
   */
  public remove = (book: Book): void => {
    this._books.splice(this._books.indexOf(book), 1);
  }

  get books(): Book[] {
    return this._books;
  }

}
