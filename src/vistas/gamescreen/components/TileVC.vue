<template>
	<div data-toggle="tooltip" :title="tile.toString()" >
		<div class="tile" :style="{
				'background-color': colorFondo, 
				'color': colorSimbolo, 
				'width': tamañoTile, 
				'height': tamañoTile, 
				'font-size': tamañoFuente,
				'top': 100}">
			<div class="ascii">{{ simbolo }}</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Tile from "@/mapa/Tile"

@Component
export default class TileVC extends Vue {
	@Prop()
	private readonly tile: Tile;
	@Prop()
	private readonly tamaño: number;

	public get simbolo(): string {
		return this.tile.actor?.renderComp.simbolo ||
				this.tile.feature?.renderComp.simbolo ||
				this.tile.terreno?.renderComp.simbolo || 
				"¿";
	}

	public get colorSimbolo(): string {
		return this.tile.actor?.renderComp.colorSimbolo || 
				this.tile.feature?.renderComp.colorSimbolo ||
				this.tile.terreno?.renderComp.colorSimbolo || 
				"#ffffff";
	}

	public get colorFondo(): string {
		return this.tile.terreno?.renderComp.colorFondo || "#000000";
	}

	public get tamañoTile(): string {
		return this.tamaño + "vh";
	}

	public get tamañoFuente(): string {
		return this.tamaño*0.8 + "vh";
	}

}
</script>

<style scoped>
.ascii {
	text-align: center;
	font-family: "Courier New", Courier, monospace;
	font-weight: 700;
	line-height: 110%;
	user-select: none;
}
.tile:hover {
	border: 1px dashed yellow;
}
</style>