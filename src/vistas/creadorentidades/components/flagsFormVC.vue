<template>
    <div>
        <label>Flags</label>
        <label class="checkbox-label">
            <input v-model="esIntransitable" type="checkbox"> Es intransitable
        </label>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import store from "./../store/creadorEntidadesStore";
import EventBus from "../EventBus";

@Component
export default class FlagsFormVC extends Vue {

    public esIntransitable: boolean = false;

	public created(): void {
        EventBus.$on("actualizar-informacion", () => this.actualizar());
	}
    
    public updated(): void {
        store.state.esIntransitable = this.esIntransitable;
	}

	public actualizar(): void {
		this.esIntransitable = store.state.esIntransitable || false;
    }
    
}
</script>

<style>

</style>