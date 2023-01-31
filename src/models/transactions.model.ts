import { v4 as createUuid } from "uuid";

export class Transaction {
  private _id: string;
  constructor(
    private title: string,
    private value: number,
    private type: string = "deposito" || "saque" || "transferir"
  ) {
    this._id = createUuid();
  }
}
