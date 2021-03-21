<template>
	<div class="side-bar">
		{{ playerPos }}
		<br>
		{{ playercurrentHp }} / {{ playerMaxHp }}
		<br>
		<ConsolaVC></ConsolaVC>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store/store";
import { Posicion } from "@/mapa/Posicion";
import ConsolaVC from "./ConsolaVC.vue";

@Component({
	components: {
		ConsolaVC
	}
})
export default class SideBarVC extends Vue {

	public get playercurrentHp(): number {
		return store.state.player.statsComp.salud.actual;
	}

	public get playerMaxHp(): number {
		return store.state.player.statsComp.salud.max;
	}

	public get playerPos(): Posicion {
		return store.getters.player.posicion as Posicion;
	}

}
</script>

<style scoped>
.side-bar {
	color: white;
	font-size: 1rem;
	background-color: black;
	height: 100vh;
	float: right;
	width: 25%;
}
</style>