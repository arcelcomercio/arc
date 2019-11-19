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
    }
]


const fetch = (key) => {
    const { year, month, day } = key

    return {
        year,
        month,
        day
    }
}

export default {
    fetch,
    params
}