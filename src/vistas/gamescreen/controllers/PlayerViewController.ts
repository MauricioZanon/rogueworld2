import {Direcciones} from "@/mapa/Direcciones";
import store from "@/store/store";
import { Bump } from "@/entidades/acciones/Bump";
import router from "@/vistas/router/index";
import Entidad from '@/entidades/Entidad';

export default class PlayerViewController {

    public static resolverKeyDown(evento: KeyboardEvent): void {
        const player: Entidad = store.getters.player;
        switch(evento.code) {
            case "Numpad1": {
                Bump.ejecutar(player, Direcciones.SUDOESTE);
                break;
            }
            case "Numpad2": {
                Bump.ejecutar(player, Direcciones.SUR);
                break;
            }
            case "Numpad3": {
                Bump.ejecutar(player, Direcciones.SUDESTE);
                break;
            }
            case "Numpad4": {
                Bump.ejecutar(player, Direcciones.OESTE);
                break;
            }
            case "Numpad6": {
                Bump.ejecutar(player, Direcciones.ESTE);
                break;
            }
            case "Numpad7": {
                Bump.ejecutar(player, Direcciones.NOROESTE);
                break;
            }
            case "Numpad8": {
                Bump.ejecutar(player, Direcciones.NORTE);
                break;
            }
            case "Numpad9": {
                Bump.ejecutar(player, Direcciones.NORESTE);
                break;
            }
            case "Space":
                console.log(store.getters.player.posicion);
                break;
            case "Escape": {
                void router.push({name: "MainMenu"});
                break;
            }
            
        }
    }
}