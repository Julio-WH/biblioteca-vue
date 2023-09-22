import BooksList from "@/components/BooksList.vue";
import BookForm from "@/components/BookForm.vue";
import AuthorList from "@/components/AuthorList.vue";
import AuthorForm from "@/components/AuthorForm.vue";

const routes = [
  { path: "/libros", component: BooksList, name: "libro_lista" },
  { path: "/libro/agregar", component: BookForm, name: "libro_agregar" },
  { path: "/libro/editar/:id", component: BookForm, name: "libro_editar" },
  { path: "/autores", component: AuthorList, name: "autor_lista" },
  { path: "/autor/agregar", component: AuthorForm, name: "autor_agregar" },
  { path: "/autor/editar/:id", component: AuthorForm, name: "autor_editar" },
];
export default routes;
