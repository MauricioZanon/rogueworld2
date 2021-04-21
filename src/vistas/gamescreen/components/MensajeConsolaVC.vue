<template>
    <div class="mensaje-consola">
        <span v-for="(parteMensaje, index) in mensajeConsola.getMensaje()" :key="index"
                :style="generarEstilo(parteMensaje)">
            {{parteMensaje.texto}}
        </span>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue } from "vue-property-decorator";
import { MensajeConsola, PalabrasEstiladas } from "../utils/MensajeConsola";

@Component
export default class ConsolaVC extends Vue  {
    @Prop()
    public mensajeConsola: MensajeConsola;

    public generarEstilo(texto: PalabrasEstiladas): Partial<CSSStyleDeclaration> {
        return {
            color: texto.color ?? "#DDD",
            fontWeight: texto.negrita ? "bold" : "normal"
        };
    }

}
</script>

<style>
.mensaje-consola {
    font-size: 14px;
}

</style>