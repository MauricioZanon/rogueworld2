<template>
	<div class="player-view" @wheel="cambiarZoom">
		<span v-for="(columna, indexCol) in mapa" :key="indexCol">
			<TileVC v-for="(tile, indexRow) in columna" :key="indexRow" :tile="tile" :tamaño="tamañoTile"></TileVC>
		</span>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Mapa from "@/mapa/Mapa";
import Tile from "@/mapa/Tile";
import TileVC from "./TileVC.vue";
import PlayerViewController from "../controllers/PlayerViewController";
import store from "@/store/store";
import { Posicion, modificarTx, modificarTy } from "@/mapa/Posicion";

const listener = (evento: KeyboardEvent): void => PlayerViewController.resolverKeyDown(evento);

@Component({
	components: {
		TileVC
	}
})
export default class PlayerViewVC extends Vue {
	public cambiarZoom(evento: WheelEvent): void {
		if(evento.deltaY > 0) {
			store.commit("aumentarCantidadTiles");
		} else {
			store.commit("disminuirCantidadTiles");
		}
	}

	public get mapa(): Tile[][] {
		return Mapa.obtenerAreaCuadrada(this.pos00, this.cantidadTiles, this.cantidadTiles);
	}

	private get pos00(): Posicion {
		const resultado: Posicion = {...store.getters.player.posicion};
		const delta: number = Math.ceil(-(this.cantidadTiles/2));
		modificarTx(resultado, delta);
		modificarTy(resultado, delta);
		return resultado;
	}

	public get tamañoTile(): number {
		return 100 / this.cantidadTiles;
	}

	public get cantidadTiles(): number {
		return store.state.cantidadTiles;
	}

	public mounted(): void {
		window.addEventListener("keydown", listener);
	}

	public destroyed(): void {
		window.removeEventListener("keydown", listener);
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