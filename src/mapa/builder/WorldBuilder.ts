import store from "@/store/store";
import Chunk from "../Chunk";
import CuevaFactory, { PreferenciasCuevaConPasillos } from "../cueva/CuevaFactory";
import { TamañoCueva } from "../cueva/TamañoCueva";
import Mapa from "../Mapa";
import { Posicion } from "../Posicion";

export function crearMundoInicial(): void {
    const chunk: Chunk = Mapa.obtenerChunk({cx: 0, cy: 0, cz: 0});

    crearCueva({cx: 0, cy: 0, cz: 0, tx:0, ty: 0});
    
    chunk.obtenerTile({tx: 12, ty: 12}).colocarActor(store.getters.player);
}


export function crearCueva(positionEntrada: Posicion): void {

    const preferenciasCueva: PreferenciasCuevaConPasillos = {
        tamaño: TamañoCueva.GRANDE,
        posicionInicial: positionEntrada,
        largoMaximo: 15,
        largoMinimo: 5,
        chanceDeRotar: 0.15
    }

    new CuevaFactory().crearCuevaConPasillos(preferenciasCueva);

}