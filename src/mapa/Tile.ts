import Entidad from "../entidades/Entidad";
import { Tipo } from "../entidades/Tipos";
import { Posicion } from "./Posicion";

export default class Tile {
    public readonly posicion: Posicion;
    public terreno?: Entidad = null;
    public feature?: Entidad = null;
    public items: Set<Entidad> = new Set();
    private _actor: Entidad = null;

    public constructor(posicion: Posicion) {
        this.posicion = posicion;
    }

    public get actor(): Entidad {
        return this._actor;
    }

    public set actor(actor: Entidad) {
        if (!actor) {
            this._actor = null;
        } else if (actor.tipo === Tipo.ACTOR) {
            this._actor = actor;
            actor.posicion = this.posicion;
        } else {
            console.log(actor);
            throw new Error("Se intentó colocar una entidad no actor en el slot de actor " + actor.nombreComp.nombre);
        }
    }

    public toString(): string {
        return this.actor?.nombreComp.nombre ||
            this.feature?.nombreComp.nombre ||
            this.terreno?.nombreComp.nombre ||
            "There's nothing here";
    }

}