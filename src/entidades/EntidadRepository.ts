import Entidad from "@/entidades/Entidad";
import store from "../vistas/creadorentidades/store/creadorEntidadesStore";

const pathArchivoEntidades = "./src/assets/entidades.json";
const fs = window.require("electron").remote.require("fs-extra");

export function obtenerEntidades(): Entidad[] {
    const data: string = fs.readFileSync(pathArchivoEntidades);
    const resultado: Entidad[] = JSON.parse(data.toString());
    resultado.forEach(entidad => parsearSetDeFlags(entidad));
    return resultado;
}

function parsearSetDeFlags(entidad: Entidad): void{
    entidad.flags = new Set(entidad.flags);
}

export function persistirEntidades(): void {
    const nuevaEntidad: Entidad = formarEntidad(store.state.entidadSeleccionada);
    const entidades: Entidad[] = store.state.entidades;
    if (nuevaEntidad.id >= 0) {
        sobreescribirNuevaEntidadEnLista(entidades, nuevaEntidad);
    } else {
        agregarNuevaEntidadALaLista(entidades, nuevaEntidad);
    }
    const entidadesSinTipo = Array.from(entidades) as any[];
    entidadesSinTipo.forEach(entidad => entidad.flags = Array.from(entidad.flags));
    fs.writeFileSync(pathArchivoEntidades, JSON.stringify(entidadesSinTipo), err => {
        if (err) {
            console.log("Error al guardar las entidades");
        } else {
            console.log("Entidades guardadas correctamente")
        }
    });
}

function formarEntidad(entidad: Entidad): Entidad {
    const state = store.state;
    entidad.tipo = state.tipo;
    entidad.nombreComp = state.nombreComp;
    entidad.renderComp = state.renderComp;
    entidad.statsComp = state.statsComp;
    entidad.flags = state.flags;
    return entidad;
}

function sobreescribirNuevaEntidadEnLista(entidades: Entidad[], entidad: Entidad): void {
    for (let i = 0; i < entidades.length; i++) {
        if (entidades[i].id == entidad.id) {
            entidades[i] = entidad;
            return;
        }
    }
}

function agregarNuevaEntidadALaLista(entidades: Entidad[], nuevaEntidad: Entidad): void {
    nuevaEntidad.id = buscarIdSinUsar(entidades);
    entidades.push(nuevaEntidad);
}


function buscarIdSinUsar(entidades: Entidad[]): number {
    const ids: number[] = entidades.map(entidad => entidad.id);
    let nuevoId = 1;
    while (ids.includes(nuevoId)) {
        nuevoId++;
    }
    return nuevoId;
}