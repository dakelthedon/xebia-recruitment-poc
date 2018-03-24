import { Pipe, PipeTransform } from '@angular/core';
import {Book} from "../entities/book";
import {isNullOrUndefined} from "util";

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {

  transform(books: Book[], title: string): Book[] {
    const results: Book[] = [];
    if (isNullOrUndefined(title)) {
      return books;
    }
    for(let i = 0; i < books.length; i++ ){
      if (books[i].title.toLowerCase().startsWith(title.toLowerCase())){
        results.push(books[i]);
      }
    }
    return results;
  }
}
