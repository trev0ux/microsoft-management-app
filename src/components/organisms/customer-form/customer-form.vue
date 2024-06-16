<template>
  <form @submit.prevent="handleCustomerSubmit">
    <custom-input class="mb-3" label="Nome" id="name" required v-model="name" />
    <custom-input class="mb-3" label="Email" id="email" v-model="email" />
    <button class="btn btn-primary" type="submit">Enviar</button>
  </form>
</template>

<script>
import CustomInput from "../../molecules/forms/custom-input.vue";
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
  methods: {
    handleCustomerSubmit() {
      let newCustomer = {
        id: uuidv4(),
        name: this.name,
        email: this.email,
        projects: []
      };

      this.$store.dispatch("customerModule/addCustomer", newCustomer);

      this.name = "";
      this.email = "";      
      this.$emit('close-modal');
    },
    clearForm() {

    },
  },
};
</script>

<style></style>
