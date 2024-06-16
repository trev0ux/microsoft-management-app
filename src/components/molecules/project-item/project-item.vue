<template>
  <div class="project-item">
    <div>
      <h3>{{ name }}</h3>
      <h4><span :class="statusClass"></span> {{ status }}</h4>
    </div>
    <aside class="d-flex align-items-center gap-3">
      <span class="project-item__avatar">{{ initials }}</span>
      <h5 class="project-item__customer">{{ customer }}</h5>
    </aside>
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
  computed: {
    initials() {
      const words = this.customer.split(" ");
      if (words.length === 1) {
        return words[0][0].toUpperCase();
      }
      return words
        .map((word) => word[0])
        .join("")
        .toUpperCase();
    },
    statusClass() {
      switch (this.status) {
        case "Em andamento":
          return "project-item__status project-item__status--active";
        case "Concluída":
          return "project-item__status project-item__status--completed";
        case "Para Fazer":
          return "project-item__status project-item__status--todo";
        default:
          return "project-item__status";
      }
    },
  },
};
</script>

<style lang="sass">
@import "./project-item"
</style>
