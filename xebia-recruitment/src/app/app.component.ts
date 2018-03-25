import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from './product.service';
import {Book} from '../entities/book';
import {isNullOrUndefined} from 'util';
import {Observable} from "rxjs/Observable";
import {CartService} from "./cart.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _searchingValue: string;
  private _titles = [];
  private _router: Router;
  private _productService: ProductService;

  constructor(productService: ProductService,
              router: Router) {
    this._productService = productService;
    this._router = router;
    // get All titles for typeahead
    this._productService.getBooks().subscribe((books: Book[]) => {
      if (!isNullOrUndefined(books) && books.length > 0) {
        for (const b of books) {
          this._titles.push(b.title);
        }
      }
    });
  }

  search = (searchVal: string): void => {
    if (isNullOrUndefined(searchVal)) {
      this._router.navigate(['/catalog']);
    } else {
      this._router.navigate(['/catalog', encodeURI(searchVal)]);
    }
  }

  get searchingValue(): string {
    return this._searchingValue;
  }

  set searchingValue(value: string) {
    this._searchingValue = value;
  }

  selectedItem(item){
    console.log(item.item);
    this.search(item.item);
  }

  /**
   * Implements typeahead for searching
   * @param text$
   */
  searchBook = (text$: Observable<string>) =>
    text$.debounceTime(200).distinctUntilChanged().map(term => term.length < 1 ? []
        : this._titles.filter(t => t.toLowerCase().includes(term.toLowerCase())).slice(0, 10));
}
