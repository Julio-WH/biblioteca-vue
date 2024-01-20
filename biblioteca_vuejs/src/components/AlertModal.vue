<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Eliminar</h1>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          Se eliminara: {{ dataModal.id }} - {{ dataModal.name }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Close
          </button>
          <button @click="submit" type="button" class="btn btn-primary">
            Si, Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import { Modal } from "bootstrap";

export default {
  name: "AlertModal",
  props: {
    dataModal: {
      type: Object,
    },
    modalShow: Boolean,
    toSubmit: String,
  },
  methods: {
    submit() {
      axios
        .delete(
          `${process.env.VUE_APP_ENDPOINT}${this.toSubmit}/${this.dataModal.id}`
        )
        .then((response) => {
          const msg = `Se borro correctamente el ${
            this.toSubmit === "books" ? "Libro" : "Autor"
          }: ${this.dataModal.name}`;
          const data = {
            type: "delete",
            msg: msg,
            modal: false,
            response: response,
          };
          this.$emit("data-emit-modal", data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    closeModal() {
      const data = {
        modal: false,
      };
      this.$emit("data-emit-modal", data);
    },
  },
  mounted() {
    const myModalEl = document.getElementById("exampleModal");
    this.myModalAlternative = new Modal(myModalEl);
  },
  watch: {
    modalShow: function (newModalShow) {
      if (newModalShow) {
        this.myModalAlternative.show();
      } else {
        this.myModalAlternative.hide();
      }
    },
  },
};
</script>

<style scoped></style>
