import { Component, OnInit } from '@angular/core';
import {CartService} from "../cart.service";
import {Book} from "../../entities/book";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private _cartService: CartService;
  private _books = [];

  constructor(cartService: CartService) {
    this._cartService = cartService;
  }

  ngOnInit() {
    this.setCartBooks();
  }

  getSynopsis = (book: Book): string =>{
    if (!isNullOrUndefined(book.synopsis) && book.synopsis.length > 0) {
      return book.synopsis[0].substr(0, 200) + '...';
    }
    return '';
  }

  setCartBooks = (): void => {
    this._books = this._cartService.books;
    console.log(this._books);
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
