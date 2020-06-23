import Entidad from '@/entities/Entidad';

export default class Tile {
    posicion: [number, number, number];
    terreno: Entidad;
    items: Entidad[] = [];
    actor: Entidad;

    constructor(posicion: [number, number, number]) {
        this.posicion = posicion;
    }

    getSimbolo(): string {
        if (this.actor) {
            return this.actor.renderComp.simbolo;
        }
        else if (this.items.length) {
            return this.items[0].renderComp.simbolo;
        }
        else if (this.terreno) {
            return this.terreno.renderComp.simbolo;
        }
        return "¿";
    }

    getColorSimbolo(): string {
        if (this.actor) {
            return this.actor.renderComp.colorSimbolo;
        }
        else if (this.items.length) {
            return this.items[0].renderComp.colorSimbolo;
        }
        else if (this.terreno) {
            return this.terreno.renderComp.colorSimbolo;
        }
    }

    getColorFondo(): string {
        return this.terreno?.renderComp?.colorFondo;
    }

    toString(): string {
        let mensaje: string;
        if (this.actor) {
            mensaje = this.actor.nombreComp.nombre;
        }
        else if (this.items.length) {
            mensaje = this.items[0].nombreComp.nombre;
            if (this.items.length > 1) {
                mensaje.concat(" and several more items")
            }
        }
        else if (this.terreno) {
            mensaje = this.terreno.nombreComp.nombre;
        }
        else {
            mensaje = "There's nothing here";
        }
        return mensaje
    }


}