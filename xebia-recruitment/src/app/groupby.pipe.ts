import { Pipe, PipeTransform } from '@angular/core';
import {isNullOrUndefined} from "util";

@Pipe({
  name: 'groupby'
})
export class GroupbyPipe implements PipeTransform {

  transform(books: Array<any>, isbn: string): Array<any> {
    // prevents the application from breaking if the array of objects doesn't exist yet
    if(isNullOrUndefined(books) || books.length < 1) {
      return [];
    }

    const groupedBooks = books.reduce((previous, current)=> {
      if(!previous[current[isbn]]) {
        previous[current[isbn]] = [current];
      } else {
        previous[current[isbn]].push(current);
      }

      return previous;
    }, {});

    // this will return an array of objects, each object containing a group of objects
    return Object.keys(groupedBooks).map(key => ({ key, value: groupedBooks[key] }));
  }

}
