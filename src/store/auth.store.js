import $http from "../services/api.service";

const state = {
  token: localStorage.getItem("token") || "",
  user: null,
  status: "",
  error: null,
};

const getters = {
  isLoggedIn: (state) => !!state.token,
  authStatus: (state) => state.status,
  currentUser: (state) => state.user,
};

const mutations = {
  auth_request(state) {
    state.status = "loading";
    state.error = null;
  },
  auth_success(state, { token, user }) {
    state.status = "success";
    state.token = token;
    state.user = user;
  },
  auth_error(state, error) {
    state.status = "error";
    state.error = error.response?.data?.message || error.message;
  },
  logout(state) {
    state.status = "";
    state.token = "";
    state.user = null;
  },
};

const actions = {
  async login({ commit }, user) {
    commit("auth_request");
    try {
      const response = await $http.post(
        "http://localhost:8088/api/login",
        user
      );
      const { token, user: userData } = response.data;
      console.log("Login response:", response.data);
      localStorage.setItem("token", token);
      commit("auth_success", { token, user: userData });
      return response;
    } catch (error) {
      console.error("Login error:", error);
      commit("auth_error", error);
      localStorage.removeItem("token");
      return Promise.reject(error);
    }
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      commit("logout");
      localStorage.removeItem("token");
      resolve();
    });
  },
  async register({ commit }, user) {
    console.log("User attempting to register:", user);
    commit("auth_request");
    try {
      const response = await $http.post(
        "http://localhost:8088/api/register",
        user
      );
      const { token, user: userData } = response.data;
      console.log("Register response:", response.data);
      localStorage.setItem("token", token);
      commit("auth_success", { token, user: userData });
      return response;
    } catch (error) {
      console.error("Register error:", error);
      commit("auth_error", error);
      localStorage.removeItem("token");
      return Promise.reject(error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
