import React from 'react'

import { SITE_OJO } from '../../utilities/constants/sitenames'
import { getMultimediaAnalitycs } from '../../utilities/helpers'
import StoryData from '../../utilities/story-data'

const getSite = (site) => {
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
const dataLayer = (
  multimediaType,
  subtype,
  id,
  getPremiumValue,
  nucleoOrigen,
  formatOrigen,
  contentOrigen,
  genderOrigen,
  author,
  section,
  subsection,
  tag1,
  tag2
) => {
  const premium = getPremiumValue === 'premium' && true
  const type = getMultimediaAnalitycs(multimediaType, subtype, true)

  return `window.dataLayer = window.dataLayer || [];window.dataLayer.push({ 'seccion': '${section}','subseccion': '${subsection}','tipo_nota' : '${type}', 'id_nota' : '${id}','tag1': '${tag1}','tag2': '${tag2}','premium' : '${premium}','autor' : '${author || `Redacción`}','nucleo_ID' : '${nucleoOrigen}',    'tipo_formato' : '${formatOrigen}','tipo_contenido' : '${contentOrigen}','genero' : '${genderOrigen}'});`
}

const userStatus = () => `var user_type = '';
  if (window.localStorage.hasOwnProperty('ArcId.USER_INFO') && window.localStorage.getItem('ArcId.USER_INFO') !== '{}') {
    user_type = 'lgdin';
    var UUID_USER = JSON.parse(window.localStorage.getItem('ArcId.USER_INFO') || "{}").uuid;
    var COUNT_USER = JSON.parse(window.localStorage.getItem('ArcP') || "{}")[UUID_USER];
  
    if (COUNT_USER && COUNT_USER.sub.p.length) {
      user_type = 'paid';
    }
  } else {
    var user_type = 'anon';
  }`

const dataLayerSomos = (id, title, isPremium, subsection, userStat) => `
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 
    'event' : 'ViewContent',
    'content_ids' : '${id}',
    'content_type' : 'product',
    'content_name' : '${title}',
    'content_paywall' : '${isPremium}',
    'content_category' : '${subsection}',
    'User_status' : ${userStat}
  });`

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

  let notaId = ''
  let titleSo = ''
  let isPreSo = ''
  let userStat = ''

  let scriptLayer = ''

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
          title,
          multimediaType,
          primarySectionLink,
          getPremiumValue,
          nucleoOrigen,
          formatOrigen,
          author,
          contentOrigen,
          genderOrigen,
          audienciaNicho,
          subtype,
          tags,
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

        const subSectionList = primarySectionLink.split('/').slice(1) || []
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
        scriptLayer = dataLayer(
          multimediaType,
          subtype,
          id,
          getPremiumValue,
          nucleoOrigen,
          formatOrigen,
          contentOrigen,
          genderOrigen,
          author,
          subSectionList[0] || 'sin-definir',
          subSectionList[1] || 'sin-definir',
          tags[0]?.slug || 'sin-definir',
          tags[1]?.slug || 'sin-definir'
        )

        notaId = `${id}`
        titleSo = `${title}`
        isPreSo = `${isPremium}`
        userStat = 'user_type'
      } else if (!isStory && sectionList.length >= 2 && path !== 'buscar') {
        subsection = sectionList[1].replace('-', '')
      }
    }
  }

  if (isGallery) typeSpace = 'nota2'
  if (section.match(/publirreportaje|publireportaje/) !== null && isStory)
    typeSpace = 'nota5'
  // const scriptLayerType = arcSite === SITE_OJO ? scriptLayer : ''
  const scriptLayerType = scriptLayer // para todas las marcas
  const isSomos = requestUri.includes('/somos/')
  return `var type_space = '${typeSpace}'; var site = '${getSite(
    site
  )}'; var type_template = '${template}'; var section = '${section}'; var subsection = '${subsection}'; var path_name = '${path}'; ${dataStory} ${dataNucleoOrigen}; ${scriptLayerType} ${isSomos ? `${userStatus()} ${dataLayerSomos(
    notaId,
    titleSo,
    isPreSo,
    subsection,
    userStat
  )}`
    : ''
    }
    `
}

const AppNexus = (props) => {
  const { isStory, globalContent } = props
  const isGallery = isStory && getTypeStory(globalContent)
  const data = getVars(props, isGallery)
  return (
    <script type="text/javascript" dangerouslySetInnerHTML={{ __html: data }} />
  )
}

export default AppNexus
