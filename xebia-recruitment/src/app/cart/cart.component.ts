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
  private _bestOffer: Offer;
  private _displayCart = false;

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

  /**
   * Method to set cart products
   */
  setCartBooks = (): void => {
    this._books = this._cartService.getStoredCart();
    if (!isNullOrUndefined(this._books) && this._books.length > 0) {
      this.applyCommercialOffers(this._books);
    } else {
      this._displayCart = true;
    }
  }

  /**
   * Method to apply commercial offers and get best commercial offer
   * @param {Book[]} books
   */
  applyCommercialOffers = (books: Book[]): void => {
    this._offerService.getOffers(books).subscribe((commercialOffers: any) => {
      this.setGlobalPrice(books);
      this._bestOffer = this._offerService.getBestCommercialOffer(this._globalPrice, commercialOffers.offers);
      this._displayCart = true;
    });
  }

  /**
   * Method to set global price
   * @param {Book[]} books
   */
  setGlobalPrice = (books: Book[]): void => {
    this._globalPrice = 0;
    if (!isNullOrUndefined(books) && books.length > 0) {
      for (const b of books) {
        this._globalPrice += b.price;
      }
    }
  }

  /**
   * Method to remove item
   * @param {string} isbn
   */
  removeItem = (isbn: string): void => {
    this._displayCart = false;
    this._cartService.removeItem(isbn, this._books);
    this.setCartBooks();
  }

  /**
   * Method to remove all book that have same isbn from cart
   * @param {string} isbn
   */
  removeAllItems = (isbn: string): void => {
    this._displayCart = false;
    this._cartService.removeAllItems(isbn, this._books);
    this.setCartBooks();
  }

  /**
   * Method to get best offer text (TODO in file Json and Use Translate pipe)
   * @returns {string}
   */
  getBestOffertText = (): string => {
    let text = '*';
    if (!isNullOrUndefined(this._bestOffer)) {
      switch (this._bestOffer.type) {
        case 'percentage':
          text += 'Offre applicable directement';
          break;
        case 'minus':
          text += 'Offre applicable directement en caisse';
          break;
        case 'slice':
          text += 'Un montant de ' + this._bestOffer.refund + ' EUR vous sera remboursé';
          break;

        default:
          break;
      }
    }
    return text;
  }

}
