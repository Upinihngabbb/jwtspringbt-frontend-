import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store"; // Pastikan ini diimpor dengan benar
import "./assets/index.css";
import "izitoast/dist/css/iziToast.min.css";

createApp(App).use(store).use(router).mount("#app");
