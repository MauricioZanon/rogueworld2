import RNG from "@/utils/RNG";
import Mapa from "../Mapa";
import { Posicion } from "../Posicion";
import Tile from "../Tile";
import EntidadFactory from "../../entidades/EntidadFactory";
import { Direccion, NORTE, SUR, OESTE, ESTE } from "../Direcciones";
import { TamañoCueva } from "./TamañoCueva";
import Excavador from "./Excavador";
import ExcavadorPasillos from "./ExcavadorPasillos";
import ExcavadorHabitaciones from "./ExcavadorHabitaciones";
import { nombreEntidad } from "../../entidades/EntidadFactory";

export default class CuevaFactory {

    public crearCuevaConPasillos(preferencias: PreferenciasCuevaConPasillos): void {
        const direccionInicial: Direccion = preferencias.direccionInicial || RNG.getElementoRandom([NORTE, ESTE, SUR, OESTE]);
        const {tamaño, posicionInicial} = preferencias;
        this.excavarEntrada(posicionInicial);
        
        const excavadores: Excavador[] = [new ExcavadorPasillos(posicionInicial, direccionInicial, preferencias)];
        const tilesExcavados: Set<Tile> = new Set<Tile>();

        let turnosDesdeUltimoExcavadorNuevo = 0;
        while(tilesExcavados.size < tamaño) {
            excavadores.forEach(excavador => {
                tilesExcavados.add(excavador.avanzar());
                if(excavador instanceof ExcavadorPasillos) {
                    turnosDesdeUltimoExcavadorNuevo++;
                    if(turnosDesdeUltimoExcavadorNuevo > 25 && RNG.getRandom() > 0.9) {
                        excavadores.push(new ExcavadorHabitaciones(excavador.posicion, preferencias));
                        excavadores.push(new ExcavadorHabitaciones(excavador.posicion, preferencias));
                        excavadores.push(new ExcavadorHabitaciones(excavador.posicion, preferencias));
                        excavadores.push(new ExcavadorHabitaciones(excavador.posicion, preferencias));
                        excavadores.push(new ExcavadorHabitaciones(excavador.posicion, preferencias));
                        excavadores.push(new ExcavadorHabitaciones(excavador.posicion, preferencias));
                        turnosDesdeUltimoExcavadorNuevo = 0;
                    }
                }
            });
        }
    }

    private excavarEntrada(posicionEntrada: Posicion): void {
        let tile: Tile = Mapa.obtenerTile(posicionEntrada);
        tile.feature = EntidadFactory.crearEntidad("downstairs");
        posicionEntrada.cz++;
        
        tile = Mapa.obtenerTile(posicionEntrada);
        tile.feature = EntidadFactory.crearEntidad("upstairs");
        const nombreTerreno: nombreEntidad = <nombreEntidad> tile.terreno.nombreComp.nombre.replace("wall", "floor");
        tile.terreno = EntidadFactory.crearEntidad(nombreTerreno);
    }

}

type PreferenciasCueva = {
    tamaño: TamañoCueva,
    posicionInicial: Posicion
}

export type PreferenciasCuevaConPasillos = PreferenciasCueva & {
    chanceDeRotar?: 0.05 | 0.1 | 0.15 | 0.2 | 0.25 | 0.3,
    largoMinimo?: number,
    largoMaximo?: number,
    direccionInicial?: Direccion
};