import React from "react";
import { MensajeConsola, PalabrasEstiladas } from '../utils/MensajeConsola';

export default class MensajeConsolaVC extends React.Component<{ mensaje: MensajeConsola; }> {

    private componenteMensaje = null;

    render(): JSX.Element {
        return (
            <div className="mensaje-consola">
                { this.componenteMensaje ?? this.generarMensajeConsola() }
            </div>
        );
    }

    private generarMensajeConsola(): JSX.Element[] {
        this.componenteMensaje = this.props.mensaje.getMensaje().map(parteMensaje => <span style={ parteMensaje.estilos }> { parteMensaje.texto }</span>);
        return this.componenteMensaje;
    }

}
