import Componente from './Componente';

export default class StatsComp implements Componente {
    public base?: BaseStats;
    public salud?: HPStats;
}

export type BaseStats = {
    STR: number,
    DEX: number,
    INT: number,
    CUN: number,
    WIS: number,
    CON: number
}

export type HPStats = {
    max: number,
    actual: number,
    regeneracion: number
}
