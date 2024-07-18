import { createStore } from "vuex";
import pengirim from "./pengirim.store";
import barang from "./barang.store";
import stock from "./stock.store";
import auth from "./auth.store";
import user from "./user.store";
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    barang,
    pengirim,
    stock,
    auth,
    user,
  },
});
