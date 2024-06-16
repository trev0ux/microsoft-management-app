<template>
  <form @submit.prevent="handleProjectSubmit">
    <custom-input label="Nome" id="name" v-model="name" />
    <custom-select
      label="Cliente"
      id="customer"
      :options="populateCustomers"
      v-model="customer"
    ></custom-select>
    <label class="form-label" for="description">Descrição</label>
    <textarea
      class="form-control"
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
import { useStore } from "vuex";
import { inject } from "vue";
import { v4 as uuidv4 } from 'uuid';


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
      return this.store.getters.customers.map(customer => ({
        value: customer.id,
        label: customer.name
      }));
    }
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
    handleProjectSubmit() {
      let newProject = {
        id: uuidv4(),
        name: this.name,
        customer: this.customer,
        description: this.description,
        status: "Nova",
        tasks: []
      };

      this.store.dispatch("addProjectToCustomer", {
        customerId: this.customer,
        project: newProject
      });

      this.clearForm();
      this.closeModal();
    },
    clearForm() {
      this.name = "";
      this.email = "";
      this.description = "";
    },
  },
};
</script>

<style></style>
