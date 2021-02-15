import Mapa from "@/mapa/Mapa";
import Entidad from "../Entidad";

export function morir(entidad: Entidad): void {
    Mapa.obtenerTile(entidad.posicion).actor = null;
}