import Entidad from "../Entidad"
import { Direccion } from "@/mapa/Direcciones"
import Mapa from "@/mapa/Mapa";
import Tile from "@/mapa/Tile";
import Acciones from "./Acciones";
import "./Avanzar";

export module Bump {
    export function ejecutar(actor: Entidad, direccion: Direccion): void {
        const tileOrigen: Tile = Mapa.obtenerTile(actor.posicion);
        const tileDestino: Tile = Mapa.obtenerTile(actor.posicion, direccion);
        if(tileDestino.actor) {
            Acciones.atacar(actor, tileDestino);
        } else {
            console.log(Acciones);
            Acciones.avanzar(actor, tileOrigen, tileDestino);
        }
    }
}