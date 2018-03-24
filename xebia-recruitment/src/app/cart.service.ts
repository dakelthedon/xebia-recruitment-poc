import {Injectable} from '@angular/core';
import {Book} from '../entities/book';

@Injectable()
export class CartService {

  constructor() {
  }

  /**
   * Method to add a book to cart
   * @param book
   */
  public add = (book: Book): void => {
    const books = this.getStoredCart();
    books.push(book);
    this.setCartInStorage(books);
  }

  /**
   * Method to get stored cart
   * @returns {Book[]}
   */
  public getStoredCart = (): Book[] => {
    return JSON.parse(sessionStorage.getItem('cart')) as Book[];
  }

  /**
   * Method to set cart in session storage
   * @param {Book[]} books
   */
  public setCartInStorage = (books: Book[]): void => {
    sessionStorage.setItem('cart', JSON.stringify(books));
  }

  /**
   * Method to remove book from cart
   * @param book
   */
  public removeItem = (isbn: string, books: Book[]): void => {
    for (const b of books) {
      if (b.isbn === isbn) {
        books.splice(books.indexOf(b), 1);
        break;
      }
    }
    this.setCartInStorage(books);
  }

  /**
   * Method to remove all books that have same isbn from cart
   * @param {string} isbn
   * @param {Book[]} books
   */
  public removeAllItems = (isbn: string, books: Book[]): void => {
    const lstBook = [];
    for (const b of books) {
      if (b.isbn !== isbn) {
        lstBook.push(b);
      }
    }
    // Update cart in storage
    this.setCartInStorage(lstBook);
  }
}
