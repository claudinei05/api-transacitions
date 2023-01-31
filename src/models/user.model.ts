import { v4 as createUuid } from "uuid";
import { Transaction } from "./transactions.model";
export class UserModel {
  private _id: string;
  constructor(
    private _name: string,
    private _cpf: string,
    private _email: string,
    private _age: number,
    private _transactions?: Transaction[]
  ) {
    this._id = createUuid();
  }
  public get id() {
    return this._id;
  }
  public set age(age: number) {
    this._age = age;
  }
  public get cpf() {
    return this._cpf;
  }
  public get name() {
    return this._name;
  }
  public get email() {
    return this._email;
  }
  public get transactions() {
    return this._transactions;
  }
  public toJson() {
    return {
      id: this._id,
      name: this._name,
      cpf: this._cpf,
      age: this._age,
      email: this._email,
      transactions: this.transactions,
      //cpf: cpfValidator.format(this._cpf.toString().padStart(11, "0")),
    };
  }
}
