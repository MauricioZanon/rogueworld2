import Tile from "@/mapa/Tile";
import Entidad from "../Entidad";
import Acciones from "./Acciones";

export function atacar(actor: Entidad, tileObjetivo: Tile): void {
    const actorObjetivo: Entidad = tileObjetivo.actor;
    const dañoTotal = actor.statsComp.base.STR;
    actorObjetivo.statsComp.salud.actual -= dañoTotal;
    if(actorObjetivo.statsComp.salud.actual <= 0) {
        Acciones.morir(actorObjetivo);
        console.log(`Has matado al ${actorObjetivo.nombreComp.nombre}!`);
    }
}