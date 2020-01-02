const devUrl = 'https://d2dvq461rdwooi.cloudfront.net'

const resolve = ({ 'arc-site': website, page, sectionSlug }) => {
  if (!website) throw new Error('Arcsite no declarado')
  if (!page) throw new Error('Tipo de página no declarada')

  return `${devUrl}/${website}/${page}${
    sectionSlug ? `/${sectionSlug}` : ''
  }/espacios.json`
}

export default {
  resolve,
  params: {
    page: 'text', // home, post, sect
    sectionSlug: 'text',
  },
}
