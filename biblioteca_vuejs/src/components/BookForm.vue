<template>
  <div class="container">
    <div class="row g-0 text-center">
      <h1>
        <h1 class="text-center">{{ computedTitle() }} Libro</h1>
      </h1>
      <div class="col-sm-12 col-md-6">
        <BooksCards :book="computedBook()" />
      </div>
      <form v-on:submit.prevent class="col-md-6">
        <div class="m-4">
          <p>
            <label class="form-label">Nombre del libro</label>
            <input v-model="nombre" class="form-control" />
          </p>
          <p>
            <label class="form-label">Descripcion</label>
            <textarea
              v-model="descripcion"
              class="form-control"
              rows="3"
            ></textarea>
          </p>
          <p>
            <label class="form-label">Autor</label>
            <select
              v-model="autor"
              class="form-select"
              aria-label="Default select example"
            >
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </p>
          <p>
            <label>Precio $</label>
            <input v-model="precio" type="number" class="form-control" />
          </p>
        </div>
        <p class="text-center">
          <button type="submit" class="btn btn-success m-2">
            {{ computedTitle() }}
          </button>
          <router-link class="btn btn-danger m-2" :to="{ name: 'home' }"
            >Cancelar</router-link
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import BooksCards from "./BooksCards.vue";
export default {
  name: "BookForm",
  components: {
    BooksCards,
  },
  data() {
    return {
      id: this.$route.params.id,
      nombre: "",
      descripcion: "",
      autor: "",
      precio: "",
    };
  },
  methods: {
    computedTitle() {
      return !this.id ? "Agregar" : "Editar";
    },
    computedBook() {
      return {
        name: this.nombre,
        description: this.descripcion,
        price: this.precio,
      };
    },
  },
  mounted() {
    this.computedTitle();
    this.computedBook();
  },
};
</script>
