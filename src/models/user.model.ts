import { v4 as createUuid } from "uuid";
import { Transaction } from "./transactions.model";
export class UserModel {
  private _id: string;
  private _transactions: Transaction[];
  constructor(
    private _name: string,
    private _cpf: string,
    private _email: string,
    private _age: number
  ) {
    this._id = createUuid();
    this._transactions = [];
  }
  public get id() {
    return this._id;
  }
  // public set id() {
  //   this._id = this.id;
  // }
  public get age() {
    return this._age;
  }
  public set age(age: number) {
    this._age = age;
  }
  public get cpf() {
    return this._cpf;
  }
  public set cpf(cpf: string) {
    this._cpf = cpf;
  }
  public get name() {
    return this._name;
  }
  public set name(name: string) {
    this._name = name;
  }
  public get email() {
    return this._email;
  }
  public set email(email: string) {
    this._email = email;
  }
  public get transactions() {
    return this._transactions;
  }
  public set transactions(transactions: Transaction[]) {
    this._transactions = transactions;
  }
  public toJson() {
    return {
      id: this._id,
      name: this._name,
      cpf: this._cpf,
      age: this._age,
      email: this._email,
      transactions: this.transactions,
    };
  }
}
