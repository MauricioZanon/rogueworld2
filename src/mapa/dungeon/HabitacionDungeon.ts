import EntidadFactory from '../../entidades/EntidadFactory';
import Tile from '../Tile';

export default class HabitacionDungeon {
    public readonly pisos: Set<Tile> = new Set<Tile>();
    public readonly paredes: Set<Tile> = new Set<Tile>();

    public constructor (area: Tile[][]) {
      this.crearPisos(area);
      this.crearParedes(area);
    }

    private crearPisos (area: Tile[][]): void {
      area.forEach2D(tile => {
        this.pisos.add(tile);
        tile.terreno = EntidadFactory.crearEntidad('brick floor');
      });
    }

    private crearParedes (area: Tile[][]): void {
      area.forEachBorde(tile => {
        this.paredes.add(tile);
        tile.terreno = EntidadFactory.crearEntidad('brick wall');
      });
    }
}
