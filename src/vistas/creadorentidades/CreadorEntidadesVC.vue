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
		<NombreCompFormVC @agregarValidacion="agregarValidacion" :nombreComp="nombreComp"></NombreCompFormVC>
		<hr />
		<input type="checkbox" name id v-model="tieneRenderComp" /> Is rendered?
		<div v-if="tieneRenderComp || entidad.renderComp">
			<RenderCompFormVC :renderComp="renderComp"></RenderCompFormVC>
		</div>
		<hr />
		<button class="boton-guardar" @click="guardarEntidades">Guardar</button>
		<router-link :to="{name: 'MenuPrincipal'}">
			<button class="boton-salir">Salir</button>
		</router-link>
		<ModalCargarEntidadVC
			@cargarEntidad="cargarEntidad"
			ref="modal-cargar-entidad"
			:entidades="entidades"
		></ModalCargarEntidadVC>
	</div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import RenderComp from "@/entities/componentes-de-entidades/RenderComp";
import Entidad from "@/entities/Entidad";
import { Tipos } from "@/entities/Tipos";
import NombreCompFormVC from "./components/nombreCompFormVC.vue"
import RenderCompFormVC from "./components/renderCompFormVC.vue"
import ModalCargarEntidadVC from "./components/modalCargarEntidadVC.vue"
import NombreComp from "@/entities/componentes-de-entidades/NombreComp";
import ValidacionComponente from "./ValidacionComponente";

const pathArchivoEntidades = "./src/assets/entidades.json";
const fs = window.require("electron").remote.require("fs");

@Component({
	components: {
		NombreCompFormVC,
		RenderCompFormVC,
		ModalCargarEntidadVC
	}
})
export default class CreadorEntidadesVC extends Vue {
	entidades: Entidad[] = [];
	entidad: Entidad = {} as Entidad;
	tipos = [] as Tipos[];
	tipo: Tipos = null;
	nombreComp: NombreComp = {} as NombreComp;
	tieneRenderComp = false;
	renderComp: RenderComp = {} as RenderComp;
	validaciones = new Map<string, boolean>();

	mounted(): void {
		this.cargarEntidades();
		this.tipos.push(Tipos.ACTOR);
		this.tipos.push(Tipos.TERRENO);
		this.tipos.push(Tipos.ITEM);
	}

	agregarValidacion(entryValidezComponente: ValidacionComponente): void {
		this.validaciones[entryValidezComponente.nombreComponente] = entryValidezComponente.componenteValido;
	}

	cargarEntidad(nombre: string): void {
		this.entidad = this.entidades.find(entidad => entidad.nombreComp.nombre === nombre);
	}

	cargarEntidades(): void {
		fs.readFile(pathArchivoEntidades, (err, data) => {
			if (err) {
				console.log("Error al cargar las entidades");
			} else {
				this.entidades = JSON.parse(data);
			}
		});
	}

	guardarEntidades(): void {
		if (this.entidadValida()) {
			if (this.entidad.id >= 0) {
				this.sobreescribirEntidadEnLista();
			}
			else {
				this.agregarNuevaEntidadALaLista();
			}
			fs.writeFileSync(pathArchivoEntidades, JSON.stringify(this.entidades), err => {
				if (err) {
					console.log("Error al guardar las entidades");
				} else {
					console.log("Entidades guardadas correctamente")
				}
			});
		}
	}

	sobreescribirEntidadEnLista(): void {
		for (let i = 0; i < this.entidades.length; i++) {
			if (this.entidades[i].id == this.entidad.id) {
				this.entidades[i] = this.entidad;
				return;
			}
		}
	}

	agregarNuevaEntidadALaLista(): void {
		this.entidad.id = this.buscarIdSinUsar();
		this.entidades.push(this.entidad);
	}

	buscarIdSinUsar(): number {
		const ids = this.entidades.map(entidad => entidad.id);
		let nuevoId = 1;
		while (ids.includes(nuevoId)) {
			nuevoId++;
		}
		return nuevoId;
	}

	entidadValida(): boolean {
		this.validaciones.forEach((compValido, nombreComp) => {
			if (!compValido) {
				return false;
			}
		});
		return true;
	}

	@Watch("entidad")
	borrarValidaciones(): void {
		this.tipo = this.entidad.tipo;
		this.nombreComp = this.entidad.nombreComp;
		this.renderComp = this.entidad.renderComp;
		this.validaciones.clear();
	}

	crearNuevaEntidad(): void {
		this.entidad = new Entidad();
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
.boton-guardar {
	background-color: yellowgreen;
}
.boton-salir {
	background-color: yellowgreen;
}
</style>