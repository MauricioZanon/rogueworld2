import { Direccion } from './Direcciones';
import { TAMAÑO_CHUNK } from './Chunk';

export type ChunkPos = {cx: number, cy: number, cz: number};
export type TilePos = {tx: number, ty: number};
export type Posicion = ChunkPos & TilePos;

export function toString (posicion: ChunkPos): string {
  return posicion.cx + '-' + posicion.cy + '-' + posicion.cz;
}

export function aplicarDireccion (posicion: Posicion, direccion: Direccion): Posicion {
  const resultado: Posicion = { ...posicion };
  resultado.tx += direccion.x;
  resultado.ty += direccion.y;
  corregirX(resultado);
  corregirY(resultado);
  return resultado;
}

export function modificarTx (posicion: Posicion, delta: number): void {
  posicion.tx += delta;
  corregirX(posicion);
}
export function modificarTy (posicion: Posicion, delta: number): void {
  posicion.ty += delta;
  corregirY(posicion);
}

function corregirX (posicion: Posicion): void {
  if (posicion.tx < 0) {
    posicion.cx += Math.floor(posicion.tx / TAMAÑO_CHUNK);
    posicion.tx = Math.abs((TAMAÑO_CHUNK + posicion.tx) % TAMAÑO_CHUNK);
  } else if (posicion.tx >= TAMAÑO_CHUNK) {
    posicion.cx += Math.floor(posicion.tx / TAMAÑO_CHUNK);
    posicion.tx = posicion.tx % TAMAÑO_CHUNK;
  }
}

function corregirY (posicion: Posicion): void {
  if (posicion.ty < 0) {
    posicion.cy += Math.floor(posicion.ty / TAMAÑO_CHUNK);
    posicion.ty = Math.abs((TAMAÑO_CHUNK + posicion.ty) % TAMAÑO_CHUNK);
  } else if (posicion.ty >= TAMAÑO_CHUNK) {
    posicion.cy += Math.floor(posicion.ty / TAMAÑO_CHUNK);
    posicion.ty = posicion.ty % TAMAÑO_CHUNK;
  }
}
