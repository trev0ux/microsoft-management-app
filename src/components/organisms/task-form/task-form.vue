<template>
  <form @submit.prevent="handleTaskSubmit">
    <custom-input label="Name" id="name" v-model="name" required class="mb-3" />
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
import CustomInput from "../../molecules/forms/custom-input.vue";
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
  methods: {
    handleTaskSubmit() {
      let newTask = {
        id: uuidv4(),
        name: this.name,
        description: this.description,
        status: "to-do",
      };

      this.$store.dispatch("projectModule/addTask", {
        projectId: this.projectId,
        task: newTask,
      });

      this.$emit("close-modal");

      this.name = "";
      this.description = "";   
    },
  },
};
</script>

<style></style>
