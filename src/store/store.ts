import Vue from "vue"
import Vuex from "vuex"
import Entidad from "@/entidades/Entidad"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    player: {} as Entidad
  },
  getters: {
    player(state): Entidad{
      return state.player;
    }
  },
  mutations: {
    usarComoPlayer(state, nuevoPlayer: Entidad): void{
      state.player = nuevoPlayer;
    }
  },
  actions: {
  },
  modules: {
  }
})
