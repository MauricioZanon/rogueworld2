import Entidad from "../Entidad";
import Tile from "@/mapa/Tile";

export default (actor: Entidad, tileOrigen: Tile, tileDestino: Tile): void => {
	if(!tileDestino.terreno.flags.has("INTRANSITABLE")){
		tileOrigen.actor = null;
		tileDestino.actor = actor;
	}
}