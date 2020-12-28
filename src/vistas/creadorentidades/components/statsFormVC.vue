<template>
    <div>
        <label>Stats</label>
        <input v-model="tieneStatsBase" type="checkbox"> Base
        <div v-if="tieneStatsBase">
            <input type="number" :min="minStatBase" :max="maxStatBase" v-model="STR">STR
            <input type="number" :min="minStatBase" :max="maxStatBase" v-model="DEX">DEX
            <input type="number" :min="minStatBase" :max="maxStatBase" v-model="INT">INT
            <br>
            <input type="number" :min="minStatBase" :max="maxStatBase" v-model="CUN">CUN
            <input type="number" :min="minStatBase" :max="maxStatBase" v-model="WIS">WIS
            <input type="number" :min="minStatBase" :max="maxStatBase" v-model="CON">CON
        </div>
        <br>
        <input v-model="tieneSalud" type="checkbox"> Salud
        <div v-if="tieneSalud">
            <input type="number" v-model="saludMaxima" :min="minSaludMaxima">Máximo
            <br>
            <input type="number" v-model="regeneracion" step="0.1">Regeneración
        </div>
    </div>
  
</template>

<script lang="ts">
import store from "./../store/creadorEntidadesStore";
import { Component, Vue } from "vue-property-decorator";
import StatsComp, { HPStats } from "@/entidades/componentes-de-entidades/StatsComp";
import { BaseStats } from '../../../entidades/componentes-de-entidades/StatsComp';
import EventBus from "../EventBus";

    @Component
    export default class StatsFormVC extends Vue {

        public tieneStatsBase: boolean = false;
        public readonly minStatBase = 5;
        public readonly maxStatBase = 20;
        public STR:number = 5;
        public DEX:number = 5;
        public INT:number = 5;
        public CUN:number = 5;
        public WIS:number = 5;
        public CON:number = 5;

        public tieneSalud: boolean = false;
        public readonly minSaludMaxima = 1;
        public saludMaxima: number = 1;
        public regeneracion: number = 0;
        
        public created(): void {
            EventBus.$on("actualizar-informacion", () => this.actualizar());
        }

        public esComponenteValido(): boolean {
            return this.baseStatsValidos() && this.saludValida();
        }

        public baseStatsValidos(): boolean {
            return !this.tieneStatsBase ||
                    [this.STR, this.DEX, this.INT, this.CUN, this.WIS, this.CON]
                            .map(stat => stat >= this.minStatBase && stat <= this.maxStatBase)
                            .filter(stat => !stat).length == 0;
        }

        public saludValida(): boolean {
            return !this.tieneSalud || this.saludMaxima >= this.minSaludMaxima;
        }

        public actualizar(): void {
            const comp: StatsComp = store.state.statsComp;
            if(comp.base) {
                this.tieneStatsBase = true;
                this.STR = comp.base.STR;
                this.DEX = comp.base.DEX;
                this.INT = comp.base.INT;
                this.CUN = comp.base.CUN;
                this.WIS = comp.base.WIS;
                this.CON = comp.base.CON;
            } else {
                this.tieneStatsBase = false;
            }
            if(comp.salud) {
                this.tieneSalud = true;
                this.saludMaxima = comp.salud.max;
                this.regeneracion = comp.salud.regeneracion;
            }else {
                this.tieneSalud = false;
            }

        }



        public updated(): void {
            store.state.statsCompValido = this.esComponenteValido();
            if(store.state.statsCompValido) {
                const comp: StatsComp = store.state.statsComp;
                comp.base = this.tieneStatsBase ?
                        {STR: this.STR, DEX: this.DEX, INT: this.INT, CUN: this.CUN, WIS: this.WIS, CON: this.CON} : {} as BaseStats;
                comp.salud = this.tieneSalud ?
                        {max: this.saludMaxima, actual: this.saludMaxima, regeneracion: this.regeneracion} : {} as HPStats;
                
            }
        }

    }
</script>

<style>

</style>