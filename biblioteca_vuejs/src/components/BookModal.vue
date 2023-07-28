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
          <button type="button" class="btn-close"></button>
        </div>
        <div class="modal-body">
          Se eliminara: {{ dataBook.id }} - {{ dataBook.name }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary">Close</button>
          <button @click="submit" type="button" class="btn btn-primary">
            Si, Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// const axios = require("axios");

export default {
  name: "BookModal",
  props: {
    dataBook: {
      type: Object,
    },
  },
  methods: {
    submit() {
      // axios
      //   .delete(`http://localhost:3000/api/v1/books/${this.dataBook.id}`)
      //   .then((response) => {
      //     const msg = `Se borro correctamente el Libro con ID: $(response.data.id)`;
      //     console.log(response, msg);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    },
  },
};
</script>

<style scoped></style>
