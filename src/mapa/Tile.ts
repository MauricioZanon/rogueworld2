import Entidad from "@/entidades/Entidad";
import { Tipo } from "@/entidades/Tipos";
import { Posicion } from "./Posicion";

export default class Tile {
    public readonly posicion: Posicion;
    public terreno?: Entidad = null;
    public feature?: Entidad = null;
    public items: Set<Entidad> = new Set();
    public actor?: Entidad = null;

    public constructor(posicion: Posicion) {
        this.posicion = posicion;
    }

    public colocarActor(actor: Entidad): void {
        if (actor.tipo === Tipo.ACTOR) {
            this.actor = actor;
            actor.posicion = this.posicion;
        } else {
            console.log(actor);
            throw new Error("Se intentó colocar una entidad no actor en el slot de actor " + actor.nombreComp.nombre);
        }
    }

    public toString(): string {
        if (this.actor != null) {
            return this.actor.nombreComp.nombre;
        } else if (this.feature != null) {
            return this.feature.nombreComp.nombre;
        } else if (this.terreno != null) {
            return this.terreno.nombreComp.nombre;
        } else {
            return "There's nothing here";
        }
    }

}