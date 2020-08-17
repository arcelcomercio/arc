import { isEmpty } from "../../utilities/helpers"

export default ({ text = '', url = '' }) => {
  let type = 'NewsArticle'
  let isArray = false
  if (text !== '') {
    switch (url) {
      case 'noticias':
        type = 'ReportageNewsArticle'
        break
      case 'analisis':
        type = '"AnalysisNewsArticle", "OpinionNewsArticle"'
        isArray = true
        break
      case 'opinion':
        type = 'OpinionNewsArticle'
        break
      case 'publicitario':
        type = 'AdvertiserContentArticle'
        break
      case 'patrocinado':
        // type = ''
        break
      case 'auspiciado':
        // type = ''
        break
      case 'elucidario':
        type = 'BackgroundNewsArticle'
        break
      case 'hechos':
        type = 'BackgroundNewsArticle'
        break
      case 'ayu_inf':
        type = ''
        break
      case 'revision':
        type = 'ReviewNewsArticle'
        break
      case 'investigacion':
        // type = ''
        break
      case 'det_hist':
        type = 'ReportageNewsArticle'
        break
      case 'satira':
        // type = ''
        break
      default:
        // type = ''
        break
    }
  }
  return isArray ? `[${type}]` : `"${type}"`
}

export const revisionAttr = ({ text = '', url = '' }, config = {}) => {
  let attr = ''
  if (text !== '' && url === 'revision' && !isEmpty(config)) {
    const {
      type_event: typeEvent = '',
      name = '',
      location_name: locationName = '',
      location_address: locationAddress = '',
      start_date: startDate = '',
    } = config
    attr = `"itemReviewed": { "@type": "${typeEvent}", "name": "${name}", "location": { "@type": "Place", "name": "${locationName}", "address": "${locationAddress}" }, "startDate": "${startDate}" },`
  }

  return attr
}
