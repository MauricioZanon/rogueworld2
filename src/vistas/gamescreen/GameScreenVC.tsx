import * as PIXI from "pixi.js";
import React, { useEffect, useState } from 'react';
import Entidad from '../../entidades/Entidad';
import EntidadFactory from '../../entidades/EntidadFactory';
import Mapa from '../../mapa/Mapa';
import { PosicionLocal, modificarTx, modificarTy } from '../../mapa/Posicion';
import Tile from '../../mapa/Tile';
import { crearMundoInicial } from '../../mapa/builder/WorldBuilder';
import { useStore } from '../../store/store';
import SideBarVC from './components/SideBarVC';
import PlayerViewController from './controllers/PlayerViewController';
import './estilosGameScreen.css';

let app: PIXI.Application;

let cantidadTilesX: number;
let cantidadTilesY: number;
let fondos: PIXI.Graphics[][];
let simbolos: PIXI.Text[][];

export default function GameScreenVC(): JSX.Element {

	// Esto está como parche para que funcione el hot reload
	if(!useStore((state) => state.player)) {
		crearMundoInicial();
		useStore.getState().usarComoPlayer(EntidadFactory.crearEntidad('player'));
	}
 
	//TODO remover listener al destruir componente
	window.addEventListener('keypress', PlayerViewController.resolverKeyDown);

	// tamañoTiles debe ser un número par
	const [tamañoTiles, setTamañoTiles] = useState(18);
	const player: Entidad = useStore((state) => state.player);
	
	useEffect(() => {
		if (!app) {
			crearApp();
			calcularCantidadDeTiles();
			inicializarFondos();
			inicializarSimbolos();
			app.ticker.add(dibujarTiles);
		}
	});
	
	function crearApp() {
		app = new PIXI.Application({
			antialias: true,
		});
		app.stage.on("click", () => console.log("asdasd"));
		document.getElementById("player-view-container").appendChild(app.view as unknown as Node);
	}
	
	function calcularCantidadDeTiles() {
		cantidadTilesX = app.view.width / tamañoTiles;
		cantidadTilesY = app.view.height / tamañoTiles;
	}
	
	function inicializarFondos(): void {
		fondos = [];
		for (let i = 0; i < cantidadTilesX; i++) {
			fondos[i] = [];
			for (let j = 0; j < cantidadTilesY; j++) {
				const fondo = new PIXI.Graphics();
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
		for (let i = 0; i < cantidadTilesX; i++) {
			simbolos[i] = [];
			for (let j = 0; j < cantidadTilesY; j++) {
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
	
	function dibujarTiles(): void {
		const tiles = obtenerMapa();
		for (let i = 0; i < tiles.length; i++) {
			for (let j = 0; j < tiles[0].length; j++) {
				const tile = tiles[i][j];
				if(player.visionComp.tilesVisibles?.includes(tile)) {
					actualizarFondo(tile, i, j);
					actualizarAscii(tile, i, j);
				} else {
					borrarTile(i, j);
				}
			}
		}
	}
	
	function obtenerMapa(): Tile[][] {
		return Mapa.obtenerAreaCuadrada(calcularPos00(), cantidadTilesY, cantidadTilesX);
	}
	
	function calcularPos00(): PosicionLocal {
		const resultado: PosicionLocal = { ...player.posicion };
		const deltaX: number = Math.ceil(-(cantidadTilesX / 2));
		const deltaY: number = Math.ceil(-(cantidadTilesY / 2));
		modificarTx(resultado, deltaX);
		modificarTy(resultado, deltaY);
		return resultado;
	}
	
	function actualizarFondo(tile: Tile, x: number, y: number): void {
		const color = Number(`0x${ tile.colorFondo.substring(1, 7) }`);
		fondos[x][y].clear()
			.beginFill(color)
			.drawRect(tamañoTiles * x, tamañoTiles * y, tamañoTiles, tamañoTiles)
			.endFill();
	}
	
	function actualizarAscii(tile: Tile, x: number, y: number): void {
		const ascii = simbolos[x][y];
		ascii.text = tile.simbolo;
		ascii.style.fill = tile.colorSimbolo;
		ascii.style.dropShadow = !!tile.actor;
	}
	
	function borrarTile(x: number, y: number): void {
		fondos[x][y].clear();
		simbolos[x][y].text = "";
	}
	
	return (
		<>
			<slot id='player-view-container' />
			<SideBarVC />
		</>
	);

}
