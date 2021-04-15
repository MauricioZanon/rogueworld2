import EntidadFactory, { NombreEntidad } from "@/entidades/EntidadFactory";
import { Posicion } from "../Posicion";
import Tile from "../Tile";

export default abstract class Excavador {

    public posicion: Posicion;
    public abstract avanzar(): Tile;

    protected excavarTile(tile: Tile): void {
        const nombreTerreno: string = tile.terreno.nombreComp.nombre;
        tile.terreno = EntidadFactory.crearEntidad(<NombreEntidad> nombreTerreno.replace("wall", "floor"));
    }
    
}