import Entidad from "@/entidades/Entidad";

export default class Tile {
    public posicion: [number, number, number];
    public terreno: Entidad;
    public items: Entidad[] = [];
    public actor?: Entidad;

    public constructor(posicion: [number, number, number]) {
        this.posicion = posicion;
    }

    public getSimbolo(): string {
        return this.actor?.renderComp.simbolo || this.items[0]?.renderComp.simbolo || this.terreno?.renderComp.simbolo || "¿";
    }

    public getColorSimbolo(): string {
        return this.actor?.renderComp.colorSimbolo || this.items[0]?.renderComp.colorSimbolo || this.terreno?.renderComp.colorSimbolo || "#ffffff";
    }

    public getColorFondo(): string {
        return this.terreno?.renderComp.colorFondo || "#ffffff";
    }

    public toString(): string {
        let mensaje: string;
        if (this.actor != null) {
            mensaje = this.actor.nombreComp.nombre;
        } else if (this.items.length) {
            mensaje = this.items[0].nombreComp.nombre;
            if (this.items.length > 1) {
                mensaje.concat(" and several more items")
            }
        } else if (this.terreno != null) {
            mensaje = this.terreno.nombreComp.nombre;
        } else {
            mensaje = "There's nothing here";
        }
        return mensaje
    }


}