const searchQuery = (query, sort) => {
  const newQuery = encodeURIComponent(query).replace(/%20/g, '+')
  if (query !== '')
    // eslint-disable-next-line no-restricted-globals
    location.href = `/buscar/${newQuery}/todas/${sort ||
      'descendiente'}/?query=${newQuery}`
}

export default searchQuery
