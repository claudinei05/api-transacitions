import { Request, Response } from "express";
import { user } from "../database/user";
import { UserDataBase } from "../database/user.database";
import { RequestError } from "../erros/request.error";
import { Transaction } from "../models/transactions.model";
import { UserModel } from "../models/user.model";
import { SuccessResponse } from "../success/success";

export class usersController {
  public createUser(req: Request, res: Response) {
    try {
      const { name, cpf, email, age } = req.body;
      const user = new UserModel(name, cpf, email, age);
      const database = new UserDataBase();
      database.create(user);
      return SuccessResponse.createSuccess(
        res,
        "User was successfully create",
        user
      );
    } catch (error: any) {}

    // if (cpf === cpf) {
    //   return RequestError.fieldNotProvaider
    // }
  }
}
