import { Tipos } from "./Tipos";
import NombreComp from "./componentes-de-entidades/NombreComp";
import RenderComp from "./componentes-de-entidades/RenderComp";

export default class Entidad {
    public id: number;
    public tipo: Tipos;
    public nombreComp?: NombreComp;
    public renderComp?: RenderComp;

    public constructor(id?: number, tipo?: Tipos) {
        this.id = id;
        this.tipo = tipo;
    }

}