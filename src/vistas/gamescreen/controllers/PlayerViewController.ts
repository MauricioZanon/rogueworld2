import store from "@/store/store";
import { Bump } from "@/entidades/acciones/Bump";
import router from "@/vistas/router/index";
import Entidad from "@/entidades/Entidad";
import { SUDOESTE, SUR, SUDESTE, OESTE, ESTE, NOROESTE, NORTE, NORESTE } from "../../../mapa/Direcciones";
import Acciones from "@/entidades/acciones/Acciones";

export type EventoMouse = "mouseup" | "mousedown";

export default class PlayerViewController {

    public static resolverKeyDown(evento: KeyboardEvent): void {
        const player: Entidad = store.getters.player;
        switch(evento.code) {
            case "Numpad1": {
                Bump.ejecutar(player, SUDOESTE);
                break;
            }
            case "Numpad2": {
                Bump.ejecutar(player, SUR);
                break;
            }
            case "Numpad3": {
                Bump.ejecutar(player, SUDESTE);
                break;
            }
            case "Numpad4": {
                Bump.ejecutar(player, OESTE);
                break;
            }
            case "Numpad6": {
                Bump.ejecutar(player, ESTE);
                break;
            }
            case "Numpad7": {
                Bump.ejecutar(player, NOROESTE);
                break;
            }
            case "Numpad8": {
                Bump.ejecutar(player, NORTE);
                break;
            }
            case "Numpad9": {
                Bump.ejecutar(player, NORESTE);
                break;
            }
            case "Space":
                console.log(store.getters.player.posicion);
                break;
            case "Escape": {
                void router.push({name: "MainScreen"});
                break;
            }
            case "IntlBackslash": {
                if(evento.shiftKey){
                    Acciones.descender(player);
                }else {
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
        switch(nombreEvento) {
            case "mousedown":
                break;
            case "mouseup":
                break;
        }
    }
}