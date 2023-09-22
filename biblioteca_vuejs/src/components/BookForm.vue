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
              <option
                v-for="(autor, index) in autores"
                :key="index"
                :value="autor.id"
              >
                {{ autor.name }} {{ autor.lastName }}
              </option>
            </select>
          </p>
          <p>
            <label>Precio $</label>
            <input v-model="precio" type="number" class="form-control" />
          </p>
        </div>
        <p class="text-center">
          <button @click="submit" type="submit" class="btn btn-success m-2">
            {{ computedTitle() }}
          </button>
          <router-link class="btn btn-danger m-2" :to="{ name: 'libro_lista' }"
            >Cancelar</router-link
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import BooksCards from "./BooksCards.vue";
const axios = require("axios");
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
      autores: [],
      precio: "",
      autor: "",
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
    computedAuthor() {
      axios
        .get(`http://localhost:3000/api/v1/authors/`)
        .then((response) => {
          const dataAuthor = response.data;
          if (!dataAuthor.length) {
            this.$router.push({ name: "autor_lista" });
          }
          this.autores = dataAuthor;
        })
        .catch((error) => {
          console.error(error);
          //Todo Mostrar una Alerta
        });
    },
    fechDetailBook() {
      axios
        .get(`http://localhost:3000/api/v1/books/${this.id}`)
        .then((response) => {
          const data = response.data;
          this.nombre = data.name;
          this.descripcion = data.description;
          this.precio = data.price;
        })
        .catch((error) => {
          console.error(error);
          //Todo Mostrar una Alerta
        });
    },
    async submit() {
      const url = !this.id
        ? "http://localhost:3000/api/v1/books"
        : `http://localhost:3000/api/v1/books/${this.id}`;
      if (!this.id) {
        try {
          const response = await axios.post(url, this.computedBook());
          if (response.request.status === 201) {
            this.$router.push({ name: "libro_lista" }); //Todo mandar el home
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        try {
          const response = await axios.patch(url, this.computedBook());
          if (response.request.status === 200) {
            this.$router.push({ name: "libro_lista" }); //Todo mandar el home
          }
        } catch (e) {
          console.error(e);
        }
      }
    },
  },
  mounted() {
    if (this.id) {
      this.fechDetailBook();
    }
    this.computedTitle();
    this.computedBook();
    this.computedAuthor();
  },
};
</script>
