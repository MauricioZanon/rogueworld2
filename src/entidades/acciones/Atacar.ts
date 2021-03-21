import Tile from "@/mapa/Tile";
import store from "@/store/store";
import { MensajeConsola } from "@/vistas/gamescreen/utils/MensajeConsola";
import Entidad from "../Entidad";
import Acciones from "./Acciones";

export function atacar(actor: Entidad, tileObjetivo: Tile): void {
    const actorObjetivo: Entidad = tileObjetivo.actor;
    const dañoTotal = actor.statsComp.base.STR;
    actorObjetivo.statsComp.salud.actual -= dañoTotal;
    if(actorObjetivo.statsComp.salud.actual <= 0) {
        Acciones.morir(actorObjetivo);
        const mensaje: MensajeConsola = crearMensajeDeMuerte(actor, actorObjetivo);
        store.commit("agregarMensajeALaConsola", mensaje);
        console.log(`Has matado al ${actorObjetivo.nombreComp.nombre}!`);
    }
}

function crearMensajeDeMuerte(atacante: Entidad, objetivo: Entidad): MensajeConsola {
    const mensaje = new MensajeConsola();
    const nombreAtacante = atacante.nombreComp.nombre;
    const nombreObjetivo = objetivo.nombreComp.nombre;
    mensaje.agregar({texto: nombreAtacante, color: "blue", negrita: true},
                    {texto: " ha matado al ", color: "white"},
                    {texto: nombreObjetivo, color: "red", negrita: true},
                    {texto: "!", color: "white"});

    return mensaje;
}
