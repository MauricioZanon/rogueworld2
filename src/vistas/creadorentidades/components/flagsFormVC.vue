<template>
    <div>
        <label>Flags</label>
        <label class="checkbox-label">
            <input v-model="esIntransitable" type="checkbox"> Es intransitable
            <input v-model="esOpaco" type="checkbox"> Es opaco
        </label>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import store from "./../store/creadorEntidadesStore";
import EventBus from "../EventBus";

@Component
export default class FlagsFormVC extends Vue {
    public esIntransitable: boolean = false;
    public esOpaco: boolean = false;

	public created(): void {
        EventBus.$on("actualizar-informacion", () => this.actualizar());
	}
    
    @Watch("esIntransitable")
    public guardarNuevoValorEsIntransitable() {
        if(this.esIntransitable) {
            store.state.flags.add("INTRANSITABLE");
        } else {
            store.state.flags.delete("INTRANSITABLE");
        }
    }

    @Watch("esOpaco")
    public guardarNuevoValorEsOpaco() {
        if(this.esOpaco) {
            store.state.flags.add("OPACO");
        } else {
            store.state.flags.delete("OPACO");
        }
    }

	public actualizar(): void {
		this.esIntransitable = store.state.flags.has("INTRANSITABLE");
		this.esOpaco = store.state.flags.has("OPACO");
    }
    
}
</script>

<style>

</style>