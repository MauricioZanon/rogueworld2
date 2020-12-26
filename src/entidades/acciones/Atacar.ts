import Tile from "@/mapa/Tile";
import Entidad from "../Entidad";
import Acciones from "./Acciones";

Acciones.atacar = (actor: Entidad, tileObjetivo: Tile): void => {
    tileObjetivo.actor = null;
}