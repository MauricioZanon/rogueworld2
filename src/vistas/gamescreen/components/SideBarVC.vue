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
	border-left: 3px solid rgb(139, 240, 114);
	color: white;
	background-color: black;
	height: 100vh;
	float: right;
	width: max-content;
	border-left: 1px gray;
}
</style>