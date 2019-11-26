export const isLogged = () => {
  const { localStorage } = window
  // eslint-disable-next-line no-prototype-builtins
  return (
    localStorage.getItem('ArcId.USER_INFO') &&
    localStorage.getItem('ArcId.USER_INFO') !== '{}'
  )
}

export const conformProfile = userPorfile => {
  const { attributes, contacts = [], ...restProfile } = userPorfile
  const [phone = {}] = contacts || []

  return Object.assign(
    {},
    restProfile,
    phone,
    attrToObject(attributes, ['documentNumber', 'phone', 'documentType'])
  )
}

const attrToObject = (attributes = [], getAttributes = []) => {
  return getAttributes.reduce((prev, name) => {
    const attrs = (attributes || []).find(attr => attr.name === name)

    if (attrs) {
      prev[name] = attrs.value
    }
    return prev
  }, {})
}
