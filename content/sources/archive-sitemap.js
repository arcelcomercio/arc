const params = [
    {
        name: 'year',
        displayName: 'Año',
        type: 'number',
    },
    {
        name: 'month',
        displayName: 'Mes',
        type: 'number',
    },
    {
        name: 'day',
        displayName: 'Día',
        type: 'number',
    },
    {
        name: 'type',
        displayName: 'Tipo de sitemap',
        type: 'string'
        // Se espera que sea 'web' o 'news'
    }
]


const fetch = (key) => {
    const { year, month, day, type } = key

    return {
        year,
        month,
        day,
        type
    }
}

export default {
    fetch,
    params
}