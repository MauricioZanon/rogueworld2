import {Direcciones} from "@/mapa/Direcciones";
import store from "@/store/store";
import { Bump } from "@/entidades/acciones/Bump";

export default class PlayerViewController {

    public static resolverKeyPress(evento: KeyboardEvent): void {
        console.log(evento);
        switch(evento.code) {
            case "Numpad4": Bump.ejecutar(store.state.player, Direcciones.OESTE);
        }
    }
}