import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Barang from "../views/barang/Barang.vue";
import Pengirim from "../views/pengirim/Pengirim.vue";
import NewPengirim from "../views/pengirim/New.vue";
import UpdatePengirim from "../views/pengirim/Update.vue";

import NewBarang from "../views/barang/New.vue";
import UpdateBarang from "../views/barang/Update.vue";
import FormShip from "../views/ship/Form.vue";
import ShippingPengirim from "../views/pengirim/Shipping.vue";
import Login from "../views/login-regist/Login.vue";
import Register from "../views/login-regist/Register.vue";
import UserList from "../views/user/UserList.vue";
import UpdateUser from "../views/user/Update.vue";
import DigitalClock from "../components/DigitalClock.vue";
const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/clock",
    name: "DigitalClock",
    component: DigitalClock,
  },

  {
    path: "/user/update",
    name: "user.update",
    component: UpdateUser, // pastikan komponen ini diimpor di file router Anda
  },
  {
    path: "/users",
    name: "UserList",
    component: UserList,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },

  {
    path: "/barang",
    name: "barang.index",
    component: Barang,
  },
  {
    path: "/barang/update",
    name: "barang.update",
    component: UpdateBarang,
  },
  {
    path: "/pengirim",
    name: "pengirim.index",
    component: Pengirim,
  },
  {
    path: "/pengirim/new",
    name: "pengirim.new",
    component: NewPengirim,
  },
  {
    path: "/pengirim/update",
    name: "pengirim.update",
    component: UpdatePengirim,
  },
  {
    path: "/pengirim/:id/shipping",
    name: "pengirim.shipping",
    component: ShippingPengirim,
  },
  {
    path: "/barang/new",
    name: "barang.new",
    component: NewBarang,
  },
  {
    path: "/ship/:tipe",
    name: "ship.form",
    component: FormShip,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
