const resolve = () => {
  return `http://archivo.elcomercio.pe/html/cartelera/all/all.json`
}

export default {
  resolve,
  params: {
    website: 'text',
    movie: 'text',
    cinema: 'text',
    genre: 'text'
  },
}
