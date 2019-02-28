const resolve = query => {
  const urlEndpoint = `/site/v3/navigation/` //  modificar para

  if (query.hasOwnProperty('website')) {
    return `${urlEndpoint}${query.website}/?hierarchy=${query.hierarchy}`
  }
  throw new Error(`NO existe la pagina web que esta buscando!!!!`)
}

export default {
  resolve,
  params: {
    website: 'text',
    hierarchy: 'text',
  },
}
