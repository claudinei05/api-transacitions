import { cpf } from "cpf-cnpj-validator";
import { UserModel } from "../models/user.model";

import { users } from "./user";

export class UserDataBase {
  public list() {
    return [...users];
  }
  public getId(id: string) {
    return users.find((user) => user.id === id);
  }

  public create(usuario: UserModel) {
    return users.push(usuario);
  }
  public getCpf(cpf: string) {
    return users.find((user) => user.cpf === cpf);
  }
  public indexUser(id: string) {
    return users.findIndex((user) => user.id === id);
  }
  public deleteUser(index: number) {
    return users.splice(index, 1);
  }
}
