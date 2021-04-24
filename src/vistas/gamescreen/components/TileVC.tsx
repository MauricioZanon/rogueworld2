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
			<div className="tile"
				onClick={ this.procesarClick }
				style={ this.estiloTile() }>
				<div className="ascii">{ this.simbolo() }</div>
			</div>
		);
	}

	private estiloTile(): CSSProperties {
		return {
			backgroundColor: this.colorFondo(),
			color: this.colorSimbolo(),
			width: this.tamañoTile(),
			height: this.tamañoTile(),
			fontSize: this.tamañoFuente()
		};
	};

	private simbolo(): string {
		return this.props.tile.actor?.renderComp.simbolo ??
			this.props.tile.feature?.renderComp.simbolo ??
			this.props.tile.terreno?.renderComp.simbolo ??
			"¿";
	}

	private colorSimbolo(): string {
		return this.props.tile.actor?.renderComp.colorSimbolo ||
			this.props.tile.feature?.renderComp.colorSimbolo ||
			this.props.tile.terreno?.renderComp.colorSimbolo ||
			"#fff";
	}

	private colorFondo(): string {
		return this.props.tile.terreno?.renderComp.colorFondo || "#000";
	}

	private tamañoTile(): string {
		return this.props.tamaño + "vh";
	}

	private tamañoFuente(): string {
		return this.props.tamaño * 0.8 + "vh";
	}

	private procesarClick(): void {
		const player: Entidad = state.player;
		console.log(Direcciones.obtenerDireccionDesde(player.posicion, this.props.tile.posicion));
	}

}
