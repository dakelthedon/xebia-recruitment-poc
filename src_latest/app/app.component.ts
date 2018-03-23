import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from './product.service';
import {Book} from '../entities/book';
import {isNullOrUndefined} from 'util';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _searchingValue: string;
  private _titles = [];

  constructor(private _productService: ProductService) {
    // get All titles for typeahead
    this._productService.getBooks().subscribe((books: Book[]) => {
      if (!isNullOrUndefined(books) && books.length > 0) {
        for (const b of books) {
          this._titles.push(b.title);
        }
      }
    });
  }

  search = (): void => {
    console.log(this);
  }



  get searchingValue(): string {
    return this._searchingValue;
  }

  set searchingValue(value: string) {
    this._searchingValue = value;
  }

  /**
   * Method call on blur while searching a book
   */
  onBlurBook() {
    console.log(this._searchingValue);
    const resultBook = this._titles.filter(t => t.toLowerCase() === this._searchingValue.toLowerCase());
    console.log(this._searchingValue);
    /*if (resultBook.length === 0) {
     this._searchingValue = '';
     }*/
  }

  /**
   * Implements typeahead for searching
   * @param text$
   */
  searchBook = (text$: Observable<string>) =>
    text$.debounceTime(200).distinctUntilChanged().map(term => term.length < 1 ? []
        : this._titles.filter(t => t.toLowerCase().includes(term.toLowerCase())).slice(0, 10));
}
