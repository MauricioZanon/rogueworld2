<template>
	<div class="row">
		<div class="inputs-componente col-3">
			<label>Símbolo</label>
			<input type="text" class="input-simbolo" maxlength="1" v-model="simbolo" />
			<br />
			<label>Color del símbolo</label>
			<input type="color" v-model="colorSimbolo" />
			<br />
			<label>Color de fondo</label>
			<br />
			<input type="checkbox" v-model="tieneColorFondo" /> Tiene color de fondo
			<input type="color" v-model="colorFondo" v-show="tieneColorFondo" />
			<br />
			<label>Alpha</label>
			<input type="range" min="0" max="255" @input="actualizarOpacidad" v-model="opacidad" />
		</div>
		<div class="muestra-tile" :style="{color: colorSimbolo, backgroundColor: colorFondo}">
			<span class="simbolo">{{simbolo}}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import RenderComp from "@/entidades/componentes-de-entidades/RenderComp";

@Component
export default class RenderCompFormVC extends Vue {
	@Prop()
	private readonly renderComp: RenderComp;

	public simbolo = "";
	public colorSimbolo = "";
	public tieneColorFondo = false;
	public colorFondo = "";
	public opacidad = "0";

	public actualizarOpacidad(evt: InputEvent ): void {
		const nuevoValor = parseInt(evt.data);
		this.colorFondo = this.colorFondo.slice(0, 7).concat(nuevoValor.toString(16));
	}

	@Watch("renderComp")
	public actualizarInformacionDelForm(): void {
		this.simbolo = this.renderComp.simbolo;
		this.colorSimbolo = this.renderComp.colorSimbolo;
		if(this.renderComp.colorFondo){
			this.tieneColorFondo = true;
			this.colorFondo = this.renderComp.colorFondo;
			this.opacidad = parseInt(this.colorFondo.slice(7, 9), 16).toString(10);
		} else{
			this.tieneColorFondo = false;
			this.colorFondo = "";
			this.opacidad = "0";
		}
	}

	public created(): void {
		this.actualizarInformacionDelForm()
	}
}
</script>

<style>
.muestra-tile {
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
</style>