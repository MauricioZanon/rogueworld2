import EntidadFactory, { nombreEntidad } from '@/entidades/EntidadFactory';
import { Posicion } from '../Posicion';
import Tile from '../Tile';

export default abstract class Excavador {

    public posicion: Posicion;
    public abstract avanzar(): Tile;

    protected excavarTile(tile: Tile): void {
        const nombreTerreno: string = tile.terreno.nombreComp.nombre;
        tile.terreno = EntidadFactory.crearEntidad(<nombreEntidad> nombreTerreno.replace("wall", "floor"));
    }
    
}