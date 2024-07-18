import $http from "../services/api.service";

const state = () => ({});

const mutations = {};

const actions = {
  sendStock,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

function sendStock({ commit }, stock) {
  return new Promise(async (resolve, reject) => {
    try {
      let network = await $http.post("http://localhost:8088/api/stock", stock);
      resolve(network.data);
    } catch (e) {
      reject(e);
    }
  });
}
