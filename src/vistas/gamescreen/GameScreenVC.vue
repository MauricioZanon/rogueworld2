<template>
	<div>
		<PlayerViewVC @keydown.native="key"></PlayerViewVC>
		<SideBarVC></SideBarVC>
	</div>
</template>

<script lang="ts">
import PlayerViewVC from "./components/PlayerViewVC.vue";
import SideBarVC from "./components/SideBarVC.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
	components: {
		PlayerViewVC,
		SideBarVC
	}
})
export default class GameScreenVC extends Vue {
}
</script>

<style scoped>
</style>