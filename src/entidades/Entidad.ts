import { Tipo } from './Tipos'
import NombreComp from './componentes-de-entidades/NombreComp'
import RenderComp from './componentes-de-entidades/RenderComp'
import StatsComp from './componentes-de-entidades/StatsComp'
import { Flag } from './Flags'
import { Posicion } from '../mapa/Posicion'

export default class Entidad {
    public id: number;
    public tipo: Tipo;
    public posicion: Posicion;
    public flags: Set<Flag>;

    // COMPONENTES
    public nombreComp: NombreComp;
    public renderComp?: RenderComp;
    public statsComp?: StatsComp;

    public constructor (id?: number, tipo?: Tipo) {
      this.id = id
      this.tipo = tipo
      this.flags = new Set()
    }
}
