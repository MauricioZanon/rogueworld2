import Entidad from "./Entidad";
import clone from "fast-clone";
import { obtenerEntidades } from "@/entidades/EntidadRepository";
import RenderComp from "./componentes-de-entidades/RenderComp";
import chroma, { Scale } from "chroma-js";
import RNG from "@/utils/RNG";

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

    public static crearEntidad(nombre: nombreEntidad): Entidad {
        const nuevaEntidad: Entidad = clone(EntidadFactory.prototipos.get(nombre));
        if(nuevaEntidad.renderComp?.colorFondo) {
            this.randomizarColores(nuevaEntidad.renderComp);
        }
        return nuevaEntidad;
    }

    private static randomizarColores(componente: RenderComp): void {
        const espectro: Scale = chroma.scale([componente.colorFondo, componente.colorSimbolo]);
        componente.colorFondo = espectro(RNG.getRandomHasta(0.14)).hex("rgba");
    }
}

export type nombreEntidad = "grass floor" | "goblin" | "player" | "stone wall" | "dirt floor" | "downstairs" | "upstairs" | 
"dirt wall" | "wooden floor" | "wooden wall" | "stone floor"