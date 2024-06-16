<template>
  <div class="customer-card">
      <div>
        <div class="customer-card__avatar">{{ initials }}</div>
        <h3>{{ name }}</h3>
      </div>
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
  computed: {
    initials() {
      return this.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
  }
};
</script>

<style lang="sass">
@import "./customer-card"
</style>
