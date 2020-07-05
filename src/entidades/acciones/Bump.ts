import Entidad from "../Entidad"
import { Direccion } from "@/mapa/Direcciones"

export module Bump {
    export function ejecutar(actor: Entidad, direccion: Direccion): void{
        console.log(actor);
        console.log(direccion);
    }
}