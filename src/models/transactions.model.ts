import { v4 as createUuid } from "uuid";

export class Transaction {
  private _id: string;
  constructor(
    private _title: string,
    private _value: string,
    private _type: string = "income" || "outecome"
  ) {
    this._id = createUuid();
  }
  public get id() {
    return this._id;
  }
  public get title() {
    return this._title;
  }
  public set title(title: string) {
    this._title = title;
  }
  public get type() {
    return this._type;
  }
  public set type(type: string) {
    this._type = type;
  }
  public get value() {
    return this._value;
  }
  public set value(value: string) {
    this._value = value;
  }
  public toJson() {
    return {
      title: this._title,
      value: this._value,
      type: this._type,
    };
  }
}
