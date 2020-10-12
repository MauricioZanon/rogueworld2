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
import store from "@/store/store"
import { Posicion, modificarTx, modificarTy } from "@/mapa/Posicion";

@Component({
	components: {
		TileVC
	}
})
export default class PlayerViewVC extends Vue {
	public readonly tamañoTile = 4;
	public readonly listener = (evento: KeyboardEvent): void => PlayerViewController.resolverKeyDown(evento);

	public get mapa(): Tile[][] {
		return Mapa.obtenerAreaCuadrada(this.pos00, 25, 25);
	}

	private get pos00(): Posicion {
		const resultado: Posicion = {...store.getters.player.posicion};
		modificarTx(resultado, -12);
		modificarTy(resultado, -12);
		return resultado;
	}

	public mounted(): void {
		window.addEventListener("keydown", this.listener);
	}

	public destroyed(): void {
		window.removeEventListener("keydown", this.listener);
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