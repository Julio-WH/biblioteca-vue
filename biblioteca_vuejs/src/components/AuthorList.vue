<template>
  <div class="container">
    <h1 class="text-center mb-4">Lista de Autores</h1>
    <AlertComponent
      :dataAlert="dataAlert"
      v-if="Object.keys(dataAlert).length !== 0"
    />
    <router-link :to="{ name: 'autor_agregar' }" class="btn btn-info m-2"
      >Agregar</router-link
    >
    <p>Autores totales {{ count }}</p>
    <div v-if="spinner" class="spinner-border text-primary" role="status">
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
    :toSubmit="toSubmit"
    @data-emit-modal="receiveModalShow"
  />
</template>
<script>
import BooksCards from "./BooksCards.vue";
import BookModal from "./BookModal.vue";
import AlertComponent from "./AlertComponent.vue";
const axios = require("axios");
export default {
  name: "BooksList",
  components: {
    BooksCards,
    BookModal,
    AlertComponent,
  },
  data() {
    return {
      count: 0,
      list_books: [],
      receivedData: {},
      modalShow: false,
      spinner: true,
      dataAlert: {},
      toSubmit: "authors",
    };
  },
  methods: {
    increment() {
      this.count++;
    },
    get_book() {
      axios
        .get("http://localhost:3000/api/v1/authors")
        .then((response) => {
          this.count = response.data.length;
          this.list_books = response.data;
          if (!this.list_books.length) {
            this.dataAlert = {
              alert: "warning",
              msg: "No tienes ningun autor agregado",
            };
          }
        })
        .catch((error) => {
          this.dataAlert = {
            alert: "danger",
            msg: error.message,
          };
        });
      this.spinner = false;
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
  },
  mounted() {
    this.get_book();
  },
};
</script>
