<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Apellidos</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(author, index) in authors" :key="index">
        <th scope="row">{{ author.id }}</th>
        <td>{{ author.name }}</td>
        <td>{{ author.lastName }}</td>
        <td>
          <router-link
            :to="{ name: 'autor_editar', params: { id: author.id } }"
            class="btn btn-success m-2"
            >Editar</router-link
          >
          <button
            type="button"
            class="btn btn-danger m-2"
            data-bs-target="#exampleModal"
            @click="sendDataToModal(author)"
          >
            Eliminar
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "AuthorTableList",
  props: {
    authors: {
      type: Array,
    },
  },
  methods: {
    sendDataToModal(author) {
      this.$emit("data-emitted", author);
    },
  },
};
</script>
