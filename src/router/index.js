import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/login-view.vue';
import Clientes from '@/views/customers-view.vue';
import Projetos from '@/views/projects-view.vue';
import Atividades from '@/views/atividades-page.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/login', component: Login },
  { path: '/clientes', component: Clientes },
  { path: '/projetos', component: Projetos },
  { path: '/atividades', component: Atividades },
  { path: '*', redirect: '/login' }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;