import Vue from "vue"
import Vuex from "vuex"
import Entidad from "@/entidades/Entidad"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    player: {} as Entidad,
    cantidadTiles: 25
  },
  getters: {
    player(state): Entidad{
      return state.player;
    },
    cantidadTiles(state): number {
      return state.cantidadTiles;
    }
  },
  mutations: {
    usarComoPlayer(state, nuevoPlayer: Entidad): void{
      state.player = nuevoPlayer;
    },
    aumentarCantidadTiles(state): void {
      switch(state.cantidadTiles) {
        case 13: 
          state.cantidadTiles = 25;
          break;
        case 25: 
          state.cantidadTiles = 35;
          break;
      }
    },
    disminuirCantidadTiles(state): void {
      switch(state.cantidadTiles) {
        case 35: 
          state.cantidadTiles = 25;
          break;
        case 25: 
          state.cantidadTiles = 13;
          break;
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
