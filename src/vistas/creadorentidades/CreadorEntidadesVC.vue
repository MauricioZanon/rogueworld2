<template>
	<div class="container formulario-creador-entidades">
		<button @click="crearNuevaEntidad">Nueva entidad</button>
		<button data-toggle="modal" data-target="#modal-cargar-entidad">Cargar entidad</button>
		<hr />
		<h5>Tipo de entidad</h5>
		<select required v-model.lazy="tipo" name="TiposDeEntidad">
			<option v-for="tipo in tipos" :value="tipo" :key="tipo">{{tipo}}</option>
		</select>
		<hr />
		<NombreCompFormVC @agregar-validacion="agregarValidacion" :nombreComp="nombreComp"></NombreCompFormVC>
		<hr />
		<input type="checkbox" name id v-model="tieneRenderComp" /> Is rendered?
		<div v-if="tieneRenderComp || entidad.renderComp">
			<RenderCompFormVC @agregar-validacion="agregarValidacion" :renderComp="renderComp"></RenderCompFormVC>
		</div>
		<hr />
		<button :disabled="!nuevaEntidadValida" @click="guardarEntidades(entidades, entidad)">Guardar</button>
		<router-link :to="{name: 'MenuPrincipal'}">
			<button >Salir</button>
		</router-link>
		<ModalCargarEntidadVC
			@setEntidad="setEntidad"
			ref="modal-cargar-entidad"
			:entidades="entidades"
		></ModalCargarEntidadVC>
	</div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import RenderComp from "@/entidades/componentes-de-entidades/RenderComp";
import Entidad from "@/entidades/Entidad";
import { Tipos } from "@/entidades/Tipos";
import NombreCompFormVC from "./components/nombreCompFormVC.vue"
import RenderCompFormVC from "./components/renderCompFormVC.vue"
import ModalCargarEntidadVC from "./components/modalCargarEntidadVC.vue"
import NombreComp from "@/entidades/componentes-de-entidades/NombreComp";
import ValidacionComponente from "./ValidacionComponente";
import { obtenerEntidades } from './EntidadRepository';
import { guardarEntidades } from './EntidadRepository';
import { log } from 'util';

@Component({
	components: {
		NombreCompFormVC,
		RenderCompFormVC,
		ModalCargarEntidadVC
	}
})
export default class CreadorEntidadesVC extends Vue {
	public entidades: Entidad[] = [];
	public entidad: Entidad = {} as Entidad;
	public readonly tipos: Tipos[] = [] as Tipos[];
	public tipo: Tipos = null;
	public nombreComp: NombreComp = {} as NombreComp;
	public tieneRenderComp: boolean = false;
	public renderComp: RenderComp = {} as RenderComp;
	public validaciones: Map<string, boolean> = new Map<string, boolean>();
	public nuevaEntidadValida: boolean = false;

	public mounted(): void {
		this.entidades = obtenerEntidades();
		this.tipos.push(Tipos.ACTOR);
		this.tipos.push(Tipos.TERRENO);
		this.tipos.push(Tipos.ITEM);
	}

	public setEntidad(nombre: string): void {
		this.entidad = this.entidades.find(entidad => entidad.nombreComp.nombre === nombre);
	}


	public agregarValidacion(entryValidezComponente: ValidacionComponente): void {
		this.validaciones.set(entryValidezComponente.nombreComponente, entryValidezComponente.componenteValido);
		this.validarEntidad();
	}

	@Watch("tipo")
	public validarEntidad(): void {
		let resultado: boolean = true;
		if(!this.tipo || this.validaciones.size == 0) {
			resultado = false;
		}
		this.validaciones.forEach(compValido => {
			if (!compValido) {
				resultado = false;
			}
		});
		this.nuevaEntidadValida = resultado;
	}

	public crearNuevaEntidad(): void {
		this.entidad = new Entidad();
	}

	@Watch("entidad")
	public cargarDatosDeEntidad(): void {
		this.validaciones.clear();
		this.tipo = this.entidad.tipo;
		this.nombreComp = this.entidad.nombreComp ?? {} as NombreComp;
		this.renderComp = this.entidad.renderComp ?? {} as RenderComp;
	}

}
</script>

<style>
.container {
	display: block;
}
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
}
.selector-de-entidades {
	float: left;
	width: 20%;
}
.inputs-componente {
	float: left;
	width: 100%;
}
</style>