<template>
    <div>
        <label>Tipo de entidad</label>
        <select required v-model.lazy="tipo" name="TiposDeEntidad">
            <option v-for="tipo in tipos" :value="tipo" :key="tipo">{{tipo}}</option>
        </select>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Tipos } from "@/entidades/Tipos";
import store from "./../store/creadorEntidadesStore"
import EventBus from "../EventBus";

@Component 
export default class TipoFormVC extends Vue {
	public readonly tipos: Tipos[] = [] as Tipos[];
	public tipo: Tipos = null;

    public created(): void {
        this.tipos.push(Tipos.ACTOR);
		this.tipos.push(Tipos.TERRENO);
		this.tipos.push(Tipos.FEATURE);
        this.tipos.push(Tipos.ITEM);
        EventBus.$on("actualizar-informacion", () => this.actualizar());
    }

    public actualizar(): void {
        this.tipo = store.state.tipo;
    }

    @Watch("tipo")
    public actualizarStore(): void {
        store.state.tipo = this.tipo;
    }

}
</script>

<style>

</style>