import { isEmpty } from '../../utilities/helpers'

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
        // type = ''
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
      category_software: categorySoftware = '',
      so_software: soSoftware = '',
      author_book: authorBook = '',
      isbn_book: isbnBook = '',
      url_book: urlBook = '',
      image_local: imageLocal = '',
      sameas_movie: sameasMovie = '',
      image_movie: imageMovie = '',
      description_movie: descriptionMovie = '',
      review_product: reviewProduct = '',
      author_product: authorProduct = '',
      image_recipe: imageRecipe = '',
    } = config

    let urlAttr = ''
    let subAttr = ''
    let sameAsList = []
    let sameAs = ''
    switch (typeEvent) {
      case 'SoftwareApplication':
        subAttr = `, "applicationCategory": "${categorySoftware}", "operatingSystem": "${soSoftware}"`
        break
      case 'Book':
        subAttr = `, "author":  { "@type" : "Person", "name" : "${authorBook}" }, "isbn": "${isbnBook}"`
        urlAttr = `, "url": "${urlBook}",`
        break
      case 'LocalBusiness':
        subAttr = `, "image": "${imageLocal}"`
        break
      case 'Movie':
        sameAsList = sameasMovie.split(',') || []
        sameAsList.forEach(el => {
          sameAs += `"${el.trim()}",`
        })
        sameAs = sameAs.trim().substring(0, sameAs.length - 1)
        subAttr = `, "sameAs": [${sameAs}], "image": "${imageMovie}", "description": "${descriptionMovie}"`
        break
      case 'Product':
        subAttr = `, "review": { "@type": "Review", "name" : "${reviewProduct}",
          "author" : { "@type" : "Person", "name" : "${authorProduct}" } }`
        break
      case 'Recipe':
        subAttr = `, "image": "${imageRecipe}"`
        break
      default:
        break
    }

    attr = `${urlAttr} "itemReviewed": { "@type": "${typeEvent}", "name": "${name}", "location": { "@type": "Place", "name": "${locationName}", "address": "${locationAddress}" }, "startDate": "${startDate}" ${subAttr} },`
  }

  return attr
}
