import { Response } from "express";

export class ErrorServer {
  public static errorServerProcessing(res: Response, error: any) {
    return res.status(500).send({
      ok: false,
      message: error.toString("test"),
    });
  }
}
