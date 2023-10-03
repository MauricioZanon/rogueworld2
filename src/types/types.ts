import Entidad from '../entidades/Entidad';

export type Flag =
	'INTRANSITABLE' |
	'OPACO';


export type NombreEntidad = 'grass floor' | 'goblin' | 'player' | 'stone wall' | 'dirt floor' | 'downstairs' | 'upstairs' |
	'dirt wall' | 'wooden floor' | 'wooden wall' | 'stone floor' | 'brick wall' | 'brick floor';

export type ListaEntidades = {
	[key in NombreEntidad]: Entidad
};