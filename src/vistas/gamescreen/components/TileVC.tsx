import React from 'react';
import { CSSProperties } from 'styled-components';
import Tile from '../../../mapa/Tile';

type TileProps = {
	tile: Tile,
	tamaño: number,
};

export default function TileVC(props: TileProps): JSX.Element {

	function generarEstilos(): CSSProperties {
		const tile = props.tile;
		return {
			backgroundColor: tile.colorFondo,
			color: tile.colorSimbolo,
			fontSize: obtenerTamañoFuente(),
			width: obtenerTamañoTile(),
			height: obtenerTamañoTile(),
		};
	}

	function obtenerTamañoTile(): string {
		return props.tamaño + 'vh';
	}

	function obtenerTamañoFuente(): string {
		return (props.tamaño * 0.8) + 'vh';
	}

	return (
		<div className="tile" style={ generarEstilos() }>
			<div className="ascii">{ props.tile.simbolo }</div>
		</div>
	);
}
