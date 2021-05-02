import { NombreVista } from '../App'
import Entidad from '../entidades/Entidad'
import { MensajeConsola } from '../vistas/gamescreen/utils/MensajeConsola'

export const state = {
  player: {} as Entidad,
  mensajesConsola: [] as MensajeConsola[],
  vistaActual: 'main screen' as NombreVista
}

export function usarComoPlayer (nuevoPlayer: Entidad): void {
  state.player = nuevoPlayer
}

export function agregarMensajeALaConsola (nuevoMensaje: MensajeConsola): void {
  state.mensajesConsola.unshift(nuevoMensaje)
};
