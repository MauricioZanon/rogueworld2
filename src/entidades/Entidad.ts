import { Tipos } from "./Tipos";
import NombreComp from "./componentes-de-entidades/NombreComp";
import RenderComp from "./componentes-de-entidades/RenderComp";
import { Posicion } from "@/mapa/Posicion";

export default class Entidad {
    public id: number;
    public tipo: Tipos;
    public posicion: Posicion;
    public nombreComp?: NombreComp;
    public renderComp?: RenderComp;
    public esTransitable?: boolean;

    public constructor(id?: number, tipo?: Tipos) {
        this.id = id;
        this.tipo = tipo;
    }

}