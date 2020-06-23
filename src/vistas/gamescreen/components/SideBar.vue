<template>
	<div class="side-bar">
		<span>Nombre: Mawi</span>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SideBar extends Vue {
};
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