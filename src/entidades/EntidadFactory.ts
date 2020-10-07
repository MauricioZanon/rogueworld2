import Entidad from "./Entidad";
import clone from "fast-clone";
import { obtenerEntidades } from "@/entidades/EntidadRepository";

export default class EntidadFactory {
    private static readonly prototipos = EntidadFactory.crearMapaDeEntidades();
    
    private static crearMapaDeEntidades(): Map<string, Entidad> {
        const resultado: Map<string, Entidad> = new Map();
        const entidades: Entidad[] = obtenerEntidades();
        entidades.forEach(entidad => {
            entidad.posicion = {cx: 0, cy: 0, cz: 0, tx: 0, ty: 0};
            resultado.set(entidad.nombreComp.nombre, entidad)
        });
        return resultado;
    }

    public static crearEntidad(nombre: string): Entidad {
        return clone(EntidadFactory.prototipos.get(nombre));
    }
}