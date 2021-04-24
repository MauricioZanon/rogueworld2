import React from "react";
import Mapa from "../../../mapa/Mapa";
import { Posicion, modificarTx, modificarTy } from "../../../mapa/Posicion";
import Tile from "../../../mapa/Tile";
import { state } from "../../../store/store";
import PlayerViewController from "../controllers/PlayerViewController";
import TileVC from "./TileVC";

export default class PlayerViewVC extends React.Component {

	private readonly listener = (evento: KeyboardEvent): void => PlayerViewController.resolverKeyDown(evento);

	render() {
		return (
			<div className="player-view" onWheelCapture={ this.cambiarZoom }>
				{this.generarTiles() }
			</div >
		);
	}
	private cambiarZoom(evento: any): void {
		// if (evento.deltaY > 0) {
		// 	store.commit("aumentarCantidadTiles");
		// } else {
		// 	store.commit("disminuirCantidadTiles");
		// }
	}

	private mapa(): Tile[][] {
		return Mapa.obtenerAreaCuadrada(
			this.pos00(),
			this.cantidadTiles(),
			this.cantidadTiles()
		);
	}

	private pos00(): Posicion {
		const resultado: Posicion = { ...state.player.posicion };
		const delta: number = Math.ceil(-(this.cantidadTiles() / 2));
		modificarTx(resultado, delta);
		modificarTy(resultado, delta);
		return resultado;
	}

	private tamañoTile(): number {
		return 100 / this.cantidadTiles();
	}

	private cantidadTiles(): number {
		return state.cantidadTiles;
	}

	private generarTiles(): JSX.Element[][] {
		return (
			this.mapa().map((columna, index) => this.generarColumna(columna, index))
		);
	}

	private generarColumna(columna: Tile[], indexColumna: number): JSX.Element[] {
		return columna.map((tile, indexFila) => {
			return <TileVC tamaño={ this.tamañoTile() } tile={ tile } key={ indexColumna + "-" + indexFila }></TileVC>;
		});
	}

	public componentdidMount() {
		window.addEventListener("keydown", this.listener);
	}

	public componentWillUnmount() {
		window.removeEventListener("keydown", this.listener);
	}

}