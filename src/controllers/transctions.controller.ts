import { Request, Response } from "express";
import { UserDataBase } from "../database/user.database";
import { RequestError } from "../erros/request.error";
import { Transaction } from "../models/transactions.model";
import { UserModel } from "../models/user.model";
/*POST /user/:userId/transactions: A rota deverá receber title, value,
type dentro do corpo da requisição, sendo type o tipo da transação,
que deve ter como valor de entradas income (depósitos) e outcome
para saídas (retiradas). Criar uma instância da classe Transaction,
e adicioná-la ao usuário responsável salvo anteriormente no array
de usuários. */

export class TransactionController {
  public previousUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      let { id, title, type, value } = req.body;
      const database = new UserDataBase();

      id = userId;
      if (!title) {
        return RequestError.fieldNotProvaider(res, "Title ");
      }
      if (type !== "income" && type !== "outcome") {
        return res.status(400).send({
          ok: false,
          massage: " incorrect request(solicitação incorreta)",
        });
      }
      if (!type) {
        return RequestError.fieldNotProvaider(res, "Type ");
      }

      if (!value) {
        return RequestError.fieldNotProvaider(res, "Value ");
      }
      const users = database.getId(userId);

      if (!users) {
        return RequestError.notFound(res, "User");
      }
      const newTrasactions = new Transaction(title, value, type);
      users.transactions.push(newTrasactions);
      return res.status(201).send({
        ok: true,
        message: "Transactions success created",
        date: users,
      });
    } catch (error) {}
  }
  /*GET /user/:userId/transactions/:id: A rota deverá retornar uma única
transação cadastrada previamente */
  public userIdTransactions(req: Request, res: Response) {
    try {
      const { userId, id } = req.params;
      const database = new UserDataBase();

      const user = database.getId(userId);
      if (!user) {
        return RequestError.fieldNotProvaider(res, "User ");
      }

      const transactions1 = user.transactions.find(
        (transactions) => transactions.id === id
      );
      if (!transactions1) {
        return RequestError.fieldNotProvaider(res, "User ");
      }
      return res.status(200).send({
        ok: true,
        message: "Solicitação bem sucedida",
        date: {
          id: transactions1.id,
          title: transactions1.title,
          value: transactions1.value,
          type: transactions1.type,
        },
      });
    } catch (error) {}
  }
  /*GET /users/:userId/transactions: A rota deverá retornar uma
listagem com todas as transações que você cadastrou até o
momento para um usuário específico, junto com o valor da soma de
entradas, retiradas e total de crédito. Esta rota deve poder filtrar as
transações pelo título e tipo de transação. */
  //   public listTransactions(req: Request, res: Response) {
  //     try {
  //       const {userId}=req.params
  //       const database= new UserDataBase()
  //       const user=
  //     } catch (error) {}
  //   }
}
