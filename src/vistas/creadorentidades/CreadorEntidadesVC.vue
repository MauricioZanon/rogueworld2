<template>
	<div class="container formulario-creador-entidades">
		<button @click="crearNuevaEntidad">Nueva entidad</button>
		<button data-toggle="modal" data-target="#modal-cargar-entidad">Cargar entidad</button>
		<hr />
		<TipoFormVC></TipoFormVC>
		<hr />
		<NombreCompFormVC></NombreCompFormVC>
		<hr />
		<RenderCompFormVC></RenderCompFormVC>
		<hr />
		<FlagsFormVC></FlagsFormVC>
		<hr />
		<StatsFormVC></StatsFormVC>
		<hr>
		<button @click="guardarEntidad()">Guardar</button>
		<router-link :to="{name: 'MainScreen'}">
			<button >Salir</button>
		</router-link>
		<ModalCargarEntidadVC ref="modal-cargar-entidad"></ModalCargarEntidadVC>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Entidad from "@/entidades/Entidad";
import NombreCompFormVC from "./components/nombreCompFormVC.vue"
import TipoFormVC from "./components/tipoFormVC.vue"
import StatsFormVC from "./components/statsFormVC.vue"
import RenderCompFormVC from "./components/renderCompFormVC.vue"
import FlagsFormVC from "./components/flagsFormVC.vue"
import ModalCargarEntidadVC from "./components/modalCargarEntidadVC.vue"
import store from "./store/creadorEntidadesStore";
import { persistirEntidades } from "@/entidades/EntidadRepository";

@Component({
	components: {
		TipoFormVC,
		NombreCompFormVC,
		RenderCompFormVC,
		FlagsFormVC,
		ModalCargarEntidadVC,
		StatsFormVC
	}
})
export default class CreadorEntidadesVC extends Vue {

	public mounted(): void {
		this.crearNuevaEntidad();
	}

	public crearNuevaEntidad(): void {
		store.state.entidadSeleccionada = new Entidad();
	}

	public guardarEntidad(): void {
		if(this.esEntidadValida()){
			persistirEntidades();
		} else {
			console.log("entidad invalida");
		}
	}

   public esEntidadValida(): boolean {
      return store.state.tipo && store.state.nombreCompValido && store.state.renderCompValido && store.state.statsCompValido;
    }

}
</script>

<style>
.formulario-creador-entidades {
	text-align: initial;
}
input {
	margin: 3px;
}
label {
	font-weight: bold;
	font-size: 15px;
	text-decoration: underline;
	margin-bottom: 0px;
	display: block;
}
label.checkbox-label {
	text-decoration: none;
	display: inline;
}
</style>