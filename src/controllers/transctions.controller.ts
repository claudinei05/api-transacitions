import { Request, Response } from "express";
import { UserDataBase } from "../database/user.database";
import { RequestError } from "../erros/request.error";
import { ErrorServer } from "../erros/server.error";
import { Transaction } from "../models/transactions.model";
import { UserModel } from "../models/user.model";
import { SuccessResponse } from "../success/success";
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
        return RequestError.notFound(res, "User1");
      }
      const newTrasactions = new Transaction(title, value, type);
      users.transactions.push(newTrasactions);
      return res.status(201).send({
        ok: true,
        message: "Transactions success created",
        date: users,
      });
    } catch (error) {
      return RequestError.fieldNotProvaider(res, "Transactions ");
    }
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
    } catch (error: any) {
      return RequestError.fieldNotProvaider(res, "Transactions ");
    }
  }
  /*GET /users/:userId/transactions: A rota deverá retornar uma
listagem com todas as transações que você cadastrou até o
momento para um usuário específico, junto com o valor da soma de
entradas, retiradas e total de crédito. Esta rota deve poder filtrar as
transações pelo título e tipo de transação. */
  public listTransactions(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, type } = req.query;
      const database = new UserDataBase();
      const user = database.getId(userId);

      if (!user) {
        return RequestError.fieldNotProvaider(res, "User ");
      }
      if (title) {
        user.transactions = user.transactions.filter(
          (item) => item.title === title
        );
      }
      if (type) {
        user.transactions = user.transactions.filter(
          (item) => item.type === type
        );
      }

      let income = 0;
      let outecome = 0;
      user.transactions.forEach((item) => {
        if (item.type === "income") {
          income += item.value;
        } else {
          outecome += item.value;
        }
      });
      const soma = income - outecome;

      let transactions = user.transactions.map((item) => {
        return {
          id: item.id,
          title: item.title,
          value: item.value,
          type: item.type,
        };
      });
      return res.status(200).send({
        transactions,
        balance: {
          income,
          outecome,
          total: soma,
        },
      });
    } catch (error) {
      return RequestError.notFound(res, "Transactions ");
    }
  }
  //   PUT/DELETE /users/:userId/transactions/:id: Devem editar ou deletar
  // transações.
  public update(req: Request, res: Response) {
    try {
      const { userId, id } = req.params;
      const { type, title, value } = req.body;
      const database = new UserDataBase();
      const user = database.getId(userId);
      if (!user) {
        return RequestError.fieldNotProvaider(res, "User ");
      }
      const transactions = user.transactions.find((item) => item.id === id);
      if (!transactions) {
        return RequestError.notFound(res, "Transactions ");
      }
      if (type) {
        transactions.type = type;
      }
      if (title) {
        transactions.title = title;
      }
      if (value) {
        transactions.value = value;
      }
      return res.status(202).send({
        ok: true,
        message: "Atualizado com sucesso",
      });
    } catch (error: any) {
      return ErrorServer.errorServerProcessing(res, error);
    }
  }
  public deleteTransactions(req: Request, res: Response) {
    try {
      const { userId, id } = req.params;
      const database = new UserDataBase();
      const user = database.getId(userId);
      const transactionsDelete = database.indexUser(userId);
      if (!user) {
        return RequestError.fieldNotProvaider(res, "User ");
      }
      const transactions = user.transactions.find((item) => item.id === id);
      if (!transactions) {
        return RequestError.notFound(res, "Transactions ");
      }
      if (transactionsDelete < 0) {
        return RequestError.notFound(res, "User ");
      }
      database.delTransactions(transactionsDelete);
      return res.status(200).send({
        ok: true,
        message:
          "User was successfully deleted(Usuario foi excluído com sucesso)",
        data: transactions,
      });
    } catch (error) {
      return RequestError.notFound(res, "Transactions ");
    }
  }
}
