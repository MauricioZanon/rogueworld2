<template>
	<div class="side-bar">
		{{ playerPos }}
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store/store";
import { Posicion } from "@/mapa/Posicion";

@Component
export default class SideBarVC extends Vue {

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