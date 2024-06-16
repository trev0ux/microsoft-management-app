import { createStore } from "vuex";
import data from "../../data.json";

const taskModule = {
  namespaced: true,
  actions: {
    updateTaskStatus({ commit, rootState }, { projectId, taskId, status }) {
      const customer = rootState.customers.find((customer) =>
        customer.projects.some((project) => project.id == projectId)
      );
      
      if (!customer) return;

      const project = customer.projects.find(
        (project) => project.id == projectId
      );

      if (!project) return;

      const task = project.tasks.find((task) => task.id == taskId);
      if (task) {
        commit('UPDATE_TASK_STATUS', { task, status }, { root: true });
      }

      const activeTask = project.tasks.some((task) => task.status == "active");
      const allTasksDone = project.tasks.every(
        (task) => task.status === "done"
      );

      let newStatus;
      if (activeTask) {
        newStatus = "Em andamento";
      } else if (allTasksDone) {
        newStatus = "Concluída";
      } else {
        newStatus = "Para Fazer";
      }

      commit('UPDATE_PROJECT_STATUS', { project, status: newStatus }, { root: true });
    },
  },
};

const store = createStore({
  state: {
    customers: data.customers,
    projects: data.projects,
    tasks: data.tasks,
    usuarios: data.usuarios,
    usuario: null,
  },
  mutations: {
    UPDATE_TASK_STATUS(state, { task, status }) {
      task.status = status;
    },
    UPDATE_PROJECT_STATUS(state, { project, status }) {
      project.status = status;
    },
    addProjectToCustomer(state, { customerId, project }) {
      const customer = state.customers.find(
        (customer) => customer.id == customerId
      );
      if (customer) {
        customer.projects.push(project);
      } else {
        alert("Não foi possível criar um projeto para esse cliente");
      }
    },
    addCustomer(state, customer) {
      state.customers.push(customer);
    },
    addTask(state, { projectId, task }) {
      const customer = state.customers.find((customer) =>
        customer.projects.some((project) => project.id == projectId)
      );
      if (!customer) return;

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
    }
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
      if (!customer) return null;

      return customer.projects.find((project) => project.id == projectId) || null;
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
  },
  modules: {
    taskModule
  }
});

export default store;