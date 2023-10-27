import { Graphics } from '@pixi/graphics';
import * as PIXI from 'pixi.js';
import React, { useEffect, useState } from 'react';
import Mapa from '../../../mapa/Mapa';
import { Posicion, modificarTx, modificarTy } from '../../../mapa/Posicion';
import Tile from '../../../mapa/Tile';
import $ from "jquery";
import { useStore } from '../../../store/store';
import Entidad from '../../../entidades/Entidad';

let app: PIXI.Application;

let cantidadTilesX: number;
let cantidadTilesY: number;
let fondos: Graphics[][];
let simbolos: PIXI.Text[][];

export default function PlayerViewVC(): JSX.Element {

	const [tamañoTiles, setTamañoTiles] = useState(25);
	const player: Entidad = useStore((state) => state.player);

	useEffect(() => {
		if (!app) {
			crearApp();
			calcularCantidadDeTiles();
			inicializarFondos();
			inicializarSimbolos();
			app.ticker.add(generarTiles);
		}
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
				ascii.anchor.set(0.5);
				ascii.x += tamañoTiles / 2;
				ascii.y += tamañoTiles / 2;
				ascii.style = {
					fontFamily: "\"Courier New\", Courier, monospace",
					fontWeight: "bolder",
					align: "center",
					fontSize: tamañoTiles,
					dropShadowAlpha: 0.66,
					dropShadowAngle: 0,
					dropShadowDistance: 2,
					padding: 55,
				};
				simbolos[i][j] = ascii;
				fondos[i][j].addChild(ascii);
			}
		}
	}

	function generarTiles(): void {
		const tiles = obtenerMapa();
		for (let i = 0;i < tiles.length;i++) {
			for (let j = 0;j < tiles[0].length;j++) {
				const tile = tiles[i][j];
				actualizarFondo(tile, i, j);
				actualizarAscii(tile, i, j);
			}
		}
	}

	function obtenerMapa(): Tile[][] {
		return Mapa.obtenerAreaCuadrada(calcularPos00(), cantidadTilesY, cantidadTilesX);
	}

	function calcularPos00(): Posicion {
		const centroPantalla = player.posicion;
		const resultado: Posicion = { ...centroPantalla };
		const deltaX: number = Math.ceil(-(cantidadTilesX / 2));
		const deltaY: number = Math.ceil(-(cantidadTilesY / 2));
		modificarTx(resultado, deltaX);
		modificarTy(resultado, deltaY);
		return resultado;
	}

	function actualizarFondo(tile: Tile, i: number, j: number): void {
		const color = Number(`0x${ tile.colorFondo.substring(1, 7) }`);
		fondos[i][j].clear()
			.beginFill(color)
			.drawRect(tamañoTiles * i, tamañoTiles * j, tamañoTiles, tamañoTiles)
			.endFill();
	}

	function actualizarAscii(tile: Tile, i: number, j: number): void {
		const ascii = simbolos[i][j];
		ascii.text = tile.simbolo;
		ascii.style.fill = tile.colorSimbolo;
		ascii.style.dropShadow = !!tile.actor;
	}

	return <canvas className="player-view" onWheelCapture={ () => setTamañoTiles(35) }></canvas >;

}
