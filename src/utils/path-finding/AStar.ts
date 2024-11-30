import Mapa from '../../mapa/Mapa';
import { PosicionGlobal, obtenerGlobal, obtenerLocal } from '../../mapa/Posicion';

export function aStar(start: PosicionGlobal, goal: PosicionGlobal): PosicionGlobal[] | null {

	const openSet = new MinHeap();
	openSet.insert(start, 0);

	const cameFrom: Record<string, PosicionGlobal | null> = {};
	const gScore: Record<string, number> = {};
	const fScore: Record<string, number> = {};

	cameFrom[pointToKey(start)] = null;
	gScore[pointToKey(start)] = 0;
	fScore[pointToKey(start)] = heuristic(start, goal);

	while (!openSet.isEmpty()) {
		const current = openSet.extractMin().point;

		if (current.x === goal.x && current.y === goal.y) {
			return reconstructPath(cameFrom, current);
		}

		const neighbors = Mapa.obtenerTilesAdyacentes(obtenerLocal(current)).map((t) => obtenerGlobal(t.posicion));
		for (const neighbor of neighbors) {
			const tile = Mapa.obtenerTile(obtenerLocal(neighbor)); // FIXME se está enviando una posición llena de NaNs
			if (tile.terreno.flags.has("INTRANSITABLE")) continue; // Celda bloqueada

			const tentativeGScore = gScore[pointToKey(current)] + 1;

			if (tentativeGScore < (gScore[pointToKey(neighbor)] ?? Infinity)) {
				cameFrom[pointToKey(neighbor)] = current;
				gScore[pointToKey(neighbor)] = tentativeGScore;
				fScore[pointToKey(neighbor)] = tentativeGScore + heuristic(neighbor, goal);

				if (!openSet.has(neighbor)) {
					openSet.insert(neighbor, fScore[pointToKey(neighbor)]);
				}
			}
		}
	}

	return null;
	
}

// Heurística de Manhattan
function heuristic(a: PosicionGlobal, b: PosicionGlobal): number {
	return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function pointToKey(point: PosicionGlobal): string {
	return `${point.x},${point.y}`;
}

function reconstructPath(cameFrom: Record<string, PosicionGlobal | null>, current: PosicionGlobal): PosicionGlobal[] {
	const path = [current];
	while (cameFrom[pointToKey(current)] !== null) {
		current = cameFrom[pointToKey(current)]!;
		path.push(current);
	}
	return path.reverse();
}

class MinHeap {
	private heap: { point: PosicionGlobal; priority: number }[] = [];

	insert(point: PosicionGlobal, priority: number) {
		this.heap.push({ point, priority });
		this.bubbleUp();
	}

	extractMin(): { point: PosicionGlobal; priority: number } {
		const min = this.heap[0];
		const end = this.heap.pop()!;
		if (this.heap.length > 0) {
			this.heap[0] = end;
			this.bubbleDown();
		}
		return min;
	}

	isEmpty(): boolean {
		return this.heap.length === 0;
	}

	has(point: PosicionGlobal): boolean {
		return this.heap.some((node) => node.point.x === point.x && node.point.y === point.y);
	}

	private bubbleUp() {
		let index = this.heap.length - 1;
		const element = this.heap[index];
		while (index > 0) {
			const parentIndex = Math.floor((index - 1) / 2);
			const parent = this.heap[parentIndex];
			if (element.priority >= parent.priority) break;
			this.heap[index] = parent;
			index = parentIndex;
		}
		this.heap[index] = element;
	}

	private bubbleDown() {
		let index = 0;
		const length = this.heap.length;
		const element = this.heap[0];
		while (true) {
			const leftChildIndex = (2 * index) + 1;
			const rightChildIndex = (2 * index) + 2;
			let swap = null;

			if (leftChildIndex < length) {
				const leftChild = this.heap[leftChildIndex];
				if (leftChild.priority < element.priority) {
					swap = leftChildIndex;
				}
			}
			if (rightChildIndex < length) {
				const rightChild = this.heap[rightChildIndex];
				if (rightChild.priority < (swap === null ? element.priority : this.heap[leftChildIndex].priority)) {
					swap = rightChildIndex;
				}
			}
			if (swap === null) break;
			this.heap[index] = this.heap[swap];
			index = swap;
		}
		this.heap[index] = element;
	}
}
