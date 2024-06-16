<template>
  <form @submit.prevent="handleTaskSubmit">
    <custom-input label="Name" id="name" v-model="name" />
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
import CustomInput from "../../molecules/forms/custom-input.vue";
import { useStore } from "vuex";
import { inject } from "vue";
import { v4 as uuidv4 } from "uuid";

export default {
  components: { CustomInput },
  data() {
    return {
      name: "",
      description: "",
    };
  },
  props: {
    projectId: {
      type: String,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const modalService = inject("modalService");

    const closeModal = () => {
      modalService.closeModal();
    };

    return {
      store,
      closeModal,
    };
  },
  methods: {
    handleTaskSubmit() {
      let newTask = {
        id: uuidv4(),
        name: this.name,
        description: this.description,
        status: "to-do",
      };

      this.$store.dispatch("addTask", {
        projectId: this.projectId,
        task: newTask,
      });

      this.clearForm();
      this.closeModal();
    },
    clearForm() {
      this.name = "";
      this.description = "";
    },
  },
};
</script>

<style></style>
