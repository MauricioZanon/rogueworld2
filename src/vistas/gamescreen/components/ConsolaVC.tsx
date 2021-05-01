import React from "react";
import { connect } from "react-redux";
import { MensajeConsola } from "../utils/MensajeConsola";
import MensajeConsolaVC from "./MensajeConsolaVC";

class ConsolaVC extends React.Component<{ mensajesConsola: MensajeConsola[]; }> {

    private mensajes: JSX.Element[] = [];

    render() {
        this.actualizarMensajes();
        return (
            <div className="consola">
                { this.mensajes }
            </div>
        );
    }

    private actualizarMensajes(): void {
        if (this.props.mensajesConsola.length) {
            this.mensajes.push(<MensajeConsolaVC mensaje={ this.props.mensajesConsola[0] }></MensajeConsolaVC>);
        }
    }

}

export default connect((state: { mensajesConsola: MensajeConsola[]; }) => {
    return {
        mensajesConsola: state.mensajesConsola
    };
})(ConsolaVC);