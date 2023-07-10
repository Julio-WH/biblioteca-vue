import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import BooksList from "./components/BooksList.vue";
import TesComponen from "./components/BookForm.vue";

const routes = [
  { path: "/", component: BooksList, name: "home" },
  { path: "/test", component: TesComponen, name: "test" },
];

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

const app = createApp(App);
app.use(router);
app.mount("#app");
