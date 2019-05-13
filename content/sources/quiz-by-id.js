const resolve = key => {
  if (!key.id)
    throw new Error('Esta fuente de contenido requiere el id de la encuesta')

  return `http://jab.pe/f/arc/services/encuesta.php?id=${key.id}`
}

export default {
  resolve,
  params: {
    id: 'number',
  },
}
