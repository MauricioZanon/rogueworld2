import React, { ChangeEvent, useState } from "react";
import RenderComp from "../../../entidades/componentes-de-entidades/RenderComp";
import Entidad from '../../../entidades/Entidad';

type GraficosFormProps = {
	entidad: Entidad;
};

// type GraficosFormState = {
// 	esVisible: boolean,
// 	tieneColorFondo: boolean,
// 	simbolo: string,
// 	colorSimbolo: string,
// 	colorFondo?: string;
// };

export function GraficosForm(props: GraficosFormProps): JSX.Element {

	const [esVisible, setEsVisible] = useState(false);
	const [tieneColorFondo, setTieneColorFondo] = useState(false);
	const [simbolo, setSimbolo] = useState("");
	const [colorSimbolo, setColorSimbolo] = useState("");
	const [colorFondo, setColorFondo] = useState("");



	function actualizarExistenciadeGraficComp(event: ChangeEvent<HTMLInputElement>) {
		const nuevoValor: boolean = event.target.value === "true";
		setEsVisible(nuevoValor);
		props.entidad.renderComp = nuevoValor ? new RenderComp(simbolo, colorSimbolo, colorFondo) : null;
	}

	return (
		<fieldset>
			<legend>Gráficos</legend>
			<div>
				<label className="checkbox-label" htmlFor="checkboxEsVisible">Es visible</label>
				<input type="checkbox" id="checkboxEsVisible" onChange={ (event) => actualizarExistenciadeGraficComp(event) } />
				{ esVisible && <div className="row">
					<div className="inputs-componente col-3">
						<label htmlFor="inputSimbolo">Símbolo</label>
						<input id="inputSimbolo" type="text" className="input-simbolo" maxLength={ 1 } onChange={ (event) => props.entidad.renderComp.simbolo = event.currentTarget.value } />

						<label htmlFor="colorSimboloInput">Color del símbolo</label>
						<input id="colorSimboloInput" type="color" />

						<br />
						<label htmlFor="colorFondoCheckbox" className="checkbox-label"></label>
						<input id="colorFondoCheckbox" type="checkbox" onChange={ () => setTieneColorFondo(!tieneColorFondo) } /> Tiene color de fondo

						{ tieneColorFondo && <div className="form-color-fondo">
							<label htmlFor="colorFondoInput">Color de fondo</label>
							<input id="colorFondoInput" type="color" />
							<br />
							<label htmlFor="alphaInput">Alpha</label>
							<input id="alphaInput" type="range" min="0" max="255" />
						</div> }
					</div>
					<div className="tile-de-muestra" style={ { color: props.entidad.renderComp?.colorSimbolo, backgroundColor: props.entidad.renderComp?.colorFondo } }>
						<span className="simbolo">{ props.entidad.renderComp?.simbolo }</span>
					</div>
				</div> }
			</div>
		</fieldset>
	);
}