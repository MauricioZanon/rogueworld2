<template>
	<div>
		<input placeholder="Nombre" v-model="nombre" required />
	</div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Watch, Vue } from 'vue-property-decorator';
import NombreComp from "@/entities/componentes-de-entidades/NombreComp"
import Entidad from "@/entities/Entidad";
import ValidacionComponente from "./../ValidacionComponente";

@Component
export default class NombreCompFormVC extends Vue {
	@Prop()
	nombreComp: NombreComp;

	nombre = "";
	componenteValido = false;

	validar(): void {
		this.componenteValido = this.nombre !== "";
		this.agregarValidacion();

		if (this.componenteValido) {
			this.actualizarComponente();
		}
	}

	actualizarComponente(): void {
		this.nombreComp.nombre = this.nombre
	}

	@Watch("nombreComp")
	actualizarInformacionDelForm(): void {
		this.nombre = this.nombreComp.nombre;
	}

	@Emit()
	agregarValidacion(): ValidacionComponente {
		return new ValidacionComponente("nombreComp", this.componenteValido);
	}

}
</script>

<style>
</style>