<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	text-align: center;
	color: #2c3e50;
	margin: 0;
}
</style>
