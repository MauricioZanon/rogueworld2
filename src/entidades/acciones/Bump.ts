import Entidad from "../Entidad"
import { Direccion } from "@/mapa/Direcciones"
import {Avanzar} from "./Avanzar"
import Mapa from "@/mapa/Mapa";
import Tile from "@/mapa/Tile";

export module Bump {
    export function ejecutar(actor: Entidad, direccion: Direccion): void {
        const tileOrigen: Tile = Mapa.obtenerTile(actor.posicion);
        const tileDestino: Tile = Mapa.obtenerTile(actor.posicion, direccion);
        Avanzar.ejecutar(actor, tileOrigen, tileDestino);
    }
}