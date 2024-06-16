<template>
  <div class="task-item">
    <div>
      <h3>{{ name }}</h3>
      <h4><span></span> {{ status }}</h4>
      <custom-select
        label="Status"
        id="status"
        :options="statusOptions"
        v-model="selectedStatus"
        @update:modelValue="updateStatus"
      />
    </div>
    <h5>{{ description }}</h5>
  </div>
</template>

<script>
import CustomSelect from "../../molecules/forms/custom-select.vue";

export default {
  components: {
    CustomSelect,
  },
  data() {
    return {
      selectedStatus: "",
      statusOptions: [
        { value: "to-do", label: "Para fazer" },
        { value: "active", label: "Em andamento" },
        { value: "done", label: "Concluída" },
      ],
    };
  },
  props: {
    projectId: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateStatus(newStatus) {
      this.$store.dispatch("taskModule/updateTaskStatus", {
        projectId: this.projectId,
        taskId: this.id,
        status: newStatus,
      });
    },
  },
};
</script>

<style lang="sass">
@import "./task-item"
</style>
