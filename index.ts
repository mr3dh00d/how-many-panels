interface dimensions {
    width: number,
    height: number
}

const getHowManyPanelsFit = ({
    roof,
    panel
}: {
    roof: dimensions,
    panel: dimensions
}) => {
    let result = 0

    if (panel.width > roof.width || panel.width > roof.height) {
        return result
    }

    result = (roof.width * roof.height) / (panel.width * panel.height)

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
