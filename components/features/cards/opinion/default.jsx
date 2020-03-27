import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import PropTypes from 'prop-types'

import filterSchema from './_dependencies/schema-filter'
import { defaultImage } from '../../../utilities/assets'
import { includeSections } from '../../../utilities/included-fields'

import OpinionChildCard from './_children/card'

const API_STORY_BY_SECTION = 'story-by-section'

const CardOpinion = props => {
  const { deployment, contextPath, arcSite } = useFusionContext()
  const {
    customFields: {
      titleOpinion = '',
      section1: pathSection1 = '',
      section2: pathSection2 = '',
      section3: pathSection3 = '',
      section4: pathSection4 = '',
      uriImageSection1 = '',
      uriImageSection2 = '',
      uriImageSection3 = '',
      uriImageSection4 = '',
    },
  } = props || {}

  const fetchDataModel = pathSection => {
    return {
      source: API_STORY_BY_SECTION,
      query: {
        website: arcSite,
        section: pathSection,
        includedFields: `websites.${arcSite}.website_url,headlines.basic,subheadlines.basic,canonical_url,${includeSections},taxonomy.sections.additional_properties.original.site_topper.site_logo_image`,
      },
      filter: filterSchema(arcSite),
    }
  }

  const section1 =
    useContent(pathSection1 ? fetchDataModel(pathSection1) : {}) || {}
  const section2 =
    useContent(pathSection2 ? fetchDataModel(pathSection2) : {}) || {}
  const section3 =
    useContent(pathSection3 ? fetchDataModel(pathSection3) : {}) || {}
  const section4 =
    useContent(pathSection4 ? fetchDataModel(pathSection4) : {}) || {}

  const getInstanceSnap = (el, customImage, pathSection) => {
    const {
      headlines: { basic = '' } = {},
      taxonomy: { sections: secs = [] } = {},
      websites = {},
    } = el || {}
    const { website_url: websiteUrl = '' } = websites[arcSite] || {}

    const {
      name = '',
      path = '',
      additional_properties: {
        original: { site_topper: { site_logo_image: siteLogo = '' } = {} } = {},
      } = {},
    } = secs.find(x => x.path === pathSection) || {}

    const urlImg =
      customImage ||
      siteLogo ||
      defaultImage({
        deployment,
        contextPath,
        arcSite,
        size: 'sm',
      })

    return {
      title: basic,
      urlImg,
      urlNew: websiteUrl,
      sectionName: name,
      urlSection: path,
    }
  }

  const getFormatedData = (item1, item2, item3, item4) => {
    return [
      getInstanceSnap(item1, uriImageSection1, pathSection1),
      getInstanceSnap(item2, uriImageSection2, pathSection2),
      getInstanceSnap(item3, uriImageSection3, pathSection3),
      getInstanceSnap(item4, uriImageSection4, pathSection4),
    ]
  }

  const params = {
    titleOpinion,
    arcSite,
    dataList: getFormatedData(section1, section2, section3, section4),
  }

  return <OpinionChildCard {...params} />
}

CardOpinion.label = 'Listado de Opinión + ícono'
CardOpinion.static = true

CardOpinion.propTypes = {
  customFields: PropTypes.shape({
    titleOpinion: PropTypes.string.isRequired.tag({
      name: 'Título: ',
    }),
    section1: PropTypes.string.isRequired.tag({
      name: 'Path de sección:',
      group: 'Seccion 1',
    }),
    uriImageSection1: PropTypes.string.tag({
      name: 'URL de imagen:',
      group: 'Seccion 1',
    }),
    section2: PropTypes.string.isRequired.tag({
      name: 'Path de sección:',
      group: 'Seccion 2',
    }),
    uriImageSection2: PropTypes.string.tag({
      name: 'URL de imagen:',
      group: 'Seccion 2',
    }),
    section3: PropTypes.string.isRequired.tag({
      name: 'Path de sección:',
      group: 'Seccion 3',
    }),
    uriImageSection3: PropTypes.string.tag({
      name: 'URL de imagen:',
      group: 'Seccion 3',
    }),
    section4: PropTypes.string.isRequired.tag({
      name: 'Path de sección:',
      group: 'Seccion 4',
    }),
    uriImageSection4: PropTypes.string.tag({
      name: 'URL de imagen:',
      group: 'Seccion 4',
    }),
  }),
}

export default CardOpinion
