<template>
  <div class="customer-card">
    <h3>{{ name }}</h3>
    <p>{{ email }}</p>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="sass">
@import "./customer-card"
</style>
