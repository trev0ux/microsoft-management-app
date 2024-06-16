import { createStore } from "vuex";
import data from "../../data.json";

const store = createStore({
  state: {
    customers: data.customers,
    projects: data.projects,
    tasks: data.tasks,
    usuarios: data.usuarios,
    usuario: null,
  },
  mutations: {
    addProjectToCustomer(state, { customerId, project }) {
      const customer = state.customers.find(
        (customer) => customer.id == customerId
      );
      if (customer) {
        return customer.projects.push(project);
      } else {
        alert("Não foi possível criar um projeto para esse cliente");
      }
    },
    updateTaskStatus(state, { projectId, taskId, status }) {
      const customer = state.customers.find((customer) =>
        customer.projects.some((project) => project.id == projectId)
      );
      if (!customer) return;

      const project = customer.projects.find(
        (project) => project.id == projectId
      );
      if (!project) return;

      const task = project.tasks.find((task) => task.id == taskId);
      if (task) {
        task.status = status;
      }

      const activeTask = project.tasks.some((task) => task.status == "active");
      const allTasksDone = project.tasks.every(
        (task) => task.status === "done"
      );

      if (activeTask) {
        project.status = "Em andamento";
      } else if (allTasksDone) {
        project.status = "Concluída";
      } else {
        project.status = "Para Fazer";
      }
    },
    addCustomer(state, customer) {
      state.customers.push(customer);
    },
    addTask(state, { projectId, task }) {
      task.projectId = projectId;
      state.tasks.push(task);
      const customer = state.customers.find((customer) =>
        customer.projects.some((project) => project.id == projectId)
      );
      if (!customer) return [];

      const project = customer.projects.find(
        (project) => project.id == projectId
      );      
      
      if (project) {
        project.tasks.push(task);
      } else {
        alert("Não foi possível criar uma task para esse projeto");
      }
    },
  },
  actions: {
    addTask({ commit }, { projectId, task }) {
      commit("addTask", { projectId, task });
    },
    addCustomer({ commit }, customer) {
      commit("addCustomer", customer);
    },
    addProjectToCustomer({ commit }, { customerId, project }) {
      commit("addProjectToCustomer", { customerId, project });
    },
    autenticarUsuario({ commit }, { email, senha }) {
      const usuario = data.usuarios.find(
        (u) => u.email === email && u.senha === senha
      );
      if (usuario) {
        commit("setUsuario", usuario);
        return true;
      }
      return false;
    },
    updateTaskStatus({ commit }, payload) {
      commit("updateTaskStatus", payload);
    },
  },
  getters: {
    customers: (state) => state.customers,
    getCustomerById: (state) => (customerId) => {
      return state.customers.find((customer) => customer.id == customerId);
    },
    projects: (state) => state.projects,
    getProjectById: (state) => (projectId) => {
      const customer = state.customers.find((customer) =>
        customer.projects.some((project) => project.id == projectId)
      );
      if (!customer) return [];

      const project = customer.projects.find(
        (project) => project.id == projectId
      );

      return project ? project : [];
    },
    getTasksByProjectId: (state) => (projectId) => {
      const customer = state.customers.find((customer) =>
        customer.projects.some((project) => project.id == projectId)
      );
      if (!customer) return [];

      const project = customer.projects.find(
        (project) => project.id == projectId
      );

      return project ? project.tasks : [];
    },
    getProjectsByCustomerId: (state) => (projectId) => {
      const project = state.projects.find((project) => project.id == projectId);
      if (project) {
        return project.tasks;
      } else {
        alert("Não existem projetos para esse cliente");
      }
    },
  },
});

export default store;
