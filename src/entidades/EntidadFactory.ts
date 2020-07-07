import Entidad from "./Entidad";
import clone from "fast-clone";
import { AllElectron } from "electron";

export default class EntidadFactory {
    private static readonly pathArchivoEntidades = "./src/assets/entidades.json";
    private static readonly electron = window.require("electron") as AllElectron;
    private static readonly fs = EntidadFactory.electron.remote.require("fs");
    private static readonly prototipos = EntidadFactory.cargarEntidades();
    
    private static cargarEntidades(): Map<string, Entidad> {
        const resultado: Map<string, Entidad> = new Map();
        EntidadFactory.fs.readFile(EntidadFactory.pathArchivoEntidades, (err, data: Buffer) => {
            if (err != null) {
                console.log("Error al cargar las entidades");
            } else {
                const entidades: Entidad[] = JSON.parse(data.toString()) as Entidad[];
                entidades.forEach(entidad => resultado.set(entidad.nombreComp.nombre, entidad))
            }
        });
        return resultado;
    }

    public static obtenerEntidad(nombre: string): Entidad {
        return clone(EntidadFactory.prototipos.get(nombre));
    }
}