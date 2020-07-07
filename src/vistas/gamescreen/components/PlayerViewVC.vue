<template>
	<div class="player-view">
		<div v-for="(columna, indexCol) in mapa" :key="indexCol">
			<TileVC v-for="(tile, indexRow) in columna" :key="indexRow" :tile="tile" :tamaño="tamañoTile"></TileVC>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Mapa from "@/mapa/Mapa";
import Tile from "@/mapa/Tile";
import TileVC from "./TileVC.vue";
import PlayerViewController from "../controllers/PlayerViewController"

@Component({
	components: {
		TileVC
	}
})
export default class PlayerViewVC extends Vue {
	public mapa = [] as Tile[][];
	public tamañoTile: number;
	public listener = (evento: KeyboardEvent): void => PlayerViewController.resolverKeyDown(evento);

	public mounted(): void {
		this.mapa = Mapa.array;
		this.tamañoTile = 100 / this.mapa.length;
		window.removeEventListener("keydown", this.listener)
		window.addEventListener("keydown", this.listener);
	}

}
</script>

<style scoped>
.player-view {
	display: grid;
	grid-template-columns: repeat(100, 0fr);
	grid-template-rows: 100px;
	width: 100vh;
	height: 100vh;
	float: left;
	background-color: black;
	border-right: 1px gray;
	cursor: default;
}
</style>