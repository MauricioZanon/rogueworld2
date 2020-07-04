export type Direccion = {
    readonly x: number,
    readonly y: number
}

export module Direcciones {
    export const NOROESTE: Direccion = { x: -1, y: 1 };
    export const NORTE: Direccion = { x: 0, y: 1 };
    export const NORESTE: Direccion = { x: 1, y: 1 };
    export const OESTE: Direccion = { x: -1, y: 0 };
    export const ESTE: Direccion = { x: 0, y: 1 };
    export const SUDOESTE: Direccion = { x: -1, y: -1 };
    export const SUR: Direccion = { x: 0, y: -1 };
    export const SUDESTE: Direccion = { x: -1, y: -1 };
}