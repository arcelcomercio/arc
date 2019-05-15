const dateName = (datestring, yearSeparator) => {
  let name = ''
  if (datestring) {
    const dias = [
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo',
    ]
    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ]
    const date = new Date(datestring)
    name = `${dias[date.getDay()]} ${date.getDate()} de ${
      meses[date.getMonth()]
    }${yearSeparator} ${date.getFullYear()}`
  }
  return name
}

export default dateName
