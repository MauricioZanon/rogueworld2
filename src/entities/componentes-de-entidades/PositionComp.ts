import Componente from './Componente';

export default class PositionComp implements Componente {
    constructor(
        public x: number,
        public y: number,
        public z: number
    ) { }
}
