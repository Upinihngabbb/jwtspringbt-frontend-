import $http from "../services/api.service";

const state = () => ({
  barangs: [],
  barang: {},
});

const mutations = {
  _assign_barangs_data(state, payload) {
    state.barangs = payload;
  },
  _assign_barang_form(state, payload) {
    state.barang = payload;
  },
  ADD_BARANG(state, barang) {
    state.barangs.push(barang);
  },
};

const actions = {
  getAllBarang,
  storeNewbarang,
  updateBarang,
  deleteBarang,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

function getAllBarang({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let network = await $http.get("http://localhost:8088/api/barang");
      commit("_assign_barangs_data", network.data);
      resolve(network);
    } catch (e) {
      console.error(e.message);
      reject(e);
    }
  });
}

function storeNewbarang({ commit }, barang) {
  return new Promise(async (resolve, reject) => {
    try {
      let network = await $http.post(
        "http://localhost:8088/api/barang",
        barang
      );
      commit("ADD_BARANG", network.data);
      resolve(network);
    } catch (e) {
      console.error(e.message);
      reject(e);
    }
  });
}

function updateBarang({ commit }, barang) {
  return new Promise(async (resolve, reject) => {
    try {
      let network = await $http.put("http://localhost:8088/api/barang", barang);
      resolve(network);
    } catch (e) {
      console.error(e.message);
      reject(e);
    }
  });
}

function deleteBarang({ commit }, barangId) {
  return new Promise(async (resolve, reject) => {
    try {
      let network = await $http.delete(
        `http://localhost:8088/api/barang/${barangId}`
      );
      resolve(network);
    } catch (e) {
      console.error(e.message);
      reject(e);
    }
  });
}
