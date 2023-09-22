<template>
  <div class="card" style="max-width: 600px">
    <img
      src="https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder-300x300.png"
      class="card-img-top"
      alt="img"
    />
    <div class="card-body">
      <h5 class="card-title">{{ book.name }}</h5>
      <p class="card-text">
        {{ book.description }}
      </p>
      <p v-if="book.price" class="card-text">
        Precio $
        {{ book.price }}
      </p>
      <p v-if="btn" class="text-center">
        <router-link
          :to="{ name: 'libro_editar', params: { id: book.id } }"
          class="btn btn-success m-2"
          >Editar</router-link
        >
        <button
          type="button"
          class="btn btn-danger m-2"
          data-bs-target="#exampleModal"
          @click="sendDataToModal"
        >
          Eliminar
        </button>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "BooksCards",
  props: {
    book: {
      type: Object,
    },
    btn: Boolean,
  },
  methods: {
    sendDataToModal() {
      this.$emit("data-emitted", this.book);
    },
  },
};
</script>
