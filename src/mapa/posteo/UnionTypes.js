/* eslint-disable @typescript-eslint/no-unused-vars */
function formatearNumeroDeTelefono(numero) {
    var numeroFormateado;
    if (typeof numero == "number") {
        numeroFormateado = numero.toString();
    }
    else {
        numeroFormateado = numero;
    }
    numeroFormateado = numeroFormateado.slice(0, 4) + "-" + numeroFormateado.slice(4, 8);
    return numeroFormateado;
}
console.log(formatearNumeroDeTelefono(12345678));
console.log(formatearNumeroDeTelefono("12345678"));
