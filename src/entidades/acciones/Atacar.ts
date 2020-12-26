import Tile from "@/mapa/Tile";
import Entidad from "../Entidad";
import Acciones from "./Acciones";

export function atacar(actor: Entidad, tileObjetivo: Tile): void {
    tileObjetivo.actor = null;
}