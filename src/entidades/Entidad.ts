import { Tipo } from './Tipos';
import NombreComp from './componentes/NombreComp';
import RenderComp from './componentes/RenderComp';
import StatsComp from './componentes/StatsComp';
import { PosicionLocal } from '../mapa/Posicion';
import { Flag } from '../types/types';
import { VisionComp } from './componentes/VisionComp';
import AIComp from './componentes/AIComp';
import MovimientoComp from './componentes/MovimientoComp';

export default class Entidad {
	public id: number;
	public tipo: Tipo;
	public posicion: PosicionLocal;
	public flags: Set<Flag>;

	// COMPONENTES
	public nombreComp: NombreComp;
	public renderComp?: RenderComp;
	public statsComp?: StatsComp;
	public visionComp?: VisionComp;
	public aiComp?: AIComp;
	public movimientoComp?: MovimientoComp;

	public constructor (id?: number, tipo?: Tipo) {
		this.id = id;
		this.tipo = tipo;
		this.flags = new Set();
	}
}
