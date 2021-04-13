import { TAMAÑO_CHUNK } from "./Chunk";
import { Posicion } from "./Posicion";

export type Direccion = {
    readonly x: -1 | 0 | 1,
    readonly y: -1 | 0 | 1
}

export const NOROESTE: Direccion = { x: -1, y: -1 };
export const NORTE: Direccion = { x: 0, y: -1 };
export const NORESTE: Direccion = { x: 1, y: -1 };
export const OESTE: Direccion = { x: -1, y: 0 };
export const ESTE: Direccion = { x: 1, y: 0 };
export const SUDOESTE: Direccion = { x: -1, y: 1 };
export const SUR: Direccion = { x: 0, y: 1 };
export const SUDESTE: Direccion = { x: 1, y: 1 };
export module Direcciones {

    export function rotarEnSentidoHorario(direccion: Direccion, repeticiones = 1): Direccion {
        let resultado: Direccion = direccion;
        for(let i = 0; i < repeticiones; i++) {
            switch(resultado) {
                case NOROESTE:
                    resultado = NORTE;
                    break;
                case NORTE:
                    resultado = NORESTE;
                    break;
                case NORESTE:
                    resultado = ESTE;
                    break;
                case ESTE:
                    resultado = SUDESTE;
                    break;
                case SUDESTE:
                    resultado = SUR;
                    break;
                case SUR:
                    resultado = SUDOESTE;
                    break;
                case SUDOESTE:
                    resultado = OESTE;
                    break;
                case OESTE:
                    resultado = NOROESTE;
                    break;
            }
        }
        return resultado;
    }

    export function rotarEnSentidoAntihorario(direccion: Direccion, repeticiones = 1): Direccion {
        let resultado: Direccion = direccion;
        for(let i = 0; i < repeticiones; i++) {
            switch(resultado) {
                case NOROESTE:
                    resultado = OESTE;
                    break;
                case NORTE:
                    resultado = NOROESTE;
                    break;
                case NORESTE:
                    resultado = NORTE;
                    break;
                case ESTE:
                    resultado = NORESTE;
                    break;
                case SUDESTE:
                    resultado = ESTE;
                    break;
                case SUR:
                    resultado = SUDESTE;
                    break;
                case SUDOESTE:
                    resultado = SUR;
                    break;
                case OESTE:
                    resultado = SUDOESTE;
                    break;
            }
        }
        return resultado;
    }

    export function obtenerDireccionDesde(pos1: Posicion, pos2: Posicion): Direccion {
        const dirX = Math.sign(pos2.cx*TAMAÑO_CHUNK + pos2.tx - (pos1.cx*TAMAÑO_CHUNK + pos1.tx));
        const dirY = Math.sign(pos2.cy*TAMAÑO_CHUNK + pos2.ty - (pos1.cy*TAMAÑO_CHUNK + pos1.ty));

        return { x: dirX, y: dirY } as Direccion;
    }

}