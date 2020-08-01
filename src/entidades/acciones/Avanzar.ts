import Entidad from "../Entidad";
import Tile from "@/mapa/Tile";

export module Avanzar {

	export function ejecutar(actor: Entidad, tileOrigen: Tile, tileDestino: Tile): void {
		if(tileDestino.terreno.esTransitable){
			tileOrigen.removerActor();
			tileDestino.colocarActor(actor);
		}
	}

}