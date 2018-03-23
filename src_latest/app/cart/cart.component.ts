import { Component, OnInit } from '@angular/core';
import {CartService} from '../cart.service';
import {Book} from '../../entities/book';
import {isNullOrUndefined} from 'util';
import {OfferService} from '../offer.service';
import {Offer} from '../../entities/offer';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private _cartService: CartService;
  private _offerService: OfferService;
  private _books = [];
  private _globalPrice = 0;
  private _reducePrice = 0;
  private _appliedOffer: Offer;

  constructor(cartService: CartService,
              offerService: OfferService) {
    this._cartService = cartService;
    this._offerService = offerService;
  }

  ngOnInit() {
    this.setCartBooks();
  }

  getSynopsis = (book: Book): string => {
    if (!isNullOrUndefined(book.synopsis) && book.synopsis.length > 0) {
      return book.synopsis[0].substr(0, 200) + '...';
    }
    return '';
  }

  setCartBooks = (): void => {
    this._books = this._cartService.books;
    const storedCart = this.getStoredCart();
    if (isNullOrUndefined(this._books) || this._books.length < 1) {
      this._books = storedCart;
    } else {
      this.setCartInStorage(this._books);
    }
    console.log(this._books);
    this.applyCommercialOffers(this._books);
  }

  applyCommercialOffers = (books: Book[]): void => {
    this._offerService.getOffers(books).subscribe((offers: Offer[]) => {
      console.log(offers);
      this.setGlobalPrice(books);
      this.setBestCommercialOffer(this._globalPrice, offers);
    });
  }

  setBestCommercialOffer = (globalPrice: number, offers: Offer[]): void => {
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
            o.reducePrice = globalPrice * o.value / o.sliceValue;
            break;

          default:
            break;
        }
      }
      console.log(offers);
      console.log(offers.sort((o1, o2) => o1.reducePrice - o2.reducePrice));
    }
  }

  setGlobalPrice = (books: Book[]): void => {
    this._globalPrice = 0;
    if (!isNullOrUndefined(books) && books.length > 0) {
      for (const b of books) {
        this._globalPrice += b.price;
      }
    }
  }

  getStoredCart = (): Book[] => {
    return JSON.parse(sessionStorage.getItem('cart')) as Book[];
  }

  setCartInStorage = (books: Book[]): void => {
    sessionStorage.setItem('cart', JSON.stringify(books));
  }

  removeBook = (isbn: string): void => {
    console.log(isbn);
    // this.setCartBooks();
  }

  removeAllBooks = (isbn: string): void => {
    console.log(isbn);
    // this.setCartBooks();
  }

}
