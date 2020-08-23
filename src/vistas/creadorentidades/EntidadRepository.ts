import Entidad from '@/entidades/Entidad';

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

export function guardarEntidades(entidades: Entidad[], nuevaEntidad: Entidad): void {
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