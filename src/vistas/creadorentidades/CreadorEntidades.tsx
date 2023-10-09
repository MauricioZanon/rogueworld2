import React, { useState } from "react";
import shallow from "zustand/shallow";
import Entidad from "../../entidades/Entidad";
import { ModalCargarEntidad } from "./components/modalCargarEntidad";
import "./estilosCreadorDeEntidades.css";
import { useStore } from "./store/creadorEntidadesStore";

export function CreadorEntidades(): JSX.Element {

	const [modalCargarEntidadVisible, setModalCargarEntidadVisible] = useState(false);

	const { entidadSeleccionada, setEntidadSeleccionada } = useStore((state) => ({
		entidadSeleccionada: state.entidadSeleccionada,
		setEntidadSeleccionada: state.setEntidadSeleccionada,
	}), shallow);

	function crearNuevaEntidad(): void {
		setEntidadSeleccionada(new Entidad());
	}

	// function crearFormulario(): JSX.Element {
	// 	if (entidadSeleccionada) {
	// 		const properties = {
	// 			data: entidadSeleccionada,
	// 			renderers: materialRenderers,
	// 			cells: materialCells,
	// 		};

	// 		return < JsonForms { ...properties } />;
	// 	} else {
	// 		return <></>;
	// 	}
	// }

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

	return (
		<>
			<button onClick={ crearNuevaEntidad }>Nueva entidad</button>
			<button onClick={ () => setModalCargarEntidadVisible(true) }>Cargar entidad</button>

			{/* { crearFormulario() } */ }

			<div className="container formulario-creador-entidades">
				<span className="contenedor-horizontal">
					{/* <fieldset>
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
					</fieldset> */}
					{ modalCargarEntidadVisible && <ModalCargarEntidad onClose={ () => setModalCargarEntidadVisible(false) } visible={ modalCargarEntidadVisible } /> }
				</span>
				{/* <GraficosForm entidad={ entidad } />
				<FlagsForm entidad={ entidad } />
				<StatsForm entidad={ entidad } />
				<button onClick={ guardarEntidad }>Guardar</button> */}
			</div >
		</>
	);

}
