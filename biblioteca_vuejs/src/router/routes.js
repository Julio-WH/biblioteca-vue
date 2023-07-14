import BooksList from "@/components/BooksList.vue";
import BookForm from "@/components/BookForm.vue";

const routes = [
  { path: "/", component: BooksList, name: "home" },
  { path: "/agregar", component: BookForm, name: "agregar" },
  { path: "/editar/:id", component: BookForm, name: "editar" },
];
export default routes;
