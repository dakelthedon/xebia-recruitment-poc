import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../product.service";
import {Book} from "../../entities/book";
import {CartService} from "../cart.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  private _route: ActivatedRoute;
  private _productService: ProductService;
  private _cartService: CartService;
  private _isbn: string;
  private _book: Book;
  private _display = false;
  private _bookFound = false;

  constructor(route: ActivatedRoute,
              productService: ProductService,
              cartService: CartService) {
    this._route = route;
    this._productService = productService;
    this._cartService = cartService;
  }
  ngOnInit() {
    this._route.params.subscribe(params => {
      this._isbn = params['isbn'];
      this._productService.getBookFromIsbn(this._isbn).subscribe((b: Book) => {
        this._book = b;
        if (!isNullOrUndefined(this._book.title)) {
          this._bookFound = true;
        }
        this._display = true;
      })
    });
  }

  /**
   * Method to add book to cart
   */
  addToCart = () => {
    this._cartService.add(this._book);
  }
}
