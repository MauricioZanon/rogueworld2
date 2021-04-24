import React from "react";
import { CSSProperties } from 'styled-components';
import { MensajeConsola, PalabrasEstiladas } from '../utils/MensajeConsola';

export default class MensajeConsolaVC extends React.Component<{ mensaje: MensajeConsola; }> {

    render(): JSX.Element {
        return (
            <div className="mensaje-consola">
                { this.generarMensajeConsola() }
            </div>
        );
    }

    private generarEstilo(texto: PalabrasEstiladas): CSSProperties {
        return {
            color: texto.color ?? "#DDD",
            fontWeight: texto.negrita ? "bold" : "normal"
        };
    }

    private generarMensajeConsola(): JSX.Element[] {
        let partes: JSX.Element[] = [];
        this.props.mensaje.getMensaje().forEach(parteMensaje => {
            partes.push(<span style={ this.generarEstilo(parteMensaje) }> { parteMensaje.texto }</span>);
        });
        return partes;
    }

}
