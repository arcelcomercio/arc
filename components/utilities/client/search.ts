export type Sort = 'descendiente' | 'ascendente'

/**
 * Redirige al buscador, con el término de búsqueda.
 * Hace un cambio de ruta con `location.href`
 * @param query término de búsqueda
 * @param sort orden de resultados
 */
const searchQuery = (query: string, sort?: Sort, section?: string): void => {
  const newQuery = encodeURIComponent(query).replace(/%20/g, '+')
  if (query && query !== '')
    // eslint-disable-next-line no-restricted-globals
    location.href = `/buscar/${newQuery}/${section || 'todas'}/${
      sort || 'descendiente'
    }/?query=${newQuery}`
}

export default searchQuery
