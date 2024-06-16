export default {
    namespaced: true,
    mutations: {
      addCustomer(state, { rootState, customer}) {
        rootState.customers.push(customer);
      },
    },
    actions: {
      addCustomer({ commit, rootState }, customer) {
        commit('addCustomer', {customer, rootState});
      },
    },
    getters: {
      customers: (state, getters, rootState) => rootState.customers,
      getCustomerById: (state) => (customerId) => {
        return state.customers.find((customer) => customer.id == customerId);
      },
    },
  };