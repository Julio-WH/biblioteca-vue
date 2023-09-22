<template>
  <div :class="typeAlert" role="alert">
    <strong>{{ dataAlert.msg }}</strong>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
</template>

<script>
export default {
  name: "AlertComponent",
  props: {
    dataAlert: {
      type: Object,
    },
  },
  computed: {
    typeAlert() {
      return `alert alert-${this.dataAlert.alert} alert-dismissible fade show`;
    },
  },
};
</script>
