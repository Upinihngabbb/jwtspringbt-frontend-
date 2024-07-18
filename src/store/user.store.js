import $http from "../services/api.service";

const state = () => ({
  users: [],
  user: {},
});

const mutations = {
  _assign_users_data(state, payload) {
    state.users = payload;
  },
  _assign_user_form(state, payload) {
    state.user = payload;
  },
  ADD_USER(state, user) {
    state.users.push(user);
  },
  UPDATE_USER(state, updatedUser) {
    const index = state.users.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      state.users.splice(index, 1, updatedUser);
    }
  },
};

const actions = {
  getAllUsers,
  storeNewUser,
  updateUser,
  deleteUser,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

function getAllUsers({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let network = await $http.get("/users");
      commit("_assign_users_data", network.data);
      resolve(network);
    } catch (e) {
      console.error(e.message);
      reject(e);
    }
  });
}

function storeNewUser({ commit }, user) {
  return new Promise(async (resolve, reject) => {
    try {
      let network = await $http.post("/users", user);
      commit("ADD_USER", network.data);
      resolve(network);
    } catch (e) {
      console.error(e.message);
      reject(e);
    }
  });
}

function updateUser({ commit }, user) {
  return new Promise(async (resolve, reject) => {
    try {
      if (user.createdAt) {
        user.createdAt = new Date(user.createdAt).toISOString();
      }
      let network = await $http.put(`/users/${user.id}`, user);
      commit("UPDATE_USER", network.data);
      resolve(network);
    } catch (e) {
      console.error(e.message);
      reject(e);
    }
  });
}

function deleteUser({ commit }, userId) {
  return new Promise(async (resolve, reject) => {
    try {
      let network = await $http.delete(`/users/${userId}`);
      resolve(network);
    } catch (e) {
      console.error(e.message);
      reject(e);
    }
  });
}
