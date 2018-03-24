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
      if (books[i].price >= pmin && books[i].price <= pmax) {
        results.push(books[i]);
      }
    }
    return results;
  }
}
