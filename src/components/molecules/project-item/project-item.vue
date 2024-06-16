<template>
  <div class="project-item">
    <div class="btn-group">
      <ul class="dropdown-menu dropdown-menu-end">
        <li><button class="dropdown-item" type="button">Editar</button></li>
        <li>
          <button class="dropdown-item" type="button">Remover</button>
        </li>
      </ul>
    </div>
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
