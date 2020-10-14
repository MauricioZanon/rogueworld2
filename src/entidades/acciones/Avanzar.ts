import Entidad from "../Entidad";
import Tile from "@/mapa/Tile";

export module Avanzar {

	export function ejecutar(actor: Entidad, tileOrigen: Tile, tileDestino: Tile): void {
		if(!tileDestino.terreno.esIntransitable){
			tileOrigen.actor = null;
			tileDestino.colocarActor(actor);
		}
	}

}