import {Pipe, PipeTransform} from '@angular/core';
import {Book} from "../entities/book";
import {isNullOrUndefined} from "util";

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  public transform(books: Book[], pmin: number, pmax: number): Book[] {
    const results: Book[] = [];
    if (isNullOrUndefined(pmin) && isNullOrUndefined(pmax)) {
      return books;
    }
    for (let i = 0; i < books.length; i++) {
      this.applyFilter(books[i], results, pmin, pmax);
    }
    return results;
  }

  private applyFilter = (book: Book, results: Book[], pmin: number, pmax: number): void => {
    if (!isNullOrUndefined(pmin) && !isNullOrUndefined(pmax)) {
      if (pmax >= pmin) {
        if (book.price >= pmin && book.price <= pmax) {
          results.push(book);
        }
      } else {
        if (book.price >= pmin) {
          results.push(book);
        }
      }
    } else if (!isNullOrUndefined(pmin)) {
      if (book.price >= pmin) {
        results.push(book);
      }
    } else if (!isNullOrUndefined(pmax)) {
      if (book.price <= pmax) {
        results.push(book);
      }
    }
  }
}
