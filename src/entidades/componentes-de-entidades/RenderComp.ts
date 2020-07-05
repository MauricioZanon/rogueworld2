import Componente from "./Componente";

export default class RenderComp implements Componente {
    public constructor(
        public simbolo: string, 
        public colorSimbolo: string, 
        public colorFondo?: string
        ) {}
}
