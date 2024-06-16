import { createMemoryHistory, createRouter } from "vue-router";
import Login from "@/views/login-view.vue";
import Clientes from "@/views/customer-view/customers-view.vue";
import Projetos from "@/views/projects-view/projects-view.vue";
import Atividades from "@/views/tasks-view/tasks-view.vue";

const routes = [
  { path: "/login", component: Login },
  { path: "/clientes", component: Clientes },
  { path: "/", component: Projetos },
  { path: "/:projectId/atividades", name: "Atividades", component: Atividades },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
