import { Direccion } from './Direcciones';
import { TAMAÑO_CHUNK } from './Chunk';

export type ChunkPos = {cx: number, cy: number, cz: number};
export type TilePos = {tx: number, ty: number};
export type PosicionLocal = ChunkPos & TilePos;

export type PosicionGlobal = {x: number, y: number, z: number}

export function toString (posicion: ChunkPos): string {
	return posicion.cx + '-' + posicion.cy + '-' + posicion.cz;
}

export function aplicarDireccion (posicion: PosicionLocal, direccion: Direccion): PosicionLocal {
	const resultado: PosicionLocal = { ...posicion };
	resultado.tx += direccion.x;
	resultado.ty += direccion.y;
	corregirX(resultado);
	corregirY(resultado);
	return resultado;
}

export function modificarTx (posicion: PosicionLocal, delta: number): void {
	posicion.tx += delta;
	corregirX(posicion);
}

export function modificarTy (posicion: PosicionLocal, delta: number): void {
	posicion.ty += delta;
	corregirY(posicion);
}

function corregirX (posicion: PosicionLocal): void {
	if (posicion.tx < 0) {
		posicion.cx += Math.floor(posicion.tx / TAMAÑO_CHUNK);
		posicion.tx = Math.abs((TAMAÑO_CHUNK + posicion.tx) % TAMAÑO_CHUNK);
	} else if (posicion.tx >= TAMAÑO_CHUNK) {
		posicion.cx += Math.floor(posicion.tx / TAMAÑO_CHUNK);
		posicion.tx = posicion.tx % TAMAÑO_CHUNK;
	}
}

function corregirY (posicion: PosicionLocal): void {
	if (posicion.ty < 0) {
		posicion.cy += Math.floor(posicion.ty / TAMAÑO_CHUNK);
		posicion.ty = Math.abs((TAMAÑO_CHUNK + posicion.ty) % TAMAÑO_CHUNK);
	} else if (posicion.ty >= TAMAÑO_CHUNK) {
		posicion.cy += Math.floor(posicion.ty / TAMAÑO_CHUNK);
		posicion.ty = posicion.ty % TAMAÑO_CHUNK;
	}
}

export function obtenerGlobal(pos: PosicionLocal): PosicionGlobal {
	const {cx, cy, cz, tx, ty} = pos;
	return {
		x: (cx * TAMAÑO_CHUNK) + tx,
		y: (cy * TAMAÑO_CHUNK) + ty,
		z: cz,
	};
}

export function obtenerLocal(globalPos: PosicionGlobal): PosicionLocal {
	const {x, y, z} = globalPos;

	const res: PosicionLocal = {
		tx: x % TAMAÑO_CHUNK,
		ty: y % TAMAÑO_CHUNK,
		cx: Math.floor(x / TAMAÑO_CHUNK),
		cy: Math.floor(y / TAMAÑO_CHUNK),
		cz: z,
	};

	if(res.tx < 0){
		res.tx = TAMAÑO_CHUNK + res.tx;
	}
	if(res.ty < 0){
		res.ty = TAMAÑO_CHUNK + res.ty;
	}

	return res;
}