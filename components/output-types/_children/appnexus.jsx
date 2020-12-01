import React from 'react'
import StoryData from '../../utilities/story-data'
import { getMultimediaAnalitycs } from '../../utilities/helpers'

const getSite = site => {
  const sites = {
    elcomercio: 'eco',
    depor: 'dep',
    trome: 'trm',
    gestion: 'ges',
    peru21: 'p21',
    elbocon: 'boc',
    ojo: 'ojo',
    diariocorreo: 'cor',
  }
  return sites[site] || sites.elcomercio
}

const getTypeStory = ({ promo_items: promoItems = {} } = {}) => {
  const type = promoItems
  const arrType = Object.keys(type)
  return arrType[0] === 'basic_gallery'
}

const getVars = (
  { globalContent, arcSite, isStory, requestUri, port = 'port1' },
  isGallery
) => {
  const site = arcSite
  const template = isStory ? 'nota' : 'portada'
  let typeSpace = port
  let path = requestUri.replace('/carga-continua', '').split('?')[0]
  let section = ''
  let subsection = ''
  let dataStory = ''
  let dataNucleoOrigen = ''

  if (requestUri) {
    if (path === '/homepage') {
      section = 'home'
      path = '/'
    } else {
      const sectionList = path.split('/').slice(1)
      section =
        sectionList[0] === 'noticia' ? 'tags' : sectionList[0].replace('-', '')

      if (isStory && sectionList.length >= 3) {
        const {
          id,
          multimediaType,
          primarySectionLink,
          getPremiumValue,
          nucleoOrigen,
          formatOrigen,
          contentOrigen,
          genderOrigen,
          audienciaNicho,
          subtype,
        } = new StoryData({
          data: globalContent,
          arcSite,
        })

        const premiumValue =
          getPremiumValue === 'premium' ? true : getPremiumValue
        const isPremiumFree = premiumValue === 'free' ? 2 : premiumValue
        const isPremiumMete =
          isPremiumFree === 'metered' ? false : isPremiumFree
        const isPremium = isPremiumMete === 'vacio' ? false : isPremiumMete

        const subSectionList = primarySectionLink.split('/').slice(1)
        subsection = subSectionList[1]
          ? subSectionList[1].replace('-', '')
          : sectionList[1].replace(
              '-',
              ''
            ) /** /sección/esta-es-la-sub-seccion */
        dataStory = ` var tipo_nota = '${getMultimediaAnalitycs(
          multimediaType,
          subtype,
          true
        )}';   var id_nota = '${id}';  var content_paywall = '${isPremium}';`
        dataNucleoOrigen = ` var nucleo_origen = '${nucleoOrigen}'; var format_origen = '${formatOrigen}';var content_origen = '${contentOrigen}'; var gender_origen = '${genderOrigen}';var audiencia_nicho = '${audienciaNicho}'`
      } else if (!isStory && sectionList.length >= 2 && path !== 'buscar') {
        subsection = sectionList[1].replace('-', '')
      }
    }
  }

  if (isGallery) typeSpace = 'nota2'
  if (section.match(/publirreportaje|publireportaje/) !== null && isStory)
    typeSpace = 'nota5'

  return `
    var type_space = '${typeSpace}'; var site = '${getSite(
    site
  )}'; var type_template = '${template}'; var section = '${section}'; var subsection = '${subsection}'; var path_name = '${path}';
    ${dataStory} 
    ${dataNucleoOrigen}
`
}
const AppNexus = props => {
  const { isStory, globalContent } = props
  const isGallery = isStory && getTypeStory(globalContent)
  const data = getVars(props, isGallery)
  return (
    <script type="text/javascript" dangerouslySetInnerHTML={{ __html: data }} />
  )
}

export default AppNexus
