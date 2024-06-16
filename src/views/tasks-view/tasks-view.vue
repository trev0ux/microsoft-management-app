<template>
  <section class="tasks">
    <div class="tasks__header">
      <h1>Atividades para o Projeto {{ projectName }}</h1>
      <button @click="openModal" class="btn btn-primary">
        Adicionar atividade
      </button>
    </div>
    <tasks-board
      :tasks="tasks"
      @update-task-status="updateTaskStatus"
      :projectId="projectId"
    />
    <custom-modal>
      <task-form :project-id="projectId" />
    </custom-modal>
  </section>
</template>

<script>
import CustomModal from "@/components/organisms/custom-modal/custom-modal.vue";
import TaskForm from "@/components/organisms/task-form/task-form.vue";
import TasksBoard from "@/components/organisms/tasks-board/tasks-board.vue";
import { inject } from "vue";

export default {
  computed: {
    projectId() {
      return this.$route.params.projectId;
    },
    projectName() {
      const project = this.$store.getters.getProjectById(this.projectId);
      return project ? project.name : "";
    },
  },
  data() {
    return {
        tasks: []
    }
  },
  components: {
    TasksBoard,
    TaskForm,
    CustomModal,
  },
  setup() {
    const modalService = inject("modalService");

    return {
      modalService,
    };
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    openModal() {
      this.modalService.openModal("", "Adicionar tarefa");
    },
    fetchTasks() {
      this.tasks = this.$store.getters.getTasksByProjectId(this.projectId);
    },
    updateTaskStatus({ id, status }) {
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.status = status;
      }
    },
  },
};
</script>

<style lang="sass">
@import "./tasks-view"
</style>
