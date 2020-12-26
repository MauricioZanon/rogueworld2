import { ascender } from "./Ascender";
import { atacar } from "./Atacar";
import { avanzar } from './Avanzar';
import { descender } from "./Descender";

const acciones = {
    atacar: atacar,
    ascender: ascender,
    avanzar: avanzar,
    descender: descender
};

export default acciones;