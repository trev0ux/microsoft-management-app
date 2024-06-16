<template>
  <form @submit.prevent="handleProjectSubmit">
    <custom-input label="Nome" required id="name" v-model="name" class="mb-3"/>
    <custom-select
      class="mb-3"
      required
      label="Cliente"
      id="customer"
      :options="populateCustomers"
      v-model="customer"
    ></custom-select>
    <label class="form-label" for="description">Descrição</label>
    <textarea
      class="form-control mb-3"
      id="description"
      rows="2"
      v-model="description"
    />

    <button class="btn btn-primary" type="submit">Enviar</button>
  </form>
</template>

<script>
import CustomSelect from "../../molecules/forms/custom-select.vue";
import CustomInput from "../../molecules/forms/custom-input.vue";
import { v4 as uuidv4 } from "uuid";

export default {
  components: { CustomSelect, CustomInput },
  data() {
    return {
      name: "",
      customer: "",
      description: "",
    };
  },
  computed: {
    populateCustomers() {
        const customers = this.$store.getters['customerModule/customers'];
      return customers.map(customer => ({
        value: customer.id,
        label: customer.name
      }));
    },
  },
  methods: {
    handleProjectSubmit() {
      let newProject = {
        id: uuidv4(),
        name: this.name,
        customer: this.customer,
        description: this.description,
        status: "Nova",
        tasks: [],
      };

      this.$store.dispatch("projectModule/addProjectToCustomer", {
        customerId: this.customer,
        project: newProject,
      });

      this.name = "";
      this.email = "";
      this.description = "";      
      this.$emit('close-modal');
    },
  },
};
</script>

<style></style>
