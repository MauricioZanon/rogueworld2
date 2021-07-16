import React from "react";
import Entidad from "../../entidades/Entidad";
import "./styles.css";
import { FlagsForm } from './components/FlagsFormVC';
import { GraficosForm } from "./components/GraficosForm";

type CreadorDeEntidadesState = {
	entidad: Entidad,
	esVisible: boolean;
};

export class CreadorEntidadesVC extends React.Component<{}, CreadorDeEntidadesState> {

	constructor(props) {
		super(props);
		this.state = {
			entidad: this.crearNuevaEntidad(),
			esVisible: false
		};
	}

	public componentDidMount(): void {
		this.crearNuevaEntidad();
	}

	render(): JSX.Element {
		return (<>
			<div className="top-bar">
				<button onClick={ () => this.crearNuevaEntidad() }>Nueva entidad</button>
				<button data-toggle="modal" data-target="#modal-cargar-entidad">Cargar entidad</button>
				<hr />
			</div>
			<div className="container formulario-creador-entidades">
				<span className="contenedor-horizontal">
					<fieldset>
						<legend>Tipo de entidad</legend>
						<select required name="TiposDeEntidad">
							{ this.tiposOptions() }
						</select>
					</fieldset>
					<fieldset>
						<legend>Nombre</legend>
						<div>
							<input placeholder="Nombre" />
						</div>
					</fieldset>
				</span>
				<GraficosForm entidad={ this.state.entidad } />
				<FlagsForm entidad={ this.state.entidad } />
				{/* <StatsFormVC></StatsFormVC> */ }
				{/* <button onClick={ this.guardarEntidad }>Guardar</button>
					<ModalCargarEntidadVC ref="modal-cargar-entidad"></ModalCargarEntidadVC> */}
			</div >
		</>
		);
	}

	public crearNuevaEntidad(): Entidad {
		return new Entidad();
	}

	public flagsBoxes() {
		function crearFlagBox(label: string): JSX.Element {
			return (
				<span>
					<label htmlFor={ label }> { label }
						<input id={ label } type="checkbox" />
					</label>
				</span>
			);
		}
		return [
			crearFlagBox("Es intransitable"),
			crearFlagBox("Es opaco")
		];
	}

	public tiposOptions(): JSX.Element[] {
		return [
			<option value="ACTOR" key="ACTOR">ACTOR</option>,
			<option value="TERRENO" key="TERRENO">TERRENO</option>,
			<option value="FEATURE" key="FEATURE">FEATURE</option>
		];
	}

	// public guardarEntidad(): void {
	// 	if (this.esEntidadValida()) {
	// 		EntidadRepository.persistirEntidades();
	// 	} else {
	// 		console.log("entidad invalida");
	// 	}
	// }

	// public esEntidadValida(): boolean {
	// 	return store.state.tipo && store.state.nombreCompValido && store.state.renderCompValido && store.state.statsCompValido;
	// }
}
