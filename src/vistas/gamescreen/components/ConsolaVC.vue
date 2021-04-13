<template>
    <div class="consola">
        <MensajeConsolaVC v-for="(mensaje, index) in mensajes" :key="index" :mensajeConsola="mensaje"></MensajeConsolaVC>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MensajeConsola } from "../utils/MensajeConsola";
import MensajeConsolaVC from "./MensajeConsolaVC.vue";

@Component({
    components: {
        MensajeConsolaVC
    }
})
export default class ConsolaVC extends Vue {

    public get mensajes(): MensajeConsola[] {
        return this.$store.state.mensajesConsola;
    }

}
</script>

<style scoped>

::-webkit-scrollbar {
  width: 4px;              
}

::-webkit-scrollbar-track {
  background: black;        
}

::-webkit-scrollbar-thumb {
  background-color: #c1c1ec;    
  border-radius: 20px;       
}

.consola {
	width: auto;
    height: 30%;

    padding: 0 5px;
    margin:0 3%;
	color:white;
	background-color: black;
    text-align: left;

    border-radius: 10px;
    border: 10px double #111;
    
    overflow-y: scroll;
}

</style>