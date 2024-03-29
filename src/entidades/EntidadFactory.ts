import Entidad from "./Entidad";
import clone from "fast-clone";
import RenderComp from "./componentes-de-entidades/RenderComp";
import chroma, { Scale } from "chroma-js";
import RNG from "@/utils/RNG";
import EntidadRepository from "./EntidadRepository";

export default class EntidadFactory {
    private static readonly prototipos: Map<string, Entidad> = EntidadFactory.crearMapaDeEntidades();
    
    private static crearMapaDeEntidades(): Map<string, Entidad> {
        const resultado: Map<string, Entidad> = new Map();
        const entidades: Entidad[] = EntidadRepository.obtenerEntidades();
        entidades.forEach(entidad => {
            entidad.posicion = {cx: 0, cy: 0, cz: 0, tx: 0, ty: 0};
            resultado.set(entidad.nombreComp.nombre, entidad)
        });
        return resultado;
    }

    public static crearEntidad(nombre: NombreEntidad): Entidad {
        const entidadAClonar = EntidadFactory.prototipos.get(nombre);
        const nuevaEntidad: Entidad = clone(entidadAClonar);
        if(nuevaEntidad.renderComp?.colorFondo) {
            this.randomizarColores(nuevaEntidad.renderComp);
        }
        nuevaEntidad.flags = entidadAClonar.flags;
        return nuevaEntidad;
    }

    private static randomizarColores(componente: RenderComp): void {
        const espectro: Scale = chroma.scale([componente.colorFondo, componente.colorSimbolo]);
        componente.colorFondo = espectro(RNG.getRandomHasta(0.14)).hex("rgba");
    }
}

export type NombreEntidad = "grass floor" | "goblin" | "player" | "stone wall" | "dirt floor" | "downstairs" | "upstairs" | 
"dirt wall" | "wooden floor" | "wooden wall" | "stone floor" | "brick wall" | "brick floor"