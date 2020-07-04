<template>
	<div data-toggle="tooltip" :title="tile.toString()" class="tile" :style="estilado">
		<div class="ascii">{{ tile.getSimbolo() }}</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import Tile from "@/mapa/Tile"

@Component
export default class TileVC extends Vue {
	@Prop()
	tile: Tile;
	@Prop()
	tamaño: number;

	get estilado() {
		return "color:" +
			this.tile.getColorSimbolo() +
			"; background-color: " +
			this.tile.getColorFondo() +
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