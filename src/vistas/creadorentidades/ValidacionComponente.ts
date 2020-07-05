export default class ValidacionComponente {
    public nombreComponente: string;
    public componenteValido: boolean;

    public constructor(nombreComponente: string, componenteValido: boolean) {
        this.nombreComponente = nombreComponente;
        this.componenteValido = componenteValido;
    }
}