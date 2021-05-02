import React from 'react'
import ConsolaVC from './ConsolaVC'
import { state } from '../../../store/store'
import { Posicion } from '../../../mapa/Posicion'

export default class SideBarVC extends React.Component {
  render () {
    return (
      <div className="side-bar">
        { Array.of(this.playerPos()) }
        <br />
        { this.playercurrentHp() } / { this.playerMaxHp() }
        <br />
        <ConsolaVC></ConsolaVC>
      </div>
    )
  }

  public playercurrentHp (): number {
    return state.player.statsComp.salud.actual
  }

  public playerMaxHp (): number {
    return state.player.statsComp.salud.max
  }

  public playerPos (): string {
    const pos: Posicion = state.player.posicion
    return 'cx:' + pos.cx + ' cy:' + pos.cy + ' cz:' + pos.cz + ' tx:' + pos.tx + ' ty:' + pos.ty
  }
}
