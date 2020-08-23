<template>
	<div class="modal fade in" id="modal-cargar-entidad" tabindex="-1" role="dialog">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Entidades</h4>
				</div>
				<div class="modal-body container">
					<div class="row">
						<div class="col s3 columna-entidades">
							<h4>ACTORS</h4>
							<hr />
							<div
								@click='setEntidad(actor)'
								class="opcion"
								v-for="actor in actores"
								:key="actor"
								data-dismiss="modal"
							>{{actor | capitalize}}</div>
						</div>
						<div class="col s3 columna-entidades">
							<h4>ITEMS</h4>
							<hr />
							<div
								@click="setEntidad(item)"
								class="opcion"
								v-for="item in items"
								:key="item"
								data-dismiss="modal"
							>{{item | capitalize}}</div>
						</div>
						<div class="col s3 columna-entidades">
							<h4>TERRAINS</h4>
							<hr />
							<div
								@click="setEntidad(terreno)"
								class="opcion"
								v-for="terreno in terrenos"
								:key="terreno"
								data-dismiss="modal"
							>{{terreno | capitalize}}</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-link waves-effect" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Watch, Vue } from "vue-property-decorator";
import Entidad from "@/entidades/Entidad";
import { Tipos } from "@/entidades/Tipos";

@Component({
	filters: {
		capitalize(value: string): string {
			if (!value) return ""
			value = value.toString()
			return value.charAt(0).toUpperCase() + value.slice(1)
		}
	}
})
export default class ModalCargarEntidadVC extends Vue {
	@Prop()
	public readonly entidades: Entidad[]

	public readonly actores: string[] = [];
	public readonly items: string[] = [];
	public readonly terrenos: string[] = [];

	@Watch("entidades")
	public organizarEntidades(): void {
		this.entidades.forEach(entidad => {
			switch (entidad.tipo) {
				case Tipos.ITEM:
					this.items.push(entidad.nombreComp.nombre);
					break;
				case Tipos.TERRENO:
					this.terrenos.push(entidad.nombreComp.nombre);
					break;
				default:
					this.actores.push(entidad.nombreComp.nombre);
			}
		});
	}

	@Emit("setEntidad")
	public setEntidad(nombre: string): string {
		return nombre.toLowerCase();
	}

}
</script>

<style scoped>
.columna-entidades {
	align-items: center;
	text-align: center;
	border: 3px solid black;
	border-radius: 3px;
}
.opcion:hover {
	background-color: lightblue;
	transition: ease-in-out 0.4s;
	font-weight: bolder;
}
.opcion {
	border-radius: 15px;
	text-align: center;
	transition: ease-in-out 0.4s;
	cursor: pointer;
	user-select: none;
}
</style>