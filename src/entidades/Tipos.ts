export enum Tipo {
    ACTOR = 'ACTOR',
    FEATURE = 'FEATURE',
    TERRENO = 'TERRENO',
    ITEM = 'ITEM',
    CONSUMIBLE = 'CONSUMIBLE',
    EQUIPO = 'EQUIPO',
}

/**
 * Cada key tiene como valor a su tipo padre
 */
const jerarquiaDeTipos: Map<Tipo, Tipo> = new Map<Tipo, Tipo>();

jerarquiaDeTipos.set(Tipo.ACTOR, null);
jerarquiaDeTipos.set(Tipo.FEATURE, null);
jerarquiaDeTipos.set(Tipo.TERRENO, null);
jerarquiaDeTipos.set(Tipo.ITEM, null);
jerarquiaDeTipos.set(Tipo.CONSUMIBLE, Tipo.ITEM);
jerarquiaDeTipos.set(Tipo.EQUIPO, Tipo.ITEM);

//TODO refactor esta función, no queda claro como funciona
export function esSubTipoDe (hijo: Tipo, padre: Tipo): boolean {
  let tipoActual: Tipo = hijo;

  while (tipoActual && tipoActual !== padre) {
    tipoActual = jerarquiaDeTipos.get(tipoActual);
  }
  return tipoActual !== null;
}
