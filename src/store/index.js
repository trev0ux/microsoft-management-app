import { createStore } from 'vuex';
import data from '../../data.json';
import taskModule from './modules/task';
import customerModule from './modules/customer';
import projectModule from './modules/project';

const store = createStore({
  state: {
    customers: data.customers,
    projects: data.projects,
    tasks: data.tasks,
    usuarios: data.usuarios,
    usuario: null,
  },
  modules: {
    taskModule,
    customerModule,
    projectModule,
  },
  mutations: {
    UPDATE_TASK_STATUS(state, { task, status }) {
      task.status = status;
    },
    UPDATE_PROJECT_STATUS(state, { project, status }) {
      project.status = status;
    },
  },
});

export default store;