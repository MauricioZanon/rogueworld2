import Acciones from "../../../entidades/acciones/Acciones";
import Entidad from "../../../entidades/Entidad";
import { SUDOESTE, SUR, SUDESTE, OESTE, ESTE, NOROESTE, NORTE, NORESTE } from "../../../mapa/Direcciones";
import { MensajeConsola } from "../utils/MensajeConsola";
import { agregarMensajeALaConsola, state } from '../../../store/store';

export type EventoMouse = "mouseup" | "mousedown";

export default class PlayerViewController {

    public static resolverKeyDown(evento: KeyboardEvent): void {
        const mensaje: MensajeConsola = new MensajeConsola();
        const player: Entidad = state.player;
        switch (evento.code) {
            case "Numpad1": {
                Acciones.bump(player, SUDOESTE);
                break;
            }
            case "Numpad2": {
                Acciones.bump(player, SUR);
                break;
            }
            case "Numpad3": {
                Acciones.bump(player, SUDESTE);
                break;
            }
            case "Numpad4": {
                Acciones.bump(player, OESTE);
                break;
            }
            case "Numpad6": {
                Acciones.bump(player, ESTE);
                break;
            }
            case "Numpad7": {
                Acciones.bump(player, NOROESTE);
                break;
            }
            case "Numpad8": {
                Acciones.bump(player, NORTE);
                break;
            }
            case "Numpad9": {
                Acciones.bump(player, NORESTE);
                break;
            }
            case "Space":
                mensaje.agregar({ texto: "Mensaje", color: "red", negrita: true },
                    { texto: "Mensaje", color: "purple", negrita: true },
                    { texto: "Mensaje", color: "green", negrita: true },
                    { texto: "Mensaje", color: "yellow", negrita: true },
                    { texto: "Mensaje", color: "blue", negrita: true },
                    { texto: "Mensaje" });
                agregarMensajeALaConsola(mensaje);
                break;
            case "Escape": {
                // cambiarVista("menu principal");
                break;
            }
            case "IntlBackslash": {
                if (evento.shiftKey) {
                    Acciones.descender(player);
                } else {
                    Acciones.ascender(player);
                }
                break;
            }
            default: {
                console.log(evento.code);
            }

        }
    }

    public static resolverEventoMouse(nombreEvento: EventoMouse): void {
        switch (nombreEvento) {
            case "mousedown":
                break;
            case "mouseup":
                break;
        }
    }
}