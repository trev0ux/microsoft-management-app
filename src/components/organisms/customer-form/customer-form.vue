<template>
  <form @submit.prevent="handleCustomerSubmit">
    <custom-input label="Nome" id="name" v-model="name" />
    <custom-input label="Email" id="email" v-model="email" />
    <button class="btn btn-primary" type="submit">Enviar</button>
  </form>
</template>

<script>
import CustomInput from "../../molecules/forms/custom-input.vue";
import { useStore } from "vuex";
import { inject } from "vue";
import { v4 as uuidv4 } from 'uuid';

export default {
  name: "CustomerForm",
  data() {
    return {
      name: "",
      email: "",
    };
  },
  components: {
    CustomInput,
  },
  setup() {
    const store = useStore();
    const modalService = inject("modalService");

    const closeModal = () => {
      modalService.closeModal();
    };

    return {
      store,
      closeModal
    };
  },
  methods: {
    handleCustomerSubmit() {
      let newCustomer = {
        id: uuidv4(),
        name: this.name,
        email: this.email,
        projects: []
      };

      this.store.commit("addCustomer", newCustomer);

      this.clearForm();
      this.closeModal();
    },
    clearForm() {
      this.name = "";
      this.email = "";
    },
  },
};
</script>

<style></style>
