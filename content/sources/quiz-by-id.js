const resolve = key => {
  if (!key.id) {
    return `http://jab.pe/f/arc/services/encuesta.php?id=673`
  }
  return `http://jab.pe/f/arc/services/encuesta.php?id=${key.id}`
}

export default {
  resolve,
  params: {
    id: 'number',
  },
}
