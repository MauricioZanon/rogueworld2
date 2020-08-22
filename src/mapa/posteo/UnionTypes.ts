/* eslint-disable @typescript-eslint/no-unused-vars */

function formatearNumeroDeTelefono(numero: number | string): string {
    let numeroFormateado: string;
    if(typeof numero == "number") {
        numeroFormateado = numero.toString();
    } else {
        numeroFormateado = numero;
    }
    numeroFormateado = numeroFormateado.slice(0, 4) + "-" + numeroFormateado.slice(4, 8);
    return numeroFormateado;
}