export default class ValidacionComponente {
    nombreComponente: string;
    componenteValido: boolean;

    constructor(nombreComponente: string, componenteValido: boolean) {
        this.nombreComponente = nombreComponente;
        this.componenteValido = componenteValido;
    }
}