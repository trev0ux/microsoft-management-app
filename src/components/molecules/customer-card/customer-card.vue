<template>
  <div class="customer-card">
    <h3>{{ name }}</h3>
    <div>
      <button class="btn btn-link">Editar</button>
      <button class="btn btn-link">Deletar</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="sass">
@import "./customer-card"
</style>
