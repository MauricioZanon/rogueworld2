import Entidad from "../entidades/Entidad";
import { MensajeConsola } from "../vistas/gamescreen/utils/MensajeConsola";

export const state = {
    player: {} as Entidad,
    cantidadTiles: 25,
    mensajesConsola: [] as MensajeConsola[]
};

export function usarComoPlayer(nuevoPlayer: Entidad): void {
    state.player = nuevoPlayer;
}

export function aumentarCantidadTiles(): void {
    switch (state.cantidadTiles) {
        case 13:
            state.cantidadTiles = 25;
            break;
        case 25:
            state.cantidadTiles = 35;
            break;
    }
}

export function disminuirCantidadTiles(): void {
    switch (state.cantidadTiles) {
        case 35:
            state.cantidadTiles = 25;
            break;
        case 25:
            state.cantidadTiles = 13;
            break;
    }
}

export function agregarMensajeALaConsola(nuevoMensaje: MensajeConsola): void {
    state.mensajesConsola.unshift(nuevoMensaje);
};