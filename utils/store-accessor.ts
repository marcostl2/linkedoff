import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import User from "@/store/user";

// eslint-disable-next-line import/no-mutable-exports
let user: User;

function initializeStores(store: Store<any>): void {
  user = getModule(User, store);
}

export { initializeStores, user };
