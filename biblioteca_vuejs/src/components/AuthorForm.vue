<template>
  <div class="container">
    <div class="row g-0 text-center">
      <h1>
        <h1 class="text-center">{{ computedTitle() }} Autor</h1>
      </h1>
      <form v-on:submit.prevent class="col-md-12">
        <div class="m-4">
          <p>
            <label class="form-label">Nombre</label>
            <input v-model="nombre" class="form-control" />
          </p>
          <p>
            <label class="form-label">Apellidos</label>
            <input v-model="apellidos" class="form-control" />
          </p>
        </div>
        <p class="text-center">
          <button @click="submit" type="submit" class="btn btn-success m-2">
            {{ computedTitle() }}
          </button>
          <router-link class="btn btn-danger m-2" :to="{ name: 'autor_lista' }"
            >Cancelar</router-link
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "BookForm",
  components: {},
  data() {
    return {
      id: this.$route.params.id,
      nombre: "",
      apellidos: "",
    };
  },
  methods: {
    computedTitle() {
      return !this.id ? "Agregar" : "Editar";
    },
    computedAuthor() {
      return {
        name: this.nombre,
        lastName: this.apellidos,
      };
    },
    fechDetailBook() {
      axios
        .get(`http://localhost:3000/api/v1/authors/${this.id}`)
        .then((response) => {
          const data = response.data;
          console.log(data);
          this.nombre = data.name;
          this.apellidos = data.lastName;
        })
        .catch((error) => {
          console.error(error);
          //Todo Mostrar una Alerta
        });
    },
    async submit() {
      const url = !this.id
        ? "http://localhost:3000/api/v1/authors/"
        : `http://localhost:3000/api/v1/authors/${this.id}`;
      if (!this.id) {
        try {
          const response = await axios.post(url, this.computedAuthor());
          if (response.request.status === 201) {
            this.$router.push({ name: "autor_lista" }); //Todo mandar el home
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        try {
          const response = await axios.patch(url, this.computedAuthor());
          if (response.request.status === 200) {
            this.$router.push({ name: "autor_lista" }); //Todo mandar el home
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
    this.computedAuthor();
  },
};
</script>
