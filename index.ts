interface dimensions {
    width: number,
    height: number
}
/**
 * @description Función que retorna la cantidad de paneles que caen en un techo
 * Considerando que el techo es de dimensiones "a" y "b" (rectángulo) y los paneles "x" y "y" (rectángulo)
 */
const getHowManyPanelsFit = ({
    roof,
    panel
}: {
    roof: dimensions,
    panel: dimensions
}) => {
    // Iniciamos el resultado en 0
    let result = 0

    // determinamos si el panel cae de alguna forma en el techo, ya sea  horizontalmente o vertical
    if (panel.width > roof.width || panel.width > roof.height) {
        return result
    }

    // Calculamos el area del techo y la dividimos en el area de los paneles
    result = (roof.width * roof.height) / (panel.width * panel.height)

    // Cortamos el numero al entero
    return Math.floor(result)
}

const roofs: dimensions[] = [
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
]

roofs.forEach((roof, index) => {
    let panel = panels[index]

    const count = getHowManyPanelsFit({
        roof,
        panel
    })
    
    console.log(`
    En un techo de dimensiones ${roof.width}x${roof.height}
    Encajan ${count} paneles de ${panel.width}x${panel.height}
    `)
})
