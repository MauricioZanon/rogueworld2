import Tile from "@/mapa/Tile";
import Entidad from "../Entidad";

const acciones: Acciones = {};

export default acciones;

type Acciones = {
    atacar?: (actor: Entidad, tileObjetivo: Tile) => void,
    avanzar?: (actor: Entidad, tileOrigen: Tile, tileDestino: Tile) => void,
    ascender?: (actor: Entidad) => void,
    descender?: (actor: Entidad) => void,

}