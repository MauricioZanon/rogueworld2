<template>
	<div>
		<input placeholder="Nombre" v-model="nombre" required />
	</div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Watch, Vue } from "vue-property-decorator";
import NombreComp from "@/entidades/componentes-de-entidades/NombreComp"
import ValidacionComponente from "./../ValidacionComponente";
import { log } from 'util';

@Component
export default class NombreCompFormVC extends Vue {
	@Prop()
	public nombreComp: NombreComp;

	public nombre = "";

	private updated(): void {
		this.validar()
	}

	public validar(): void {
		let esComponenteValido = this.nombre !== "";
		this.agregarValidacion(esComponenteValido);
		
		if (esComponenteValido) {
			this.actualizarComponente();
		}
	}

	@Emit()
	private agregarValidacion(esValido: boolean): ValidacionComponente {
		return new ValidacionComponente("nombreComp", esValido);
	}

	public actualizarComponente(): void {
		this.nombreComp.nombre = this.nombre
	}

	@Watch("nombreComp")
	public actualizarInformacionDelForm(): void {
		this.nombre = this.nombreComp?.nombre;
	}


}
</script>

<style>
</style>