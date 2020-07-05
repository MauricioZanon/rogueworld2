<template>
	<div class="menu">
		<router-link :to="{name: 'GameScreen'}">
			<button class="boton boton-new-game">New game</button>
		</router-link>
		<button class="boton boton-load-game">Load game</button>
		<router-link :to="{name: 'CreadorEntidades'}">
			<button class="boton boton-creador-de-entidades">Entity creator</button>
		</router-link>
		<button class="boton boton-salir">Exit</button>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class MainScreenVC extends Vue {
}
</script>

<style scoped>
.menu {
	display: flex;
	justify-content: space-evenly;
}

.boton {
	border-radius: 3px;
	border: 3px solid;
	font-weight: bolder;
	margin-bottom: 5px;
	width: 150px;
	align-content: center;
	cursor: pointer;
}

.boton:not(hover) {
	transition: 2s ease;
}

.boton:hover {
	transition: 0.5s;
	filter: brightness(150%);
	border-radius: 15px;
}

.boton-new-game {
	background-color: yellow;
	border-color: orangered;
	color: orangered;
}

.boton-load-game {
	background-color: greenyellow;
	border-color: green;
	color: green;
}

.boton-creador-de-entidades {
	background-color: cyan;
	border-color: darkblue;
	color: darkblue;
}

.boton-salir {
	background-color: lightblue;
	border-color: darkslategrey;
	color: darkslategrey;
}
</style>
