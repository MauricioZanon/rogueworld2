import Tile from "@/mapa/Tile";
import Entidad from "../Entidad";
import Mapa from "@/mapa/Mapa";
import { Posicion } from "@/mapa/Posicion";

export module Ascender {

    export function ejecutar(actor: Entidad): void {
        const origen: Tile = Mapa.obtenerTile(actor.posicion);
        const destino: Tile = obtenerTileSuperior(origen);
        if(origen.feature?.nombreComp.nombre === "upstairs") {
            origen.actor = null;
            destino.colocarActor(actor);
        }
    }

}

function obtenerTileSuperior(origen: Tile): Tile {
    const posicionDestino: Posicion = { ...origen.posicion };
    posicionDestino.cz--;
    return Mapa.obtenerTile(posicionDestino);
}

