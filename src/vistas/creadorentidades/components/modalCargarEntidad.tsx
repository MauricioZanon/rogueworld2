import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import Entidad from "../../../entidades/Entidad";
import { Tipo } from "../../../entidades/Tipos";
import { useStore } from "../store/creadorEntidadesStore";
import shallow from "zustand/shallow";
import EntidadRepository from '../../../entidades/EntidadRepository';

type ModalCargarEntidadProps = {
	visible: boolean,
	onClose: () => void;
};

type EntidadesPorTipo = {
	[Tipo.ACTOR]: Entidad[];
	[Tipo.FEATURE]: Entidad[];
	[Tipo.TERRENO]: Entidad[];
};

export function ModalCargarEntidad(props: ModalCargarEntidadProps): JSX.Element {

	const { setEntidadSeleccionada, cargarEntidades } = useStore(state => ({
		entidades: state.entidades,
		setEntidadSeleccionada: state.setEntidadSeleccionada,
		cargarEntidades: state.cargarEntidades
	}), shallow);

	const entidades = EntidadRepository.obtenerEntidades();
	const [entidadesPorTipo, setEntidadesPorTipo] = useState({} as EntidadesPorTipo);

	useEffect(() => {
		cargarEntidades();
		organizarEntidades();
	}, []);

	function organizarEntidades(): void {
		const nuevoEntidadesPorTipo: EntidadesPorTipo = {
			ACTOR: [],
			FEATURE: [],
			TERRENO: []
		};
		entidades.forEach(entidad => {
			switch (entidad.tipo) {
				case Tipo.FEATURE:
					nuevoEntidadesPorTipo.FEATURE.push(entidad);
					break;
				case Tipo.TERRENO:
					nuevoEntidadesPorTipo.TERRENO.push(entidad);
					break;
				default:
					nuevoEntidadesPorTipo.ACTOR.push(entidad);
			}
		});
		setEntidadesPorTipo(nuevoEntidadesPorTipo);
	}

	function capitalize(texto: string): string {
		return texto.charAt(0).toUpperCase() + texto.slice(1);
	}

	function crearOpciones(listaEntidades: Entidad[]): JSX.Element[] {
		console.log(listaEntidades);
		return listaEntidades?.map(crearOpcion);
	}

	function crearOpcion(entidad: Entidad, index: number): JSX.Element {
		return <option value={ index } onClick={ () => setEntidad(entidad) } > { capitalize(entidad.nombreComp.nombre) }</option >;
	}

	function setEntidad(entidad: Entidad): void {
		setEntidadSeleccionada(entidad);
	}

	return (
		<Modal centered size="lg" show={ props.visible } onHide={ props.onClose } backdrop="static">
			<Modal.Header closeButton>
				<Modal.Title as="h6">Entidades</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row>
					<Col xs={ 3 }>
						<h4>ACTORS</h4>
						<select name="actores">
							{ crearOpciones(entidadesPorTipo.ACTOR) }
						</select>
					</Col>
					<Col xs={ 3 }>
						<h4>FEATURES</h4>
						<select name="features">
							{ crearOpciones(entidadesPorTipo.FEATURE) }
						</select>
					</Col>
					<Col xs={ 3 }>
						<h4>TERRAINS</h4>
						<select name="terrains">
							{ crearOpciones(entidadesPorTipo.TERRENO) }
						</select>
					</Col>
				</Row>
			</Modal.Body>
		</Modal>
	);
}