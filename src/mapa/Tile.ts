import Entidad from "../entidades/Entidad";
import { Tipo } from "../entidades/Tipos";
import { Posicion } from "./Posicion";

export default class Tile {
    public readonly posicion: Posicion;
    private _terreno?: Entidad = null;
    private _feature?: Entidad = null;
    private _actor: Entidad = null;

    public simbolo: string;
    public colorSimbolo: string;
    public colorFondo: string;

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
        this.actualizarGraficos();
    }

    public get terreno(): Entidad {
        return this._terreno;
    }

    public set terreno(terreno: Entidad) {
        if (!terreno) {
            this._terreno = null;
        } else if (terreno.tipo === Tipo.TERRENO) {
            this._terreno = terreno;
        } else {
            console.log(terreno);
            throw new Error("Se intentó colocar una entidad no terreno en el slot de terreno " + terreno.nombreComp.nombre);
        }
        this.actualizarGraficos();
    }

    public get feature(): Entidad {
        return this._feature;
    }

    public set feature(feature: Entidad) {
        if (!feature) {
            this._feature = null;
        } else if (feature.tipo === Tipo.FEATURE) {
            this._feature = feature;
        } else {
            console.log(feature);
            throw new Error("Se intentó colocar una entidad no feature en el slot de feature " + feature.nombreComp.nombre);
        }
        this.actualizarGraficos();
    }

    private actualizarGraficos(): void {
        this.simbolo = this._actor?.renderComp.simbolo ??
            this._feature?.renderComp.simbolo ??
            this._terreno?.renderComp.simbolo ??
            "¿";

        this.colorSimbolo = this._actor?.renderComp.colorSimbolo ||
            this._feature?.renderComp.colorSimbolo ||
            this._terreno?.renderComp.colorSimbolo ||
            "#fff";

        this.colorFondo = this._terreno?.renderComp.colorFondo || "#000";
    }

    public toString(): string {
        return this._actor?.nombreComp.nombre ||
            this._feature?.nombreComp.nombre ||
            this._terreno?.nombreComp.nombre ||
            "There's nothing here";
    }

}