import { Graphics } from '@pixi/graphics';
import * as PIXI from 'pixi.js';
import React, { useEffect, useState } from 'react';
import Mapa from '../../../mapa/Mapa';
import { Posicion, modificarTx, modificarTy } from '../../../mapa/Posicion';
import Tile from '../../../mapa/Tile';
import $ from "jquery";

type PlayerViewProps = {
	centroPantalla: Posicion;
};

let app: PIXI.Application;

let cantidadTilesX: number;
let cantidadTilesY: number;
let fondos: Graphics[][];
let simbolos: PIXI.Text[][];

export default function PlayerViewVC(props: PlayerViewProps): JSX.Element {

	const [tamañoTiles, setTamañoTiles] = useState(25);

	useEffect(() => {
		if (!app) {
			crearApp();
			calcularCantidadDeTiles();
			inicializarFondos();
			inicializarSimbolos();
		}
		generarTiles();
	});

	function crearApp() {
		app = new PIXI.Application({
			antialias: true,
			view: $(".player-view")[0] as HTMLCanvasElement,
		});
		document.body.appendChild(app.view);
	}

	function calcularCantidadDeTiles() {
		cantidadTilesX = app.view.width / tamañoTiles;
		cantidadTilesY = app.view.height / tamañoTiles;
	}

	function inicializarFondos(): void {
		fondos = [];
		for (let i = 0;i < cantidadTilesX;i++) {
			fondos[i] = [];
			for (let j = 0;j < cantidadTilesY;j++) {
				const fondo = new Graphics();
				fondo.beginFill(0x000000);
				fondo.drawRect(tamañoTiles * i, tamañoTiles * j, tamañoTiles, tamañoTiles);
				fondo.endFill();
				app.stage.addChild(fondo);
				fondos[i][j] = fondo;
			}
		}
	}

	function inicializarSimbolos(): void {
		simbolos = [];
		for (let i = 0;i < cantidadTilesX;i++) {
			simbolos[i] = [];
			for (let j = 0;j < cantidadTilesY;j++) {
				const ascii = new PIXI.Text("");
				ascii.position.set(tamañoTiles * i, tamañoTiles * j);
				fondos[i][j].addChild(ascii);
				simbolos[i][j] = ascii;
			}
		}
	}

	function generarTiles(): void {
		const tiles = obtenerMapa();

		for (let i = 0;i < tiles.length;i++) {
			for (let j = 0;j < tiles[0].length;j++) {
				const tile = tiles[i][j];

				actualizarFondo(tile, tamañoTiles, i, j);
				actualizarAscii(tile, tamañoTiles, i, j);

			}
		}
	}

	function obtenerMapa(): Tile[][] {
		return Mapa.obtenerAreaCuadrada(pos00(), cantidadTilesY, cantidadTilesX);
	}

	function pos00(): Posicion {
		const resultado: Posicion = { ...props.centroPantalla };
		const deltaX: number = Math.ceil(-(cantidadTilesX / 2));
		const deltaY: number = Math.ceil(-(cantidadTilesY / 2));
		modificarTx(resultado, deltaX);
		modificarTy(resultado, deltaY);
		return resultado;
	}

	function actualizarFondo(tile: Tile, tamaño: number, i: number, j: number): Graphics {
		const color = Number(`0x${ tile.colorFondo.substr(1, 6) }`);
		const fondo = fondos[i][j] || new Graphics();
		fondo.clear();
		fondo.beginFill(color);
		fondo.drawRect(tamaño * i, tamaño * j, tamaño, tamaño);
		fondo.endFill();
		return fondo;
	}

	function actualizarAscii(tile: Tile, tamaño: number, i: number, j: number): PIXI.Text {
		const ascii = simbolos[i][j] || new PIXI.Text("");
		ascii.text = tile.simbolo;
		ascii.style = {
			fill: tile.colorSimbolo,
			fontFamily: "Courier New",
			align: "center",
			fontSize: tamaño,
		};
		ascii.anchor.x = -0.5;
		return ascii;
	}

	return <canvas className="player-view" onWheelCapture={ () => setTamañoTiles(35) }></canvas >;

}
