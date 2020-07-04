import Componente from './Componente';

export default class RenderComp implements Componente {
    constructor(
        public simbolo: string, 
        public colorSimbolo: string, 
        public colorFondo?: string
        ) {}
}
