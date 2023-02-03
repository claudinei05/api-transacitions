import { Response } from "express";

export class RequestError {
  public static fieldNotProvaider(res: Response, field: string) {
    return res.status(400).send({
      ok: false,
      massage: field + " was not provided(não foi fornecido)",
    });
  }
  public static notFound(res: Response, entity: string) {
    return res.status(404).send({
      ok: false,
      message: entity + " not found(não encontrado)",
    });
  }
}
