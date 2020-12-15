import Vue from "vue"
import Vuex from "vuex"
import Entidad from "@/entidades/Entidad"
import NombreComp from "@/entidades/componentes-de-entidades/NombreComp"
import { Tipo } from "@/entidades/Tipos"
import RenderComp from "@/entidades/componentes-de-entidades/RenderComp";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    entidadSeleccionada: {} as Entidad,
    tipo: null as Tipo,
    entidades: [] as Entidad[],
    nombreComp: {} as NombreComp,
    nombreCompValido: false,
    renderComp: {} as RenderComp,
    renderCompValido: false,
    esIntransitable: false
  },
  getters: {
    entidadSeleccionada(state): Entidad{
      return state.entidadSeleccionada;
    }
  },
  mutations: {
    seleccionarEntidad(state, nombre: string): void {
        const entidad: Entidad = state.entidades.find(entidad => entidad.nombreComp.nombre === nombre);
        state.entidadSeleccionada = entidad;

        state.tipo = entidad.tipo;
        state.nombreComp = entidad.nombreComp;  
        state.renderComp = entidad.renderComp;
        state.esIntransitable = entidad.esIntransitable || false;
    }
  },
  actions: {
  },
  modules: {
  }
})
