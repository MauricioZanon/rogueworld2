<template>
	<div>
		<input placeholder="Nombre" v-model="nombre" />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "./../store/creadorEntidadesStore";
import EventBus from "../EventBus";

@Component
export default class NombreCompFormVC extends Vue {

	public nombre: string = "";

	public created(): void {
        EventBus.$on("actualizar-informacion", () => this.actualizar());
	}

	public updated(): void {
		store.state.nombreCompValido = this.nombre != "";
		if(store.state.nombreCompValido) {
			store.state.nombreComp.nombre = this.nombre;
		}
	}

	public actualizar(): void {
		this.nombre = store.state.nombreComp.nombre;
	}

}
</script>

<style>
</style>