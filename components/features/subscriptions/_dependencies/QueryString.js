export const getQuery = name => {
  const vars = {}
  if (typeof window !== 'undefined') {
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
      vars[key] = value
    })
  }
  return vars[name]
}

export const deleteQuery = name => {
  const rg = new RegExp(`[(&|?)]+${name}=`)
  const queryMatch = window.location.href.match(rg)
  const newUrl = window.location.href.split(queryMatch)
  window.history.pushState(null, null, newUrl[0])
}
