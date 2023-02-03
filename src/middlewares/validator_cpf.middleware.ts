import { NextFunction, Request, Response } from "express";
import { UserDataBase } from "../database/user.database";
import { RequestError } from "../erros/request.error";
import { ErrorServer } from "../erros/server.error";

export class ValidatorMiddlewareCpf {
  public static cpfValidMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { cpf } = req.body;

      const database = new UserDataBase();
      const cpfUser = database.getCpf(cpf);
      if (cpfUser) {
        return res.status(400).send({
          ok: false,
          message: "CPF already exists (CPF já existe)",
        });
      }
      next();
    } catch (error: any) {
      return ErrorServer.errorServerProcessing(res, error);
    }
  }
}
