<template>
	<div class="player-view">
		<div v-for="(columna, indexCol) in mapa" :key="indexCol">
			<tile-vue-comp
				v-for="(tile, indexRow) in columna"
				:key="indexRow"
				:tile="tile"
				:tamaño="tamañoTile"
			></tile-vue-comp>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Mapa from "@/mapa/Mapa";
import Tile from "@/mapa/Tile";
import TileVueComp from "./TileVueComp.vue";

@Component({
	components: {
		TileVueComp
	}
})
export default class PlayerView extends Vue {
	mapa = [] as Tile[][];
	tamañoTile: number;

	mounted(): void {
		this.mapa = new Mapa().array;
		this.tamañoTile = 100 / this.mapa.length;
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