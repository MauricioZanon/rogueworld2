import React, { MouseEventHandler } from "react";
import EntidadFactory from "../../entidades/EntidadFactory";
import { crearMundoInicial } from "../../mapa/builder/WorldBuilder";
import "./styles.css";
import { usarComoPlayer } from '../../store/store';
import { Link } from "react-router-dom";

export default class MainScreen extends React.Component {

	public render(): JSX.Element {
		return (
			<div className="menu">
				{ this.crearBoton("New game", "game screen", "boton-new-game", this.comenzarNuevoJuego) }
				<button className="boton boton-load-game">Load game</button>
				<button className="boton boton-creador-de-entidades">Entity creator</button>
				<button className="boton boton-salir">Exit</button>
			</div>
		);
	}

	private crearBoton(texto: string, path: string, clases: string, funcionOnclick: MouseEventHandler): JSX.Element {
		return (
			<button onClick={ funcionOnclick } className={ "boton " + clases }>
				<Link to={ path }>
					{ texto }
				</Link>
			</button>
		);
	}

	private comenzarNuevoJuego(): void {
		usarComoPlayer(EntidadFactory.crearEntidad("player"));
		crearMundoInicial();
	}

}
