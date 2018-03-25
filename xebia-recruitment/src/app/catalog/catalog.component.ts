import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";
import {Book} from "../../entities/book";
import {CartService} from "../cart.service";
import {ActivatedRoute} from "@angular/router";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  private _books: Book[];
  private _productService: ProductService;
  private _cartService: CartService;
  private _titleFilter: string;
  private _priceMin: number;
  private _priceMax: number;
  private _display = false;
  private _route: ActivatedRoute;
  private _searchValue: string;

  constructor(productService: ProductService,
              cartService: CartService,
              route: ActivatedRoute) {
    this._productService = productService;
    this._cartService = cartService;
    this._route = route;
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      const search = params['search'] as string;
      // Get search parameter
      this._searchValue = isNullOrUndefined(search) ? search : decodeURI(search);
      // If search param is null or undefined then load catalog (all books)
      if (isNullOrUndefined(this._searchValue)) {
        this.loadCatalog();
      } else {
        // load books from search parameter
        this._productService.searchBooks(this._searchValue).subscribe((result: Book[]) => {
          this._books = result;
          this._display = true;
        })
      }
    });
  }

  /**
   * Method to get all books
   */
  loadCatalog = () => {
    this._productService.getBooks().subscribe((books: Book[]) => {
      this._books = books;
      this._display = true;
    });
  }

  /**
   * Method that returns true if search doesn't provide any result
   * @returns {boolean}
   */
  searchNotFound = (): boolean => {
    return this._display && !isNullOrUndefined(this._searchValue)
      && (isNullOrUndefined(this._books) || this._books.length < 1);
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
