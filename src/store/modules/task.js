export default {
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