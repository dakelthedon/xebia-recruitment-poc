import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";
import {Book} from "../../entities/book";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  private _books: Book[];
  private _productService: ProductService;
  private _cartService: CartService;

  constructor(productService: ProductService,
              cartService: CartService) {
    this._productService = productService;
    this._cartService = cartService;
  }

  ngOnInit() {
    this._productService.getBooks().subscribe((books: Book[]) => {
      this._books = books;
    });
  }

  addToCart = (book: Book): void => {
    this._cartService.add(book);
  }

  get books(): Book[] {
    return this._books;
  }

  set books(value: Book[]) {
    this._books = value;
  }
}
