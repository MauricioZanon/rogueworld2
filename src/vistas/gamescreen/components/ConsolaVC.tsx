import React from 'react';
import { useStore } from '../../../store/store';
import MensajeConsolaVC from './MensajeConsolaVC';

export default function ConsolaVC() {

	const mensajes = useStore(state => state.mensajesConsola);

	function crearMensajes(): JSX.Element[] | JSX.Element {
		if (mensajes.length) {
			return mensajes.map(mensaje => <MensajeConsolaVC mensaje={ mensaje }></MensajeConsolaVC>);
		}
		return <></>;
	}

	return (
		<div className="consola">
			{ crearMensajes() }
		</div>
	);
}