import React from "react";
import Entidad from "../../../entidades/Entidad";
import { Direcciones } from "../../../mapa/Direcciones";
import Tile from "../../../mapa/Tile";
import { state } from '../../../store/store';
import { CSSProperties } from 'styled-components';

type TileProps = {
	tile: Tile,
	tamaño: number,
};

export default class TileVC extends React.Component<TileProps> {

	public render(): JSX.Element {
		return (
			<div className="tile" onClick={ this.procesarClick } style={ this.generarEstilos() }>
				<div className="ascii">{ this.obtenerSimbolo() }</div>
			</div>
		);
	}

	private generarEstilos(): CSSProperties {
		return {
			backgroundColor: this.obtenerColorFondo(),
			color: this.obtenerColorSimbolo(),
			fontSize: this.obtenerTamañoFuente(),
			width: this.obtenerTamañoTile(),
			height: this.obtenerTamañoTile()
		};
	};

	private obtenerSimbolo(): string {
		return this.props.tile.actor?.renderComp.simbolo ??
			this.props.tile.feature?.renderComp.simbolo ??
			this.props.tile.terreno?.renderComp.simbolo ??
			"¿";
	}

	private obtenerColorSimbolo(): string {
		return this.props.tile.actor?.renderComp.colorSimbolo ||
			this.props.tile.feature?.renderComp.colorSimbolo ||
			this.props.tile.terreno?.renderComp.colorSimbolo ||
			"#fff";
	}

	private obtenerColorFondo(): string {
		return this.props.tile.terreno?.renderComp.colorFondo || "#000";
	}

	private obtenerTamañoTile(): string {
		return this.props.tamaño + "vh";
	}

	private obtenerTamañoFuente(): string {
		return this.props.tamaño * 0.8 + "vh";
	}

	private procesarClick(): void {
		const player: Entidad = state.player;
		console.log(Direcciones.obtenerDireccionDesde(player.posicion, this.props.tile.posicion));
	}

}