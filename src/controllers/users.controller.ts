import { Request, Response } from "express";
import { users } from "../database/user";
import { UserDataBase } from "../database/user.database";
import { RequestError } from "../erros/request.error";
import { ErrorServer } from "../erros/server.error";
import { Transaction } from "../models/transactions.model";
import { UserModel } from "../models/user.model";
import { SuccessResponse } from "../success/success";

export class usersController {
  /*createUser=> POST /users: A rota deverá receber name, cpf, email e age dentro do
  corpo da requisição, sendo que o cpf deve ser único por usuário.
  Criar uma instância da classe User com os dados recebidos, e
  adicionar no array de usuários.
  ○ Esta rota deve conter um middleware para verificar se já existe
  um usuário com o CPF informado. */
  public createUser(req: Request, res: Response) {
    try {
      const { name, cpf, email, age } = req.body;
      const user = new UserModel(name, cpf, email, age);
      const database = new UserDataBase();
      database.create(user);
      return SuccessResponse.createSuccess(
        res,
        "User was successfully create(O usuário foi criado com sucesso)",
        user
      );
    } catch (error: any) {
      return ErrorServer.errorServerProcessing(res, error);
    }
  }
  /* getUser => GET /users/:id: A rota deverá retornar um único usuário de acordo
com o parâmetro recebido. Não deverá retornar as transações do
usuário nessa rota. */
  public getUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const database = new UserDataBase();
      const user = database.getId(id);

      if (!user) {
        return RequestError.notFound(res, "User ");
      }
      res.status(200).send({
        ok: true,
        message: "User successfully obtained(Usuário obtido com sucesso)",
        data: user,
        // data: {
        //   id: user.id,
        //   name: user.name,
        //   cpf: user.cpf,
        //   email: user.email,
        //   age: user.age,
        // },
      });
    } catch (error: any) {
      return ErrorServer.errorServerProcessing(res, error);
    }
  }
  //listUsers => Listar usuario e fazer filtro por nome, e-mail e cpf
  /*GET /users: A rota deve retornar uma listagem com todos os
  usuários que você cadastrou até o momento. Esta rota deve poder
  filtrar os usuários pelo nome, email ou cpf. Não deverá retornar as
  transações do usuário nessa rota. */
  public listUsers(req: Request, res: Response) {
    try {
      const { nome, email, cpf } = req.query;
      const database = new UserDataBase();
      let users = database.list();

      if (nome) {
        users = users.filter((user) => user.name === String(nome));
      }
      if (email) {
        users = users.filter((user) => user.email === String(email));
      }
      if (cpf) {
        users = users.filter((user) => user.cpf === String(cpf));
      }

      const returnUser = users.map((users) => {
        return {
          id: users.id,
          name: users.name,
          cpf: users.cpf,
          email: users.email,
          age: users.age,
        };
      });
      if (returnUser.length === 0) {
        return res.status(404).send({
          ok: false,
          message: "Usuario não encontrado",
        });
      }
      res.status(200).send({
        ok: true,
        message: "Users successfully listed (Usuários listados com sucesso)",
        data: returnUser,
      });
    } catch (error: any) {
      return RequestError.notFound(res, error);
    }
  }
  // PUT /users/:id: A rota deverá editar ou deletar usuários.
  public update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, cpf, email, age } = req.body;
      const database = new UserDataBase();
      let users = database.getId(id);
      if (!users) {
        return RequestError.notFound(res, "User ");
      }
      if (name) {
        users.name = name;
      }
      if (cpf) {
        users.cpf = cpf;
      }
      if (email) {
        users.email = email;
      }
      if (age) {
        users.age = age;
      }

      return res.status(200).send({
        ok: true,
        message: "User successfully updated (Usuario atualizado com sucesso)",
      });
    } catch (error: any) {
      return ErrorServer.errorServerProcessing(res, error);
    }
  }
  public deleteUsers(req: Request, res: Response) {
    try {
      console.log("teste");

      const { id } = req.params;
      const database = new UserDataBase();
      const users = database.indexUser(id);
      const user = database.getId(id);

      if (!user) {
        return RequestError.notFound(res, "User ");
      }

      if (users < 0) {
        return RequestError.notFound(res, "User ");
      }
      database.deleteUser(users);
      res.status(200).send({
        ok: true,
        message:
          "User was successfully deleted(Usuario foi excluído com sucesso)",
        data: {
          id: user.id,
          name: user.name,
          cpf: user.cpf,
          email: user.email,
          age: user.age,
        },
      });
    } catch (error: any) {
      return ErrorServer.errorServerProcessing(res, error);
    }
  }
}
