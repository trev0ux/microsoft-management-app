<template>
  <div class="task-item">
    <div>
      <h3>{{ name }}</h3>
      <h4>
        <span :class="['task-item__status', statusInfo.class]"></span> {{ statusInfo.text }}
      </h4>
      <p>{{ description }}</p>
    </div>
    <custom-select
      label="Status"
      id="status"
      :options="statusOptions"
      v-model="selectedStatus"
      @update:modelValue="updateStatus"
    />
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
  computed: {
    statusInfo() {
      switch (this.status) {
        case "to-do":
          return { class: "task-item__status--to-do", text: "Para fazer" };
        case "active":
          return { class: "task-item__status--active", text: "Em andamento" };
        case "done":
          return { class: "task-item__status--done", text: "Concluído" };
        default:
          return { class: "", text: "" };
      }
    },
  },
  methods: {
    updateStatus(newStatus) {
      this.selectedStatus = newStatus;
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
