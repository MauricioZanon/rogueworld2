import RNG from '../../utils/RNG';
import { Direccion, Direcciones } from '../Direcciones';
import Mapa from '../Mapa';
import { Posicion } from '../Posicion';
import Tile from '../Tile';
import { PreferenciasCuevaConPasillos } from './CuevaFactory';
import Excavador from './Excavador';

export default class ExcavadorPasillos extends Excavador {
    private direccionActual: Direccion;
    private readonly direccionPreferida: Direccion;
    private tilesAvanzadosSinDoblar = 0;
    private readonly preferencias: PreferenciasCuevaConPasillos;

    public constructor (posicionInicial: Posicion, direccionPreferida: Direccion, preferencias: PreferenciasCuevaConPasillos) {
      super();
      this.posicion = posicionInicial;
      this.direccionPreferida = direccionPreferida;
      this.preferencias = preferencias;

      this.direccionActual = direccionPreferida;
    }

    public avanzar (): Tile {
      if (this.debeRotar()) {
        this.rotar();
      }
      const tileSiguiente: Tile = Mapa.obtenerTile(this.posicion, this.direccionActual);
      this.excavarTile(tileSiguiente);
      this.posicion = tileSiguiente.posicion;
      this.tilesAvanzadosSinDoblar++;
      return tileSiguiente;
    }

    private debeRotar (): boolean {
      const { chanceDeRotar = 0.1, largoMinimo, largoMaximo } = this.preferencias;
      return this.tilesAvanzadosSinDoblar >= largoMaximo || this.tilesAvanzadosSinDoblar >= largoMinimo && RNG.getRandom() <= chanceDeRotar;
    }

    private rotar (): void {
      this.tilesAvanzadosSinDoblar = 0;
      this.direccionActual = this.direccionActual != this.direccionPreferida
        ? this.direccionPreferida
        : RNG.getRandom() >= 0.5
          ? Direcciones.rotarEnSentidoHorario(this.direccionActual, 2)
          : Direcciones.rotarEnSentidoAntihorario(this.direccionActual, 2);
    }
}
