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

export const getActualDate = () => {
    const today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1 // January is 0!
  
    const yyyy = today.getFullYear()
    if (dd < 10) {
      dd = `0${dd}`
    }
    if (mm < 10) {
      mm = `0${mm}`
    }
    return `${yyyy}-${mm}-${dd}`
  }