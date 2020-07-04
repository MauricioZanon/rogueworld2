import Vue from 'vue'
import Vuex from 'vuex'
import Entidad from '@/entidades/Entidad'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    player: {} as Entidad
  },
  mutations: {
    usarComoPlayer(state, nuevoPlayer: Entidad){
      state.player = nuevoPlayer;
    }
  },
  actions: {
  },
  modules: {
  }
})
