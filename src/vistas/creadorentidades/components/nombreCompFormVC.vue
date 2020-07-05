<template>
	<div>
		<input placeholder="Nombre" v-model="nombre" required />
	</div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Watch, Vue } from "vue-property-decorator";
import NombreComp from "@/entidades/componentes-de-entidades/NombreComp"
import ValidacionComponente from "./../ValidacionComponente";

@Component
export default class NombreCompFormVC extends Vue {
	@Prop()
	public nombreComp: NombreComp;

	public nombre = "";
	public componenteValido = false;

	public validar(): void {
		this.componenteValido = this.nombre !== "";
		this.agregarValidacion();

		if (this.componenteValido) {
			this.actualizarComponente();
		}
	}

	public actualizarComponente(): void {
		this.nombreComp.nombre = this.nombre
	}

	@Watch("nombreComp")
	public actualizarInformacionDelForm(): void {
		this.nombre = this.nombreComp.nombre;
	}

	@Emit()
	private agregarValidacion(): ValidacionComponente {
		return new ValidacionComponente("nombreComp", this.componenteValido);
	}

}
</script>

<style>
</style>