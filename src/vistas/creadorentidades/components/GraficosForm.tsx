import React, { ChangeEvent } from "react";
import { Component } from "react";
import RenderComp from "../../../entidades/componentes-de-entidades/RenderComp";
import Entidad from '../../../entidades/Entidad';

type GraficosFormProps = {
	entidad: Entidad;
};

type GraficosFormState = {
	esVisible: boolean,
	tieneColorFondo: boolean,
	simbolo: string,
	colorSimbolo: string,
	colorFondo?: string
};

export class GraficosForm extends Component<GraficosFormProps, GraficosFormState> {

	constructor(props) {
		super(props);
		this.state = {
			esVisible: false,
			tieneColorFondo: false,
			simbolo: "",
			colorSimbolo: "",
			colorFondo: ""

		};
	}

	render(): JSX.Element {
		return (
			<fieldset>
				<legend>Gráficos</legend>
				<div>
					<label className="checkbox-label" htmlFor="checkboxEsVisible">Es visible</label>
					<input type="checkbox" id="checkboxEsVisible" onChange={ (event) => this.actualizarExistenciadeGraficComp(event) } />
					{ this.state.esVisible && <div className="row">
						<div className="inputs-componente col-3">
							<label htmlFor="inputSimbolo">Símbolo</label>
							<input id="inputSimbolo" type="text" className="input-simbolo" maxLength={ 1 } onChange={ (event) => this.props.entidad.renderComp.simbolo = event.currentTarget.value } />

							<label htmlFor="colorSimboloInput">Color del símbolo</label>
							<input id="colorSimboloInput" type="color" />

							<br />
							<label htmlFor="colorFondoCheckbox" className="checkbox-label"></label>
							<input id="colorFondoCheckbox" type="checkbox" onChange={ () => this.setState({ tieneColorFondo: !this.state.tieneColorFondo }) } /> Tiene color de fondo

							{ this.state.tieneColorFondo && <div className="form-color-fondo">
								<label htmlFor="colorFondoInput">Color de fondo</label>
								<input id="colorFondoInput" type="color" />
								<br />
								<label htmlFor="alphaInput">Alpha</label>
								<input id="alphaInput" type="range" min="0" max="255" />
							</div> }
						</div>
						<div className="tile-de-muestra" style={ { color: this.state.entidad.renderComp?.colorSimbolo, backgroundColor: this.state.entidad.renderComp?.colorFondo } }>
							<span className="simbolo">{ this.state.entidad.renderComp?.simbolo }</span>
						</div>
					</div> }
				</div>
			</fieldset>
		);
	}

	private actualizarExistenciadeGraficComp(event: ChangeEvent<HTMLInputElement>) {
		const nuevoValor: boolean = event.target.value === "true";
		this.setState({ esVisible: nuevoValor });
		this.props.entidad.renderComp = nuevoValor ? this.crearRenderComp() : null;
	}

	private actualizarRenderComp(): RenderComp {

		return new RenderComp();
	}
}