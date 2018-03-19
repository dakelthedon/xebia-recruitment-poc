import {Book} from "../entities/book";

export class UrlConstants {
  public static URL_GET_BOOKS: string = 'http://henri-potier.xebia.fr/books/';
  public static URL_GET_OFFERS = (books: Book[]): string => {
    // TODO get isbns for offer
    return 'http://henri-potier.xebia.fr/books/';
  }
}
