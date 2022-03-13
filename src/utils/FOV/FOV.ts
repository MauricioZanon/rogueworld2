import ROT from "rot-js";
import Mapa from "../../mapa/Mapa";
import { useStore } from "../../store/store";

const centroPantalla = useStore(state => state.centroPantalla);

/* create a map */
var data = Mapa.obtenerAreaCuadrada(centroPantalla, cantidadTilesY, cantidadTilesX);
new ROT.Map.Uniform(W, H, null).create(function (x, y, type) {
	data[x + "," + y] = type;
	display.DEBUG(x, y, type);
});

/* input callback */
function lightPasses(x, y) {
	var key = x + "," + y;
	if (key in data) { return (data[key] == 0); }
	return false;
}

var fov = new ROT.FOV.PreciseShadowcasting(lightPasses);

/* output callback */
fov.compute(50, 22, 10, function (x, y, r, visibility) {
	var ch = (r ? "" : "@");
	var color = (data[x + "," + y] ? "#aa0" : "#660");
	display.draw(x, y, ch, "#fff", color);
});


