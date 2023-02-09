import { Router } from "express";
import { TransactionController } from "../controllers/transctions.controller";
import { usersController } from "../controllers/users.controller";
import { ValidatorMiddlewareCpf } from "../middlewares/validator_cpf.middleware";

export const userRoutes = () => {
  const app = Router();

  app.post(
    "/users",
    [ValidatorMiddlewareCpf.cpfValidMiddleware],
    new usersController().createUser
  );
  app.get("/users/:id", new usersController().getUser);
  app.get("/users", new usersController().listUsers);
  app.delete("/users/:id", new usersController().deleteUsers);
  app.put("/users/:id", new usersController().update);
  app.post("/user/:userId", new TransactionController().previousUser);
  app.get(
    "/user/:userId/transactions/:id",
    new TransactionController().userIdTransactions
  );
  //app.get("users/:userId/trasactions")

  return app;
};
