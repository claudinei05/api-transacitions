import { Request, Response } from "express";
import { UserDataBase } from "../database/user.database";
import { RequestError } from "../erros/request.error";
import { Transaction } from "../models/transactions.model";
import { UserModel } from "../models/user.model";

export class TransactionController {
  public previousUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      let { title, type, value } = req.body;
      const database = new UserDataBase();
      // const transactionsType=Transaction
      // type = database.getId(userId);

      // if (type != Transaction.length) {
      // }
      const elementTransaction = title && type && value;

      if (!title || !type || !value) {
        return RequestError.fieldNotProvaider(res, "Transaction ");
      }
      const users = database.getId(userId);

      if (!users) {
        return RequestError.notFound(res, "User");
      }
      users.transactions.push(...elementTransaction);
      return res.status(201).send({
        ok: true,
        message: "Transactions success created",
        data: users,
      });

      // users.transactions = users.transactions.concat(elementTransaction);

      // users.transactions = users.transactions.concat(elementTransaction);
      // const users = database.getId(userId);
      // if (!users) {
      //   return RequestError.notFound(res, "User ");
      // }
      //   users?.transactions;

      //   const createTransactions = (transactionsUser: Transaction) => {
      //     return users.transactions.push(transactionsUser);
      //   };
      // }
    } catch (error) {}
  }
}
