const fetch = ({ 'arc-site': website, page, section }) => {
  if (!website) throw new Error('Arcsite no declarado')
  if (!page) throw new Error('Tipo de página no declarada')

  return `/${website}/${page}${section || ''}/espacios.json`
}

export default {
  fetch,
  params: {
    page: 'text', // home, post, sect
    section: 'text',
  },
}
