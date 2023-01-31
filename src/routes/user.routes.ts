import { Router } from "express";
import { usersController } from "../controllers/users.controller";

export const userRoutes = () => {
  const app = Router();

  app.post("/users", new usersController().createUser);
  return app;
};
