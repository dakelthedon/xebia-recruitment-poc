export class Offer {
  private _type: string;
  private _value: number;
  private _sliceValue: number;
  private _reducePrice: number;
  private _refund: number;

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }

  get sliceValue(): number {
    return this._sliceValue;
  }

  set sliceValue(value: number) {
    this._sliceValue = value;
  }

  get reducePrice(): number {
    return this._reducePrice;
  }

  set reducePrice(value: number) {
    this._reducePrice = value;
  }

  get refund(): number {
    return this._refund;
  }

  set refund(value: number) {
    this._refund = value;
  }
}
