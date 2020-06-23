<template>
	<div>
		<player-view></player-view>
		<side-bar></side-bar>
	</div>
</template>

<script lang="ts">
import playerView from "./components/PlayerView.vue";
import sideBar from "./components/SideBar.vue";
import { Component, Vue } from 'vue-property-decorator';

@Component({
	components: {
		playerView,
		sideBar
	}
})
export default class GameScreen extends Vue {
}
</script>

<style scoped>
</style>