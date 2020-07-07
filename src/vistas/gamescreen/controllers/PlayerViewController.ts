import {Direcciones} from "@/mapa/Direcciones";
import store from "@/store/store";
import { Bump } from "@/entidades/acciones/Bump";
import router from "@/vistas/router/index";

export default class PlayerViewController {

    public static resolverKeyDown(evento: KeyboardEvent): void {
        switch(evento.code) {
            case "Numpad1": {
                Bump.ejecutar(store.state.player, Direcciones.SUDOESTE);
                break;
            }
            case "Numpad2": {
                Bump.ejecutar(store.state.player, Direcciones.SUR);
                break;
            }
            case "Numpad3": {
                Bump.ejecutar(store.state.player, Direcciones.SUDESTE);
                break;
            }
            case "Numpad4": {
                Bump.ejecutar(store.state.player, Direcciones.OESTE);
                break;
            }
            case "Numpad6": {
                Bump.ejecutar(store.state.player, Direcciones.ESTE);
                break;
            }
            case "Numpad7": {
                Bump.ejecutar(store.state.player, Direcciones.NOROESTE);
                break;
            }
            case "Numpad8": {
                Bump.ejecutar(store.state.player, Direcciones.NORTE);
                break;
            }
            case "Numpad9": {
                Bump.ejecutar(store.state.player, Direcciones.NORESTE);
                break;
            }
            case "Escape": {
                console.log("ir a main menu");
                void router.push({name: "MainMenu"});
                break;
            }
            
        }
    }
}