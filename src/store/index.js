import Vue from 'vue';
import Vuex from 'vuex';
import data from '../data.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clientes: data.clientes,
    projetos: data.projetos,
    atividades: data.atividades,
    usuarios: data.usuarios,
    usuario: null
  },
  mutations: {
    setClientes(state, clientes) {
      state.clientes = clientes;
    },
    setProjetos(state, projetos) {
      state.projetos = projetos;
    },
    setAtividades(state, atividades) {
      state.atividades = atividades;
    },
    setUsuarios(state, usuarios) {
      state.usuarios = usuarios;
    },
    setUsuario(state, usuario) {
      state.usuario = usuario;
    },
    adicionarUsuario(state, usuario) {
      state.usuarios.push(usuario);
    },
    atualizarUsuario(state, usuarioAtualizado) {
      const index = state.usuarios.findIndex(u => u.id === usuarioAtualizado.id);
      if (index !== -1) {
        Vue.set(state.usuarios, index, usuarioAtualizado);
      }
    },
    removerUsuario(state, usuarioId) {
      state.usuarios = state.usuarios.filter(u => u.id !== usuarioId);
    }
  },
  actions: {
    fetchClientes({ commit }) {
      commit('setClientes', data.clientes);
    },
    fetchProjetos({ commit }) {
      commit('setProjetos', data.projetos);
    },
    fetchAtividades({ commit }) {
      commit('setAtividades', data.atividades);
    },
    fetchUsuarios({ commit }) {
      commit('setUsuarios', data.usuarios);
    },
    cadastrarUsuario({ commit }, usuario) {
      commit('adicionarUsuario', usuario);
    },
    atualizarUsuario({ commit }, usuario) {
      const index = data.usuarios.findIndex(u => u.id === usuario.id);
      if (index !== -1) {
        Vue.set(data.usuarios, index, usuario);
        commit('setUsuarios', data.usuarios);
      }
    },
    removerUsuario({ commit }, usuarioId) {
      data.usuarios = data.usuarios.filter(u => u.id !== usuarioId);
      commit('setUsuarios', data.usuarios);
    },
    autenticarUsuario({ commit }, { email, senha }) {
      const usuario = data.usuarios.find(u => u.email === email && u.senha === senha);
      if (usuario) {
        commit('setUsuario', usuario);
        return true;
      }
      return false;
    },
    alterarSenha({ commit }, { usuarioId, novaSenha }) {
      const usuario = data.usuarios.find(u => u.id === usuarioId);
      if (usuario) {
        usuario.senha = novaSenha;
        commit('atualizarUsuario', usuario);
      }
    },
    definirPermissao({ commit }, { usuarioId, novaRole }) {
      const usuario = data.usuarios.find(u => u.id === usuarioId);
      if (usuario) {
        usuario.role = novaRole;
        commit('atualizarUsuario', usuario);
      }
    }
  }
});
