import $http from "../services/api.service";

const state = () => ({
  shippers: [],
  shipper: {},
  shippings: [],
});

const mutations = {
  _assign_shippers_data(state, shippers) {
    state.shippers = shippers;
  },
  _assign_shippings_data(state, shippings) {
    state.shippings = shippings;
  },
};

const actions = {
  getAllShipper,
  newShipper,
  updateShipper,
  deleteShipper,
  getShippingShipper,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

function getAllShipper({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let network = await $http.get("http://localhost:8088/api/shipper");
      commit("_assign_shippers_data", network.data);
      resolve(network.data);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}

function newShipper({ commit }, shipper) {
  return new Promise(async (resolve, reject) => {
    try {
      let network = await $http.post(
        "http://localhost:8088/api/shipper",
        shipper
      );
      resolve(network.data);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}

function updateShipper({ commit }, shipper) {
  return new Promise(async (resolve, reject) => {
    try {
      let network = await $http.put(
        "http://localhost:8088/api/shipper",
        shipper
      );
      resolve(network.data);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}

function deleteShipper({ commit }, shipperId) {
  return new Promise(async (resolve, reject) => {
    try {
      let network = await $http.delete(
        "http://localhost:8088/api/shipper/" + shipperId
      );
      resolve(network.data);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}

function getShippingShipper({ commit }, shipperId) {
  return new Promise(async (resolve, reject) => {
    try {
      let network = await $http.get(
        "http://localhost:8088/api/shipper/" + shipperId + "/shipping"
      );
      commit("_assign_shippings_data", network.data);
      resolve(network.data);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}
