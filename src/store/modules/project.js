export default {
    namespaced: true,
    mutations: {
      UPDATE_PROJECT_STATUS(state, { project, status }) {
        project.status = status;
      },
      addProjectToCustomer(state, { customerId, project, rootState }) {
        const customer = rootState.customers.find(
          (customer) => customer.id == customerId
        );
        if (customer) {
          customer.projects.push(project);
        } else {
          alert("Não foi possível criar um projeto para esse cliente");
        }
      },
      addTask(state, { projectId, task, rootState }) {
        const customer = rootState.customers.find((customer) =>
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
      addTask({ commit, rootState }, { projectId, task }) {
        commit('addTask', { projectId, task, rootState });
      },
      addProjectToCustomer({ commit, rootState }, { customerId, project }) {
        commit('addProjectToCustomer', { customerId, project, rootState });
      },
    },
    getters: {
      projects: (state, getters, rootState) => rootState.projects,
      getProjectById: (state, getters, rootState) => (projectId) => {
        const customer = rootState.customers.find((customer) =>
          customer.projects.some((project) => project.id == projectId)
        );
        if (!customer) return null;
        return customer.projects.find((project) => project.id == projectId) || null;
      },
      getTasksByProjectId: (state, getters, rootState) => (projectId) => {
        const customer = rootState.customers.find((customer) =>
          customer.projects.some((project) => project.id == projectId)
        );
        if (!customer) return [];
        const project = customer.projects.find(
          (project) => project.id == projectId
        );
        return project ? project.tasks : [];
      },
    },
  };