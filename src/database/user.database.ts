import { UserModel } from "../models/user.model";
import { user } from "./user";

export class UserDataBase {
  public list() {
    return [...user];
  }
  public get(id: string) {
    return user.find((user) => user.id === id);
  }
  public create(usuario: UserModel) {
    return user.push(usuario);
  }
  // public getCpf(cpf:number){

  // }
}
