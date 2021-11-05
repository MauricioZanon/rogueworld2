import React from "react";
import Entidad from '../../../entidades/Entidad';
import { Flag } from '../../../entidades/Flags';

type FlagsFormProps = {
    entidad: Entidad;
};

export function FlagsForm(props: FlagsFormProps): JSX.Element {

    function actualizarState(nombreFlag: Flag): void {
        const flags = props.entidad.flags;
        if (flags.has(nombreFlag)) {
            flags.delete(nombreFlag);
        }
        else {
            flags.add(nombreFlag);
        }
    }

    return (
        <fieldset>
            <legend>Flags</legend>
            <label className="checkbox-label">
                <input type="checkbox" onChange={ () => actualizarState("INTRANSITABLE") } /> Es intransitable
                <input type="checkbox" /> Es opaco
            </label>
        </fieldset>
    );

}
