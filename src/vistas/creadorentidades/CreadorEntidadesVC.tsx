import React, { useState } from "react";
import Entidad from "../../entidades/Entidad";
import "./styles.css";
import { FlagsForm } from './components/FlagsForm';
import { GraficosForm } from "./components/GraficosForm";
import StatsForm from "./components/statsForm";

export function CreadorEntidadesVC(): JSX.Element {

	const [entidad] = useState(crearNuevaEntidad());

	function crearNuevaEntidad(): Entidad {
		return new Entidad();
	}

	return (
		<>
			<div className="top-bar">
				<button onClick={ () => crearNuevaEntidad() }>Nueva entidad</button>
				<button data-toggle="modal" data-target="#modal-cargar-entidad">Cargar entidad</button>
				<hr />
			</div>
			<div className="container formulario-creador-entidades">
				<span className="contenedor-horizontal">
					<fieldset>
						<legend>Tipo de entidad</legend>
						<select required name="TiposDeEntidad">
							<option value="ACTOR" key="ACTOR">ACTOR</option>
							<option value="TERRENO" key="TERRENO">TERRENO</option>
							<option value="FEATURE" key="FEATURE">FEATURE</option>
						</select>
					</fieldset>
					<fieldset>
						<legend>Nombre</legend>
						<div>
							<input placeholder="Nombre" />
						</div>
					</fieldset>
				</span>
				<GraficosForm entidad={ entidad } />
				<FlagsForm entidad={ entidad } />
				<StatsForm entidad={ entidad } />
				{/* <button onClick={ guardarEntidad }>Guardar</button>
				<ModalCargarEntidadVC ref="modal-cargar-entidad"></ModalCargarEntidadVC> */}
			</div >
		</>
	);

	// function guardarEntidad(): void {
	// 	if (esEntidadValida()) {
	// 		EntidadRepository.persistirEntidades();
	// 	} else {
	// 		console.log("entidad invalida");
	// 	}
	// }

	// function esEntidadValida(): boolean {
	// 	return store.state.tipo && store.state.nombreCompValido && store.state.renderCompValido && store.state.statsCompValido;
	// }
}
