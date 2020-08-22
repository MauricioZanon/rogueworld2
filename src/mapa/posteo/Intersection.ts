type Coordenada2D = {
    x: number,
    y: number
}

// Aca estoy diciendo que el tipo Coordenada3D debe tener todas las propiedades de Coordenada2D y { z: number },
// lo que resulta en el mismo tipo Coordenada3D que vimos en el ejemplo anterior
type Coordenada3D = Coordenada2D & { z: number }