<template>
  <div class="container">
    <h1 class="text-center mb-4">Listado de Libros con Vue.js</h1>
    <button type="button" class="btn btn-primary">Agregar</button>
    <br />
    Libros totales {{ count }}
    <p v-if="!count">Cargando Los libros</p>
    <div v-else class="row row-cols-1 row-cols-md-4 g-2">
      <div class="col" v-for="(book, index) in list_books" :key="index">
        <BooksCards :book="book" />
      </div>
    </div>
  </div>
</template>
<script>
import BooksCards from "./BooksCards.vue";
const axios = require("axios");
export default {
  name: "BooksList",
  components: {
    BooksCards,
  },
  data() {
    return {
      count: 0,
      list_books: [],
    };
  },
  methods: {
    increment() {
      this.count++;
    },
    get_book() {
      axios
        .get("http://localhost:3000/api/v1/books")
        .then((response) => {
          console.log(response.data);
          this.count = response.data.length;
          this.list_books = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.get_book();
  },
};
</script>
