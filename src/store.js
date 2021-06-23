import Vue from "vue";
import Vuex from "vuex";

//VUEX = contenitore condiviso di variabili 
// una cartella che sta sopra tutto

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null
    }
  },
// funzioni che ritornano valori
  getters: { // ritoranano i dati quando li chiediamo
    user(state){
      return state.user
    }
  },
  mutations: { // chiamati quando cambiano
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    }
  },
  actions: { // funzioni che modificano lo stato
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);

      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", null);
      }
    }
  }
});