const devUrl = 'https://d2dvq461rdwooi.cloudfront.net'
const devUrl2 = 'https://jab.pe/f/arc/espacios2.json'

const resolve = ({ 'arc-site': website, page, sectionSlug }) => {
  if (!website) throw new Error('Arcsite no declarado')
  if (!page) throw new Error('Tipo de página no declarada')

  const site=website==='peru21g21'?'peru21':website
  if(site==='depor'&& page==='home')

  {
    console.log(`9?site=${site}&page=${page}`)
    return `https://d1r08wok4169a5.cloudfront.net/widgets/espacios.json`
  }
    return `${devUrl}/${site}/${page}${
      sectionSlug ? `/${sectionSlug.split('-').join('')}` : ''
    }/espacios.json`
  
}

export default {
  resolve,
  params: {
    page: 'text', // home, post, sect
    sectionSlug: 'text',
  },
}
