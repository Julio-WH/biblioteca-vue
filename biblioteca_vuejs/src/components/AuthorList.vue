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
      <AuthorTableList
        :authors="list_authors"
        @data-emitted="receiveDataFromChild"
      />
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
import AlertModal from "./AlertModal.vue";
import AlertComponent from "./AlertComponent.vue";
import AuthorTableList from "@/components/AuthorTableList.vue";
const axios = require("axios");
export default {
  name: "AuthorsList",
  components: {
    AuthorTableList,
    AlertModal,
    AlertComponent,
  },
  data() {
    return {
      count: 0,
      list_authors: [],
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
    get_author() {
      console.log(`${process.env.VUE_APP_ENDPOINT}authors`);
      axios
        .get(`${process.env.VUE_APP_ENDPOINT}authors`)
        .then((response) => {
          this.count = response.data.length;
          this.list_authors = response.data;
          if (!this.list_authors.length) {
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
        this.get_author();
      }
    },
  },
  mounted() {
    this.get_author();
  },
};
</script>
