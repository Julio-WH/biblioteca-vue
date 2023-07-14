import routes from "@/router/routes";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export default router;
