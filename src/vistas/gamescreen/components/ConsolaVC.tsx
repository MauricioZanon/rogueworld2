import React from "react";
import { MensajeConsola } from "../utils/MensajeConsola";
import MensajeConsolaVC from "./MensajeConsolaVC";

export default class ConsolaVC extends React.Component<{ mensajes: MensajeConsola[]; }> {

    render() {
        return (
            <div className="consola">
                { this.generarMensajes() }

            </div>
        );
    }

    private generarMensajes(): JSX.Element[] {
        const mensajes: JSX.Element[] = [];

        this.props.mensajes.forEach(mensaje => {
            mensajes.push(<MensajeConsolaVC mensaje={ mensaje }></MensajeConsolaVC>);
        });


        return mensajes;
    }

}