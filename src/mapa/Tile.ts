import Entidad from "@/entidades/Entidad";
import { Tipos } from "@/entidades/Tipos";
import { Posicion } from "./Posicion";

export default class Tile {
    public readonly posicion: Posicion;
    public terreno: Entidad = null;
    public items: Set<Entidad> = new Set();
    public actor?: Entidad = null;

    public constructor(posicion: Posicion) {
        this.posicion = posicion;
    }

    public remover(entidad: Entidad): void {
        switch(entidad.tipo){
            case Tipos.ACTOR: {
                this.actor = null;
                break;
            }
            case Tipos.TERRENO: {
                this.terreno = null;
                break;
            }
            case Tipos.ITEM: {
                this.items.delete(entidad);
                break;
            }
        }
    }

    public removerActor(): void{
        this.actor = null;
    }

    public colocarActor(actor: Entidad): void {
        if(actor.tipo === Tipos.ACTOR) {
            this.actor = actor;
            actor.posicion = this.posicion;
        } else {
            throw new Error("Se intentó colocar una entidad no actor en el slot de actor " + actor);
        }
    }

    public toString(): string {
        let mensaje: string;
        if (this.actor != null) {
            mensaje = this.actor.nombreComp.nombre;
        } else if (this.terreno != null) {
            mensaje = this.terreno.nombreComp.nombre;
        } else {
            mensaje = "There's nothing here";
        }
        return mensaje
    }

}