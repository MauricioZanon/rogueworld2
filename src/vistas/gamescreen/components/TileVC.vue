<template>
	<div data-toggle="tooltip" :title="tile.toString()" class="tile" :style="estilado">
		<div class="ascii">{{ simbolo }}</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import Tile from "@/mapa/Tile"

@Component
export default class TileVC extends Vue {
	@Prop()
	private readonly tile: Tile;
	@Prop()
	private readonly tamaño: number;

	public get simbolo(): string {
		return this.tile.actor?.renderComp.simbolo || this.tile.terreno.renderComp.simbolo || "¿";
	}

	public get colorSimbolo(): string {
		 return this.tile.actor?.renderComp.colorSimbolo || this.tile.terreno?.renderComp.colorSimbolo || "#ffffff";
	}

	public get colorFondo(): string {
		 return this.tile.terreno?.renderComp.colorFondo || "#ffffff";
	}

	public get estilado(): string {
		return "color:" +
			this.colorSimbolo +
			"; background-color: " +
			this.colorFondo +
			"; width: " +
			this.tamaño +
			"vh;" +
			"height: " +
			this.tamaño +
			"vh;" +
			"font-size: " +
			this.tamaño * 0.8 +
			"vh;";
	}

}
</script>

<style scoped>
.ascii {
	text-align: center;
	align-content: center;
	font-family: "Courier New", Courier, monospace;
	font-weight: 700;
	line-height: 110%;
	user-select: none;
}
.tile:hover {
	position: unset;
	border: 2px dashed yellow;
}
</style>