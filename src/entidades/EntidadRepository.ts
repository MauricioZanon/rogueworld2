import { useStore } from '../vistas/creadorentidades/store/creadorEntidadesStore';
import Entidad from './Entidad';
import fs from "fs";

const pathArchivoEntidades = './src/assets/entidades.json';

export default class EntidadRepository {

	public static obtenerEntidades(): Entidad[] {
		const data: string = fs.readFileSync(pathArchivoEntidades, "utf8");
		const resultado: Entidad[] = JSON.parse(data.toString());
		resultado.forEach(EntidadRepository.parsearSetDeFlags);
		return resultado;
	}

	private static parsearSetDeFlags(entidad: Entidad): void {
		entidad.flags = new Set(entidad.flags);
	}

	public static persistirEntidades(): void {
		const nuevaEntidad = useStore.getState().entidadSeleccionada;
		const entidades: Entidad[] = useStore.getState().entidades;
		if (nuevaEntidad.id >= 0) {
			EntidadRepository.sobreescribirNuevaEntidadEnLista(entidades, nuevaEntidad);
		} else {
			EntidadRepository.agregarNuevaEntidadALaLista(entidades, nuevaEntidad);
		}
		// No se pueden guardar Sets en un JSON, entonces antes de guardar el Set de Flags lo convierto a un array y lo guardo en la misma variable.
		// Para hacer esto necesito que 'flags' acepte también arrays, pero eso me obligaría a hacer type checks cada vez que lo uso,
		// asi que fue mas fácil hacer que las entidades sean de tipo any antes de asignarles el array de flags y recién ahi persistirlas.
		const entidadesSinTipo = Array.from(entidades) as any[];
		entidadesSinTipo.forEach(entidad => entidad.flags = Array.from(entidad.flags));
		fs.writeFileSync(pathArchivoEntidades, JSON.stringify(entidadesSinTipo));
	}

	private static sobreescribirNuevaEntidadEnLista(entidades: Entidad[], entidad: Entidad): void {
		for (let i = 0; i < entidades.length; i++) {
			if (entidades[i].id === entidad.id) {
				entidades[i] = entidad;
				return;
			}
		}
	}

	private static agregarNuevaEntidadALaLista(entidades: Entidad[], nuevaEntidad: Entidad): void {
		nuevaEntidad.id = EntidadRepository.buscarIdSinUsar(entidades);
		entidades.push(nuevaEntidad);
	}

	private static buscarIdSinUsar(entidades: Entidad[]): number {
		const ids: number[] = entidades.map(entidad => entidad.id);
		let nuevoId = 1;
		while (ids.includes(nuevoId)) {
			nuevoId++;
		}
		return nuevoId;
	}
}
