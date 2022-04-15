import create from 'zustand';
import NombreComp from '../../../entidades/componentes-de-entidades/NombreComp';
import RenderComp from '../../../entidades/componentes-de-entidades/RenderComp';
import StatsComp from '../../../entidades/componentes-de-entidades/StatsComp';
import Entidad from '../../../entidades/Entidad';
import { Flag } from '../../../entidades/Flags';
import { Tipo } from '../../../entidades/Tipos';
import EntidadRepository from '../../../entidades/EntidadRepository';

type State = {
	entidadSeleccionada: Entidad;
	setEntidadSeleccionada: (nuevaEntidad: Entidad) => void;
	tipo: Tipo;
	entidades: Entidad[];
	cargarEntidades: () => void;
	nombreComp: NombreComp;
	nombreCompValido: false;
	renderComp: RenderComp;
	renderCompValido: true;
	statsComp: StatsComp;
	statsCompValido: true;
	flags: Set<Flag>;
};

export const useStore = create<State>(set => ({
	entidadSeleccionada: {} as Entidad,
	setEntidadSeleccionada: (nuevaEntidad: Entidad) => set(() => ({ entidadSeleccionada: nuevaEntidad })),
	tipo: null as Tipo,
	entidades: [] as Entidad[],
	cargarEntidades: () => set(() => ({ entidades: EntidadRepository.obtenerEntidades() })),
	nombreComp: {} as NombreComp,
	nombreCompValido: false,
	renderComp: {} as RenderComp,
	renderCompValido: true,
	statsComp: {} as StatsComp,
	statsCompValido: true,
	flags: new Set<Flag>()
}));