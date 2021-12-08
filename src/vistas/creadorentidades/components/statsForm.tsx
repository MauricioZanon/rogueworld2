import React, { useState } from "react";
import StatsComp, { BaseStats, HPStats } from "../../../entidades/componentes-de-entidades/StatsComp";
import Entidad from "../../../entidades/Entidad";

type StatsFormProps = {
    entidad: Entidad;
};

export default function StatsForm(props: StatsFormProps): JSX.Element {

    const minStatBase = 5;
    const maxStatBase = 20;

    const minSaludMaxima = 1;

    const [tieneStatsBase, setTieneStatsbase] = useState(false);
    const [tieneHP, setTieneHP] = useState(false);

    function toggleStatsBase(tieneStatsBase: boolean): void {
        setTieneStatsbase(tieneStatsBase);
        if (tieneStatsBase) {
            const stats = new StatsComp();

            const statsBase = {} as BaseStats;
            statsBase.CON = minStatBase;
            statsBase.CUN = minStatBase;
            statsBase.DEX = minStatBase;
            statsBase.INT = minStatBase;
            statsBase.STR = minStatBase;
            statsBase.WIS = minStatBase;

            stats.base = statsBase;
            props.entidad.statsComp = stats;
        }
        else {
            props.entidad.statsComp = null;
        }
    }

    function toggleHP(tieneHP: boolean): void {
        setTieneHP(tieneHP);
        if (tieneHP) {
            const HPstats = {} as HPStats;
            HPstats.max = 1;
            HPstats.regeneracion = 0;

            props.entidad.statsComp.salud = HPstats;
        }
        else {
            props.entidad.statsComp.salud = null;
        }
    }

    // function validarComponente(): boolean {
    //     return baseStatsValidos() && saludValida();
    // }

    function baseStatsValidos(): boolean {
        if (tieneStatsBase) {
            const { STR, DEX, INT, CUN, WIS, CON } = props.entidad.statsComp.base;
            return [STR, DEX, INT, CUN, WIS, CON].every(stat => stat >= minStatBase && stat <= maxStatBase);
        }
        else {
            return true;
        }
    }

    function saludValida(): boolean {
        return !tieneHP || props.entidad.statsComp.salud.max >= 1;
    }

    function crearInputDeStat(): JSX.Element {
        return <input type="number" min={ minStatBase } max={ maxStatBase } disabled={ !tieneStatsBase } />;
    }

    return (
        <fieldset>
            <legend>Stats</legend>
            <input type="checkbox" onChange={ e => toggleStatsBase(e.target.checked) } />Base
            <br />
            { crearInputDeStat() }STR
            { crearInputDeStat() }DEX
            { crearInputDeStat() }INT
            <br />
            { crearInputDeStat() }CUN
            { crearInputDeStat() }WIS
            { crearInputDeStat() }CON
            <hr />
            <input type="checkbox" onChange={ e => toggleHP(e.target.checked) } />Salud
            <br />
            <input type="number" min={ minSaludMaxima } disabled={ !tieneHP } />Máximo
            <br />
            <input type="number" step="0.1" disabled={ !tieneHP } />Regeneración
        </fieldset>
    );

}
