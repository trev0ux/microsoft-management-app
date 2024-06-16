<template>
  <div class="project-item">
    <div>
      <h3>{{ name }}</h3>
      <h4><span></span> {{ status }}</h4>
    </div>
    <h5>{{ customer }}</h5>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
    },
    customer: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="sass">
@import "./project-item"
</style>
