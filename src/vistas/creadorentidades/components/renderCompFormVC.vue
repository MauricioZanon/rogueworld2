<template>
	<div>
		<label class="checkbox-label">
			<input type="checkbox" v-model="tieneRenderComp"/>Es visible
		</label>
		<div class="row" v-if="tieneRenderComp">
			<div class="inputs-componente col-3">
				<label>Símbolo</label>
				<input type="text" class="input-simbolo" maxlength="1" v-model="simbolo" />
				<label>Color del símbolo</label>
				<input type="color" v-model="colorSimbolo" />
				<br />
				<label class="checkbox-label">
					<input type="checkbox" v-model="tieneColorFondo" /> Tiene color de fondo
				</label>
				<div v-show="tieneColorFondo" class="form-color-fondo">
					<label>Color de fondo</label>
					<input type="color" v-model="colorFondoElegido" />
					<br />
					<label>Alpha</label>
					<input type="range" min="0" max="255" v-model="opacidad" />
				</div>
			</div>
			<div class="tile-de-muestra" :style="{color: colorSimbolo, backgroundColor: colorFondoFinal}">
				<span class="simbolo">{{simbolo}}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RenderComp from "@/entidades/componentes-de-entidades/RenderComp";
import store from "./../store/creadorEntidadesStore";
import EventBus from "../EventBus";

@Component
export default class RenderCompFormVC extends Vue {

	public tieneRenderComp: boolean = false;

	public simbolo = "";
	public colorSimbolo = "#000";
	public tieneColorFondo = false;
	public colorFondoElegido = "";
	public opacidad = "255";

	public created(): void {
        EventBus.$on("actualizar-informacion", () => this.actualizar());
	}

	public get colorFondoFinal(): string {
		const opacidadHexa = parseInt(this.opacidad);
		return this.colorFondoElegido.slice(0, 7).concat(opacidadHexa.toString(16));
	}

	public actualizar(): void {
		const renderComp: RenderComp = store.state.renderComp;
		if(renderComp){
			this.tieneRenderComp = true;
			this.simbolo = renderComp.simbolo;
			this.colorSimbolo = renderComp.colorSimbolo;
			if(renderComp.colorFondo){
				this.tieneColorFondo = true;
				this.colorFondoElegido = renderComp.colorFondo.slice(0, 7).toString();
				this.opacidad = parseInt(this.colorFondoFinal.slice(7, 9), 16).toString(10);
			} else{
				this.tieneColorFondo = false;
				this.colorFondoElegido = "";
				this.opacidad = "0";
			}
		} else {
			this.tieneRenderComp = false;
		}
	}

	public updated(): void {
		store.state.renderCompValido = this.esComponenteValido();
		if(store.state.renderCompValido) {
			store.state.renderComp.simbolo = this.simbolo;
			store.state.renderComp.colorSimbolo = this.colorSimbolo;
			if(this.tieneColorFondo) {
				store.state.renderComp.colorFondo = this.colorFondoFinal;
			}
		}
	}

	public esComponenteValido(): boolean {
		return this.simbolo != "" && this.colorSimbolo != "" && (!this.tieneColorFondo || this.colorFondoFinal != "");
	}
	
}
</script>

<style>
.tile-de-muestra {
	width: 30px;
	height: 30px;
	font-size: 25px;
	border: 1px solid black;
	text-align: center;
}
.simbolo {
	left: 50%;
	transform: translate(-50%, 0);
}
.input-simbolo {
	width: 30px;
}
.form-color-fondo {
	margin-left: 15px;
}
</style>