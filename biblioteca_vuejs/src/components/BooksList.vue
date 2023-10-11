<template>
  <div class="container">
    <h1 class="text-center mb-4">Listado de Libros</h1>
    <AlertComponent
      :dataAlert="dataAlert"
      v-if="Object.keys(dataAlert).length !== 0"
    />
    <router-link :to="{ name: 'libro_agregar' }" class="btn btn-info m-2"
      >Agregar</router-link
    >
    <p>Libros totales {{ count }}</p>
    <div v-if="spinner" class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div v-else class="row row-cols-1 row-cols-md-4 g-2">
      <div class="col" v-for="(book, index) in list_books" :key="index">
        <BooksCards
          :book="book"
          :btn="true"
          :dataAutor="book.author"
          :dataGenders="book.genders"
          @data-emitted="receiveDataFromChild"
        />
      </div>
    </div>
  </div>
  <AlertModal
    :dataModal="receivedData"
    :modalShow="modalShow"
    :toSubmit="toSubmit"
    @data-emit-modal="receiveModalShow"
  />
</template>
<script>
import BooksCards from "./BooksCards.vue";
import AlertModal from "./AlertModal.vue";
import AlertComponent from "./AlertComponent.vue";
const axios = require("axios");
export default {
  name: "BooksList",
  components: {
    BooksCards,
    AlertModal,
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
      toSubmit: "books",
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
          this.count = response.data.length;
          this.list_books = response.data;
          console.log(this.list_books);
          if (!this.list_books.length) {
            this.dataAlert = {
              alert: "warning",
              msg: "No tienes ningun libro",
            };
          }
          this.spinner = false;
        })
        .catch((error) => {
          this.dataAlert = {
            alert: "danger",
            msg: error.message,
          };
          this.spinner = false;
        });
    },
    receiveDataFromChild(data) {
      this.receivedData = data; // Asignar los datos recibidos a la variable del componente padre
      this.modalShow = true;
    },
    receiveModalShow(data) {
      console.log("receiveModalShow", data);
      this.modalShow = data.modal;
      this.receivedData = {};
      this.alert = data.msg;
      if (data.response) {
        this.get_book();
        this.dataAlert = {
          alert: "success",
          msg: data.msg,
        };
      }
    },
  },
  mounted() {
    this.get_book();
  },
};
</script>
