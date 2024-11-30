import Entidad from '../../entidades/Entidad';
import { VisionComp } from '../../entidades/componentes/VisionComp';
import Mapa from '../../mapa/Mapa';
import { obtenerGlobal, obtenerLocal } from '../../mapa/Posicion';
import Tile from '../../mapa/Tile';

type Slope = {
	X: number
	Y: number
}

/*
	OCTANTES:	RECORRIDO (desde el centro hacia el extremo)
	 \2 1/		  \> </
	 3\ /0		  V\ /V
		4/ \7		  ^/ \^
	 /5 6\		  /> <\
*/

//TODO hacer que los NPC solo calculen la vision de los tiles con alguna entidad importante
export function calcularFOV(entity: Entidad): void {
	const vc: VisionComp = entity.visionComp;
	vc.tilesVisibles = [];
	
	const origen: Tile = Mapa.obtenerTile(entity.posicion);
	vc.tilesVisibles.push(origen);
		
	for(let i = 0; i < 8; i++) {
		calcular(i, origen, vc, 1, {X: 1, Y: 1}, {X: 1, Y: 0});
	}
}

function esOpaco(tile: Tile): boolean {
	return tile?.terreno.flags.has("OPACO");
}

const correccionSlopeInicial = 0.15;
const correccionNuevoSlope = 0.25;
	
function calcular(octante: number, origen: Tile, vc: VisionComp, x: number, top: Slope, bottom: Slope) {
	const {rango, tilesVisibles} = vc;

	while(x <= rango) {
		const topY = top.X == 1 ? x : Math.round(((((x * 2) + correccionSlopeInicial) * top.Y) + top.X - correccionSlopeInicial) / (top.X * 2));
		const bottomY = bottom.Y == 0 ? 0 : Math.round(((((x * 2) - correccionSlopeInicial) * bottom.Y) + bottom.X) / (bottom.X * 2));
		
		let interrumpeVision = -1; // 0:false, 1:true, -1:not applicable
		for (let y = topY; y >= bottomY; y--) {
			const posGlobal = obtenerGlobal(origen.posicion);
			
			switch (octante) {
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
			
			const tileEvaluado: Tile = Mapa.obtenerTile(obtenerLocal(posGlobal));
			if(!tilesVisibles.includes(tileEvaluado)) {
				tilesVisibles.push(tileEvaluado);
			}

			if (x <= rango) {
				if (esOpaco(tileEvaluado)) {
					if (interrumpeVision == 0) {
						const newBottom: Slope = {X: (x) + correccionNuevoSlope, Y: (y) + correccionNuevoSlope};
						if (y == bottomY) {
							bottom = newBottom;
							break;
						} else {
							calcular(octante, origen, vc, x+1, top, newBottom);
						}
					}
					interrumpeVision = 1;
				} else {
					if (interrumpeVision == 1){
						top = {X: (x) + correccionNuevoSlope, Y: (y) + correccionNuevoSlope};
					}
					interrumpeVision = 0;
				}
			}
		}

		if (interrumpeVision != 0) {
			break; // if the column ended in a clear tile, continue processing the current sector
		}
		x++;
	}
}