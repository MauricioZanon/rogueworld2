/** Guarda la distancia desde un tile origen hasta los tiles cercanos para acelerar el shadow casting  */
const distancias = crearTablaDeDistancias();
// private static HashMap<Direction, int[]> octantsByDirection = createOctantsByDirections();

import Entidad from '../../entidades/Entidad';
import { VisionComp } from '../../entidades/componentes-de-entidades/VisionComp';
import Mapa from '../../mapa/Mapa';
import { PosicionGlobal, obtenerGlobal, obtenerLocal } from '../../mapa/Posicion';
import Tile from '../../mapa/Tile';

type Slope = {
	X: number
	Y: number
}

/*
	 * OCTANTES:	RECORRIDO (desde el centro hacia el extremo)
	 *  \2 1/		  \> </
	 *  3\ /0		  V\ /V
	 * 	4/ \7		  ^/ \^
	 *  /5 6\		  /> <\
	 */
// private static HashMap<Direction, int[]> createOctantsByDirections() {
// 	HashMap<Direction, int[]> map = new HashMap<>();
// 	map.put(Direction.N, new int[] {7, 0, 1, 2, 3, 4});
// 	map.put(Direction.NW, new int[] {0, 1, 2, 3, 4, 5});
// 	map.put(Direction.W, new int[] {1, 2, 3, 4, 5, 6});
// 	map.put(Direction.SW, new int[] {2, 3, 4, 5, 6, 7});
// 	map.put(Direction.S, new int[] {3, 4, 5, 6, 7, 0});
// 	map.put(Direction.SE, new int[] {4, 5, 6, 7, 0, 1});
// 	map.put(Direction.E, new int[] {5, 6, 7, 0, 1, 2});
// 	map.put(Direction.NE, new int[] {6, 7, 0, 1, 2, 3});
		
// 	return map;
// }

//TODO hacer que los NPC solo calculen la vision de los tiles con alguna entidad importante
export function calcularFOV(entity: Entidad): void {
	const vc: VisionComp = entity.visionComp;
	vc.tilesVisibles = [];
	
	const origin: Tile = Mapa.obtenerTile(entity.posicion);
	vc.tilesVisibles.push(origin);
		
	// int[] octants = octantsByDirection.get(vc.faceDir);
	// for(int i = 0; i < octants.length; i++) {
	// 	compute(octants[i], origin, vc.sightRange, 1, new Slope(1, 1), new Slope(1, 0), isTranslucent, addToVisionMap);
	// }
	for(let i = 0; i < 8; i++) {
		compute(i, origin, vc, 1, {X: 1, Y: 1}, {X: 1, Y: 0});
	}
}

function esOpaco(tile: Tile): boolean {
	return tile?.terreno.flags.has("OPACO");
}

const correccionSlopeInicial = 0.15;
const correccionNuevoSlope = 0.25;
	
function compute(octant: number, origin: Tile, vc: VisionComp, x: number, top: Slope, bottom: Slope) {
	const {rango, tilesVisibles} = vc;

	while(x <= rango) {
		const topY = top.X == 1 ? x : Math.round(((((x * 2) + correccionSlopeInicial) * top.Y) + top.X - correccionSlopeInicial) / (top.X * 2));
		const bottomY = bottom.Y == 0 ? 0 : Math.round(((((x * 2) - correccionSlopeInicial) * bottom.Y) + bottom.X) / (bottom.X * 2));
		
		let brokeCondition = -1; // 0:false, 1:true, -1:not applicable
		for (let y = topY; y >= bottomY; y--) {
			const posGlobal = obtenerGlobal(origin.posicion);
			
			switch (octant) {
				case 0:
					posGlobal.x += x;
					posGlobal.y -= y;
					break;
				case 1:
					posGlobal.x += y;
					posGlobal.y -= x;
					break;
				case 2:
					posGlobal.x -= y;
					posGlobal.y -= x;
					break;
				case 3:
					posGlobal.x -= x;
					posGlobal.y -= y;
					break;
				case 4:
					posGlobal.x -= x;
					posGlobal.y += y;
					break;
				case 5:
					posGlobal.x -= y;
					posGlobal.y += x;
					break;
				case 6:
					posGlobal.x += y;
					posGlobal.y += x;
					break;
				case 7:
					posGlobal.x += x;
					posGlobal.y += y;
					break;
			}
			
			const evaluatedTile: Tile = Mapa.obtenerTile(obtenerLocal(posGlobal));
			if(!tilesVisibles.includes(evaluatedTile)) {
				tilesVisibles.push(evaluatedTile);
			}

			if (x <= rango) {
				if (esOpaco(evaluatedTile)) {
					if (brokeCondition == 0) {
						const newBottom: Slope = {X: (x) + correccionNuevoSlope, Y: (y) + correccionNuevoSlope};
						if (y == bottomY) {
							bottom = newBottom;
							break;
						} else {
							compute(octant, origin, vc, x+1, top, newBottom);
						}
					}
					brokeCondition = 1;
				} else {
					if (brokeCondition == 1){
						top = {X: (x) + correccionNuevoSlope, Y: (y) + correccionNuevoSlope};
					}
					brokeCondition = 0;
				}
			}
		}

		if (brokeCondition != 0) {
			break; // if the column ended in a clear tile, continue processing the current sector
		}
		x++;
	}
}
	
function crearTablaDeDistancias(): number[][] {
	const tabla = [];
		
	for(let x = 0; x < 40; x++) {
		tabla[x] = [];
		for(let y = 0; y < 40; y++) {
			tabla[x][y] = Math.sqrt((x*x) + (y*y));
		}
	}
		
	return tabla;
}
	
// function obtenerDistancia(pos1: PosicionGlobal, pos2: PosicionGlobal) {
// 	return distancias[Math.abs(pos1.x - pos2.x)][Math.abs(pos1.y - pos2.y)];
// }

