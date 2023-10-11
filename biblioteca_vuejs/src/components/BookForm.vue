<template>
  <div class="container">
    <div class="row g-0 text-center">
      <h1>
        <h1 class="text-center">{{ computedTitle() }} Libro</h1>
      </h1>
      <div class="col-sm-12 col-md-6">
        <BooksCards
          :book="computedBook()"
          :dataAutor="dataAutor"
          :dataGenders="data_genders"
        />
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
              @change="getAuthorData"
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
            <label class="form-label">Genero</label>
            <select
              v-model="gender"
              multiple
              class="form-select"
              aria-label="Default select example"
              @change="getGenderData"
            >
              <option
                v-for="(gender, index) in genders_list"
                :key="index"
                :value="gender.id"
              >
                {{ gender.name }}
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
      genders_list: [],
      data_genders: [],
      precio: "",
      autor: "",
      dataAutor: "",
      gender: [],
    };
  },
  methods: {
    computedTitle() {
      return !this.id ? "Agregar" : "Editar";
    },
    computedBook() {
      const data_book = {
        name: this.nombre,
        description: this.descripcion,
        price: this.precio,
        authorId: this.autor,
      };
      if (this.gender.length) {
        data_book.genders = this.gender;
      }
      console.log(data_book);
      return data_book;
    },
    getAuthorData() {
      const autorSeleccionado = this.autores.find(
        (autor) => autor.id === this.autor
      );
      this.dataAutor = autorSeleccionado;
    },
    getGenderData() {
      this.data_genders = [];
      this.gender.forEach((elemento) => {
        const generoSeleccionado = this.genders_list.find(
          (genero) => genero.id === elemento
        );
        this.data_genders.push(generoSeleccionado);
      });
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
    computedGender() {
      axios
        .get(`http://localhost:3000/api/v1/genders/`)
        .then((response) => {
          const dataGender = response.data;
          if (!dataGender.length) {
            this.$router.push({ name: "libro_lista" });
          }
          this.genders_list = dataGender;
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
          console.log(data);
          if (data.genders.length) {
            data.genders.forEach((elemento) => {
              this.gender.push(elemento.id);
              this.data_genders = data.genders;
            });
          }
          this.nombre = data.name;
          this.descripcion = data.description;
          this.precio = data.price;
          this.autor = data.authorId;
          this.dataAutor = data.author;
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
    this.computedGender();
  },
};
</script>
