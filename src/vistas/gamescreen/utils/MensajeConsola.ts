export class MensajeConsola {

    private mensaje: PalabrasEstiladas[] = [];

    public agregar(...parteDelMensaje: PalabrasEstiladas[]): void {
        this.mensaje.push(...parteDelMensaje);
    }

    public getMensaje(): PalabrasEstiladas[] {
        return this.mensaje;
    }

}

export type PalabrasEstiladas = {
    texto: string, 
    color?: string, 
    negrita?: boolean
}