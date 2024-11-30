import Entidad from './Entidad';
import clone from 'fast-clone';
import RenderComp from './componentes/RenderComp';
import chroma, { Scale } from 'chroma-js';
import EntidadRepository from './EntidadRepository';
import RNG from '../utils/RNG/RNG';
import { NombreEntidad, ListaEntidades } from '../types/types';
import AIComp from './componentes/AIComp';
import { EventManager } from '../utils/event-manager/eventManager';

export default class EntidadFactory {

	private static readonly prototipos: ListaEntidades = EntidadFactory.crearMapaDeEntidades();

	private static crearMapaDeEntidades(): ListaEntidades {
		const resultado = {} as ListaEntidades;
		const entidades: Entidad[] = EntidadRepository.obtenerEntidades();
		entidades.forEach((entidad) => {
			entidad.posicion = { cx: 0, cy: 0, cz: 0, tx: 0, ty: 0 };
			resultado[entidad.nombreComp.nombre] = entidad;
		});

		return resultado;
	}

	public static crearEntidad(nombre: NombreEntidad): Entidad {
		const entidadAClonar = EntidadFactory.prototipos[nombre];
		const nuevaEntidad: Entidad = clone(entidadAClonar);
		if (nuevaEntidad.renderComp?.colorFondo) {
			this.randomizarColores(nuevaEntidad.renderComp);
		}
		if(nuevaEntidad.aiComp) {
			this.crearAIComp(nuevaEntidad);
		}
		nuevaEntidad.flags = entidadAClonar.flags;
		if(nuevaEntidad.aiComp) {
			EventManager.agregar(nuevaEntidad);
		}
		return nuevaEntidad;
	}

	private static crearAIComp(entidad:Entidad): void {
		entidad.aiComp = new AIComp(entidad.aiComp as any);
	}

	private static randomizarColores(componente: RenderComp): void {
		const espectro: Scale = chroma.scale([componente.colorFondo, componente.colorSimbolo]);
		componente.colorFondo = espectro(RNG.getRandomHasta(0.14)).hex('rgba');
	}
}
