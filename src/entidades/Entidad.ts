import { Tipos } from './Tipos';
import NombreComp from './componentes-de-entidades/NombreComp';
import RenderComp from './componentes-de-entidades/RenderComp';

export default class Entidad {
    id: number;
    tipo: Tipos;
    nombreComp?: NombreComp;
    renderComp?: RenderComp;

    constructor(id?: number, tipo?: Tipos) {
        this.id = id;
        this.tipo = tipo;
    }

}