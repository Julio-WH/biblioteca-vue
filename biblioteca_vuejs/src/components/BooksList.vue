<template>
  <div class="container">
    <h1 class="text-center mb-4">Listado de Libros</h1>
    <router-link :to="{ name: 'agregar' }" class="btn btn-info m-2"
      >Agregar</router-link
    >
    <p v-if="alert" @click="fnAlert">{{ alert }}</p>
    <p>Libros totales {{ count }}</p>
    <div v-if="!count" class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div v-else class="row row-cols-1 row-cols-md-4 g-2">
      <div class="col" v-for="(book, index) in list_books" :key="index">
        <BooksCards
          :book="book"
          :btn="true"
          @data-emitted="receiveDataFromChild"
        />
      </div>
    </div>
  </div>
  <BookModal
    :dataBook="receivedData"
    :modalShow="modalShow"
    @data-emit-modal="receiveModalShow"
  />
</template>
<script>
import BooksCards from "./BooksCards.vue";
import BookModal from "./BookModal.vue";
const axios = require("axios");
export default {
  name: "BooksList",
  components: {
    BooksCards,
    BookModal,
  },
  data() {
    return {
      count: 0,
      list_books: [],
      receivedData: {},
      modalShow: false,
      alert: null,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
    get_book() {
      axios
        .get("http://192.168.1.75:3000/api/v1/books")
        .then((response) => {
          this.count = response.data.length;
          this.list_books = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    receiveDataFromChild(data) {
      this.receivedData = data; // Asignar los datos recibidos a la variable del componente padre
      this.modalShow = true;
    },
    receiveModalShow(data) {
      console.log(data);
      this.modalShow = data.modal;
      this.receivedData = {};
      this.alert = data.msg;
      if (data.response) {
        this.get_book();
      }
    },
    fnAlert() {
      this.alert = null;
    },
  },
  mounted() {
    this.get_book();
  },
};
</script>
