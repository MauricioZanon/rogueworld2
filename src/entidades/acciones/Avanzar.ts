import Entidad from "../Entidad";
import Tile from "@/mapa/Tile";

export function avanzar(actor: Entidad, tileOrigen: Tile, tileDestino: Tile): void {
	if(!tileDestino.terreno.esIntransitable){
		tileOrigen.actor = null;
		tileDestino.colocarActor(actor);
	}
}