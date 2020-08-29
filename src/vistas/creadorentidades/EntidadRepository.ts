import Entidad from "@/entidades/Entidad";
import store from "./store/creadorEntidadesStore";

const pathArchivoEntidades = "./src/assets/entidades.json";
const fs = window.require("electron").remote.require("fs-extra");

export function obtenerEntidades(): Entidad[] {
    const data: string = fs.readFileSync(pathArchivoEntidades);
    let resultado: Entidad[] = [];
    if(data) {
        resultado = JSON.parse(data.toString());
    }
    return resultado;
}

export function guardarEntidades(): void {
    if(entidadValida()){
        const nuevaEntidad: Entidad = formarEntidad(store.state.entidadSeleccionada);
        const entidades: Entidad[] = store.state.entidades;
        if (nuevaEntidad.id >= 0) {
            sobreescribirEntidadEnLista(entidades, nuevaEntidad);
        } else {
            agregarNuevaEntidadALaLista(entidades, nuevaEntidad);
        }
        fs.writeFileSync(pathArchivoEntidades, JSON.stringify(entidades), err => {
            if (err) {
                console.log("Error al guardar las entidades");
            } else {
                console.log("Entidades guardadas correctamente")
            }
        });
    } else {
        console.log("entidad invalida");
    }
}

function entidadValida(): boolean {
    const state = store.state;
    return state.tipo != null && state.nombreCompValido && state.renderCompValido;
}

function formarEntidad(entidad: Entidad): Entidad {
    const state = store.state;
    entidad.tipo = state.tipo;
    entidad.nombreComp = state.nombreComp;
    entidad.renderComp = state.renderComp;

    return entidad;
}

function sobreescribirEntidadEnLista(entidades: Entidad[], entidad: Entidad): void {
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