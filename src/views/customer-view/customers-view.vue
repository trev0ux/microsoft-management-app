<template>
  <section class="customers">
    <div class="container">
      <div class="customers__header">
        <h1>Clientes</h1>
        <button @click="openModal" class="btn btn-primary">
          Adicionar cliente
        </button>
      </div>
      <article class="customers__customer-list">
          <customer-card v-for="(item, index) in customers" :key="index" :name="item.name" :email="item.email"></customer-card>
      </article>
    </div>
    <custom-modal>
      <template #header>Adicionar cliente</template>
      <customer-form @close-modal="closeModal" />
    </custom-modal>
  </section>
</template>

<script>
import customModal from "@/components/organisms/custom-modal/custom-modal.vue";
import customerForm from "@/components/organisms/customer-form/customer-form.vue";
import customerCard from "@/components/molecules/customer-card/customer-card.vue";
import { inject } from "vue";

export default {
  name: "CustomerView",
  components: {
    customModal,
    customerForm,
    customerCard
  },
  computed: {
    customers() {
      return this.$store.getters["customerModule/customers"];
    }
  },
  setup() {
    const modalService = inject("modalService");

    return {
      modalService,
    };
  },
  methods: {
    openModal() {
      this.modalService.openModal("Adicionar clientes");
    },
    closeModal() {
      this.modalService.closeModal();
    },
  },
};
</script>

<style lang="scss">
@import "./customers-view.scss";
</style>
