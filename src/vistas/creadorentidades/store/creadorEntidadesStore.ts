import Vue from "vue"
import Vuex from "vuex"
import Entidad from "@/entidades/Entidad"
import NombreComp from "@/entidades/componentes-de-entidades/NombreComp"
import { Tipo } from "@/entidades/Tipos"
import RenderComp from "@/entidades/componentes-de-entidades/RenderComp";
import StatsComp from "@/entidades/componentes-de-entidades/StatsComp"
import { Flag } from "../../../entidades/Flags";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    entidadSeleccionada: {} as Entidad,
    tipo: null as Tipo,
    entidades: [] as Entidad[],
    nombreComp: {} as NombreComp,
    nombreCompValido: false,
    renderComp: {} as RenderComp,
    renderCompValido: true,
    statsComp: {} as StatsComp,
    statsCompValido: true,
    flags: new Set<Flag>()
  },
  mutations: {
    seleccionarEntidad(state, nombre: string): void {
        const entidad: Entidad = state.entidades.find(entidad => entidad.nombreComp.nombre === nombre);
        state.entidadSeleccionada = entidad;

        state.tipo = entidad.tipo;
        state.nombreComp = entidad.nombreComp || {} as NombreComp;  
        state.renderComp = entidad.renderComp || {} as RenderComp;
        state.statsComp = entidad.statsComp ||  {} as StatsComp;
        state.flags = entidad.flags;
    }
  },
  actions: {
  },
  modules: {
  }
})
