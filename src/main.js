import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import naive from "naive-ui";
import { createDiscreteApi } from "naive-ui";
import { createPinia } from "pinia";
import { router } from "./common/router";
import axios from "axios";
import { AdminStore } from "./stores/AdminStore";

// axios.defaults.baseURL = "http://162.14.73.22:7031/";
axios.defaults.baseURL = "http://localhost:8080/";
const { message, dialog, notification } = createDiscreteApi([
  "message",
  "dialog",
  "notification",
]);

const app = createApp(App);

app.provide("axios", axios);
app.provide("message", message);
app.provide("dialog", dialog);
app.provide("notification", notification);
app.provide("server_url", axios.defaults.baseURL);

app.use(router);
app.use(naive);
app.use(createPinia());


app.mount("#app");




const adminStore = AdminStore();
axios.interceptors.request.use((config) => {
  config.headers.token = adminStore.token;
  return config;
});
