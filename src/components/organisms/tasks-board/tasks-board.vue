<template>
  <div class="tasks-board">
    <ul>
      <h2>Para Fazer</h2>
      <li v-for="task in tasksToDo" :key="task.id">
        <task-item
          :projectId="projectId"
          :id="task.id"
          :name="task.name"
          :description="task.description"
          :status="task.status"
        ></task-item>
      </li>
    </ul>
    <ul>
      <h2>Em andamento</h2>
      <li v-for="task in tasksInProgress" :key="task.id">
        <task-item
          :projectId="projectId"
          :id="task.id"
          :name="task.name"
          :description="task.description"
          :status="task.status"
        ></task-item>
      </li>
    </ul>
    <ul>
      <h2>Feita</h2>
      <li v-for="task in tasksDone" :key="task.id">
        <task-item
          :projectId="projectId"
          :id="task.id"
          :name="task.name"
          :description="task.description"
          :status="task.status"
        ></task-item>
      </li>
    </ul>
  </div>
</template>

<script>
import TaskItem from "../../molecules/task-item/task-item";

export default {
  props: {
    projectId: {
      type: String,
      required: true,
    },
    tasks: {
      type: Array,
      required: false,
    },
  },
  components: {
    TaskItem,
  },
  computed: {
    tasksToDo() {
      return this.tasks.filter((task) => task.status === "to-do");
    },
    tasksInProgress() {
      return this.tasks.filter((task) => task.status === "active");
    },
    tasksDone() {
      return this.tasks.filter((task) => task.status === "done");
    },
  },
};
</script>

<style lang="sass">
@import "./tasks-board"
</style>
