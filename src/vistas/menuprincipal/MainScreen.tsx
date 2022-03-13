import React, { MouseEventHandler } from 'react';
import EntidadFactory from '../../entidades/EntidadFactory';
import { crearMundoInicial } from '../../mapa/builder/WorldBuilder';
import './styles.css';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/store';

export default class MainScreen extends React.Component {
	public render(): JSX.Element {
		return (
			<div className="menu">
				{ this.crearBoton('New game', 'game screen', 'boton-new-game', this.comenzarNuevoJuego) }
				<button className="boton boton-load-game">Load game</button>
				{ this.crearBoton('Entity creator', 'creador de entidades', 'boton-creador-de-entidades') }
				<button className="boton boton-salir">Exit</button>
			</div>
		);
	}

	private crearBoton(texto: string, path: string, clases: string, funcionOnclick?: MouseEventHandler): JSX.Element {
		return (
			<button onClick={ funcionOnclick } className={ 'boton ' + clases }>
				<Link to={ path }>
					{ texto }
				</Link>
			</button>
		);
	}

	private comenzarNuevoJuego(): void {
		useStore.getState().usarComoPlayer(EntidadFactory.crearEntidad('player'));
		crearMundoInicial();
	}
}
