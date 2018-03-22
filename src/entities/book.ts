export class Book {
  private _isbn: string;
  private _title: string;
  private _price: number;
  private _cover: string;
  private _synopsis: string[];

  get isbn(): string {
    return this._isbn;
  }

  set isbn(value: string) {
    this._isbn = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get cover(): string {
    return this._cover;
  }

  set cover(value: string) {
    this._cover = value;
  }

  get synopsis(): string[] {
    return this._synopsis;
  }

  set synopsis(value: string[]) {
    this._synopsis = value;
  }
}
