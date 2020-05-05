import Vue from 'vue';
import Vuex from 'vuex';
import fire from '@/firebase';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  // plugins: [createPersistedState()],

  state: {
    user: undefined,
    todos: []
  },
  mutations: {
    setTodoItemsList(state, items) {
      state.todos = items;
    },
    addTodoItem(state, item) {
      // mutate state
      state.todos.push(item);
    },
    loginSuccess(state, user) {
      // mutate state
      state.user = user;
    },
    removeTodoItem(state, itemId) {
      state.todos = state.todos.filter(i => i.id !== itemId)
    },
  },
  actions: {
    setTodoItemsList(context, items) {
      context.commit('setTodoItemsList', items);
    },
    addTodoItem(context, item) {
      context.commit('addTodoItem', item);
    },
    loginSuccess(context, user) {
      context.commit('loginSuccess', user);
    },
    removeTodoItem(context, itemId) {
      context.commit('removeTodoItem', itemId);
    }
  },
  modules: {},

  getters: {
    getItemsSorterByAddding: (state) => {
      return state.todos.sort((left, right) => right.date - left.date);
    },
    currentUser: (state) => {
      return state.user;
    },
  }
});

export default store;
