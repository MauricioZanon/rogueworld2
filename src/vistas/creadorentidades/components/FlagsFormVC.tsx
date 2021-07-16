import React from "react";
import Entidad from '../../../entidades/Entidad';
import { Flag } from '../../../entidades/Flags';

type FlagsFormProps = {
    entidad: Entidad;
};

export class FlagsForm extends React.Component<FlagsFormProps> {

    render(): JSX.Element {

        return (
            <fieldset>
                <legend>Flags</legend>
                <label className="checkbox-label">
                    <input type="checkbox" onChange={ () => this.actualizarState("INTRANSITABLE") } /> Es intransitable
                    <input type="checkbox" /> Es opaco
                </label>
            </fieldset>
        );
    }

    private actualizarState(nombreFlag: Flag): void {
        const flags = this.props.entidad.flags;
        if (flags.has(nombreFlag)) {
            flags.delete(nombreFlag);
        }
        else {
            flags.add(nombreFlag);
        }

    }

}
