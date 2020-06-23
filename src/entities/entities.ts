import Entidad from './Entidad';
import clone from "fast-clone";

export default (function () {
    function elegirASCII(asciis: string) {
        return asciis.charAt(Math.floor(Math.random() * asciis.length));
    }

    function obtenerColorParecido(r: number, g: number, b: number, delta = 0.017) {
        const nuevoR = r + Math.floor((Math.random() * r * delta * 2) - (r * delta));
        const nuevoG = g + Math.floor((Math.random() * g * delta * 2) - (g * delta));
        const nuevoB = b + Math.floor((Math.random() * b * delta * 2) - (b * delta));

        return [nuevoR, nuevoG, nuevoB];
    }

    const pathArchivoEntidades = "./src/assets/entidades.json";
    const prototipos = new Map<string, Entidad>();
    const electron = window.require("electron");
    const fs = electron.remote.require("fs");

    (function cargarEntidades(): void {
        fs.readFile(pathArchivoEntidades, (err, data) => {
            if (err) {
                console.log("Error al cargar las entidades");
            } else {
                const entidades: Entidad[] = JSON.parse(data);
                entidades.forEach(entidad => prototipos.set(entidad.nombreComp.nombre, entidad))

            }
        });
    })();

    return {
        obtenerEntidad(nombre: string): Entidad {
            return clone(prototipos.get(nombre));
        }
    };
})();