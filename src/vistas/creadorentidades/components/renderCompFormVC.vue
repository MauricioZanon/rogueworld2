<template>
	<div class="row">
		<div class="inputs-componente col-3">
			<label>Símbolo</label>
			<input type="text" class="input-simbolo" maxlength="1" v-model="simbolo" />
			<br />
			<label>Color del símbolo</label>
			<input type="color" v-model="colorSimbolo" />
			<br />
			<input type="checkbox" v-model="tieneColorFondo" /> Tiene color de fondo
			<div v-show="tieneColorFondo">
				<label>Color de fondo</label>
				<input type="color" v-model="colorFondoElegido" />
				<br />
				<label>Alpha</label>
				<input type="range" min="0" max="255" v-model="opacidad" />
			</div>
		</div>
		<div class="muestra-tile" :style="{color: colorSimbolo, backgroundColor: colorFondoFinal}">
			<span class="simbolo">{{simbolo}}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Watch, Vue } from "vue-property-decorator";
import RenderComp from "@/entidades/componentes-de-entidades/RenderComp";
import ValidacionComponente from '../ValidacionComponente';

@Component
export default class RenderCompFormVC extends Vue {
	@Prop()
	private readonly renderComp: RenderComp;

	public simbolo = "";
	public colorSimbolo = "#000";
	public tieneColorFondo = false;
	public colorFondoElegido = "";

	public opacidad = "255";

	public mounted() {
		this.agregarValidacion(false);
	}

	public get colorFondoFinal(): string {
		const opacidadHexa = parseInt(this.opacidad);
		return this.colorFondoElegido.slice(0, 7).concat(opacidadHexa.toString(16));
	}

	@Watch("renderComp")
	public actualizarInformacionDelForm(): void {
		this.simbolo = this.renderComp?.simbolo;
		this.colorSimbolo = this.renderComp?.colorSimbolo;
		if(this.renderComp?.colorFondo){
			this.tieneColorFondo = true;
			this.colorFondoElegido = parseInt(this.colorFondoFinal.slice(0, 7), 16).toString(10);
			this.opacidad = parseInt(this.colorFondoFinal.slice(7, 9), 16).toString(10);
		} else{
			this.tieneColorFondo = false;
			this.colorFondoElegido = "";
			this.opacidad = "0";
		}
	}

	private updated() {
		this.validar();
	}

	public validar(): void {
		let esComponenteValido: boolean = true;
		if(!this.simbolo || (this.tieneColorFondo && !this.colorFondoElegido)) {
			esComponenteValido = false;
		}
		this.agregarValidacion(esComponenteValido);
	}
		
	@Emit()
	private agregarValidacion(esValido: boolean): ValidacionComponente {
		return new ValidacionComponente("renderComp", esValido);
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