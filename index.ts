interface dimensions {
    width: number,
    height: number
}

type roofDimensions = dimensions & {
    triangular?: boolean
    superpuesto?: number
}

/**
 * @description Función que retorna la cantidad de paneles que caen en un techo
 * Considerando que el techo es de dimensiones "a" y "b" (rectángulo) y los paneles "x" y "y" (rectángulo)
 */
const getHowManyPanelsFit = ({
    roof,
    panel
}: {
    roof: roofDimensions,
    panel: dimensions
}) => {
    // Iniciamos el resultado en 0
    let result = 0

    switch (true) {
        case (roof.triangular):
            // Determinar si el alto del techo es igual o superior al del panel
            if (panel.height > roof.height) return result
            // calcular la hipotenusa
            const hip = Math.sqrt(
                Math.pow(roof.width / 2, 2) + Math.pow(roof.height, 2)
            )
            // calcular el angulo del cuadrado rectángulo formado
            const angle = Math.asin(roof.height / hip)
            // determinar cuanto ancho queda fuera del rectángulo dentro del triangulo
            const withOut = panel.height / Math.tan(angle)
            // determinar cuanto espacio queda disponible para poner los paneles
            const withAvailable = roof.width - (withOut * 2)
            // si ya no hay espacio disponible retornar un resultado obtenido hasta el momento
            if (withAvailable < panel.width || withAvailable < panel.height) return result
            // calcular cuantos paneles caen en el rectángulo calculado dentro del triangulo
            result += getHowManyPanelsFit({
                roof: {
                    width: withAvailable,
                    height: panel.height
                },
                panel
            })
            // si hay todavía espacio en el triangulo restante volver a calcular cuantos panels caben
            if (roof.height - panel.height > 0) {
                result += getHowManyPanelsFit({
                    roof: {
                        height: roof.height - panel.height,
                        width: withAvailable,
                        triangular: true
                    },
                    panel
                })
            }
            break
        case (![0, undefined].includes(roof.superpuesto)):
            // nos aseguramos de que el valor de la superposición exista
            roof.superpuesto = roof.superpuesto ?? 0
            // al primer rectángulo le quitamos la super posición y calculamos cuantos panales caen, dado que son 2 iguales lo multiplicamos por 2
            result += getHowManyPanelsFit({
                roof: {
                    width: roof.width - roof.superpuesto,
                    height: roof.height,
                },
                panel
            }) * 2
            // Calculamos cuantos paneles caben dentro del area de la superposición
            result += getHowManyPanelsFit({
                roof: {
                    width: roof.superpuesto,
                    height: (roof.height * 2) - roof.superpuesto
                },
                panel
            })
            break
        default:
            // contamos cuantos paneles caen en lo ancho
            const countWidth = Math.floor(roof.width / panel.width)
            // contamos cuantos paneles caen en lo alto
            const countHeight = Math.floor(roof.height / panel.height)
            // determinamos cuantos paneles cen dentro del techo
            result += countWidth * countHeight
            // determinamos si aun hay espacio disponible en el ancho
            const widthAvailable = roof.width - (panel.width * countWidth)
            // determinamos si aun hay espacio disponible en lo alto
            const heightAvailable = roof.height - (panel.height * countHeight)
            // revisamos si el ancho disponible es mayor a 0 y ademas cabe un panel a la inversa
            if (widthAvailable > 0 && (panel.height <= widthAvailable && panel.width <= roof.height)) {
                result += getHowManyPanelsFit({
                    roof: {
                        ...roof,
                        width: widthAvailable,
                    },
                    panel: {
                        width: panel.height,
                        height: panel.width
                    }
                })
            }
            // revisamos si el alto disponible es mayor a 0 y ademas cabe un panel a la inversa
            if (heightAvailable > 0 && (panel.width <= heightAvailable && panel.height <= roof.width)) {
                result += getHowManyPanelsFit({
                    roof: {
                        ...roof,
                        height: heightAvailable
                    },
                    panel: {
                        width: panel.height,
                        height: panel.width
                    }
                })
            }
            break
    }
    // Cortamos el numero al entero
    return Math.floor(result)
}

const roofs: roofDimensions[] = [
    {
        width: 2,
        height: 4
    },
    {
        width: 3,
        height: 5
    },
    {
        width: 1,
        height: 10
    },
    {
        width: 5,
        height: 4,
        triangular: true
    },
    {
        width: 5,
        height: 3,
        superpuesto: 1
    }
]

const panels: dimensions[] = [
    {
        width: 1,
        height: 2
    },
    {
        width: 1,
        height: 2
    },
    {
        width: 2,
        height: 2
    },
    {
        width: 1,
        height: 2
    },
    {
        width: 2,
        height: 2
    }
]

roofs.forEach((roof, index) => {
    let panel = panels[index]

    const count = getHowManyPanelsFit({
        roof,
        panel
    })

    console.log(`
    En un techo ${roof.triangular ? "triangular " : roof?.superpuesto ? `superpuesto por ${roof.superpuesto} ` : ""}de dimensiones ${roof.width}x${roof.height}
    Encajan ${count} paneles de ${panel.width}x${panel.height}
    `)
})
