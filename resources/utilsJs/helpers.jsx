export const reduceWord = (word, len = 145, finalText = '...') => {
    return word.length > len ? word.slice(0, 145).concat(finalText) : word
}

export const formatDate = date => {
    const actual = new Date()
    const day = actual.getDate()
    const month = (actual.getMonth() + 1)
    const year = actual.getFullYear()

    const formatDay = day < 10 ? `0${day}` : day
    const formatMonth = month < 10 ? `0${month}` : month
    const fechaGenerada = `${year}-${formatMonth}-${formatDay}`

    const fechaEntrante = date.slice(0, 10)
    const fecha = (fechaEntrante === fechaGenerada) ? date.slice(date.indexOf('T') + 1, 16) : fechaEntrante
    return fecha
}