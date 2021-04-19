import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { User } from "@/models";

@Module({
  name: "user", // nome do modulo, deve ser igual ao do arquivo
  stateFactory: true,
  namespaced: true,
  preserveState: true, // habilita salvar no storage
})
export default class Users extends VuexModule {
  private user = {} as User;

  public get $single() {
    return this.user;
  }

  @Mutation
  private SET_SINGLE(user: User) {
    this.user = user;
  }

  @Action
  public create(user: User) {
    this.context.commit("SET_SINGLE", user);
  }
}
