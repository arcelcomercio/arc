import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import * as React from 'react'

import { ELEMENT_GALLERY } from '../../../utilities/constants/element-types'
import { SITE_ELCOMERCIO } from '../../../utilities/constants/sitenames'
import {
  GALLERY_SLIDER,
  MINUTO_MINUTO,
  PARALLAX,
} from '../../../utilities/constants/subtypes'
import { deleteQueryString } from '../../../utilities/parse/queries'
import { removeLastSlash } from '../../../utilities/parse/strings'
import TopAnchor from './_children/anchor'
import customFields from './_dependencies/custom-fields'
import { stContinueScript } from './_dependencies/scripts'

const StoryContinueLite = (props) => {
  const { customFields: { activeAnchor } = {} } = props
  const { globalContent, arcSite, requestUri } = useAppContext()
  const { taxonomy: { tags = [] } = {}, websites = {} } = globalContent || {}

  const {
    website_section: { path = '' },
  } = websites[arcSite] || {}
  const { slug: tag = '' } = tags[0] || {}
  const cleanRequestUri = deleteQueryString(requestUri)
  const { idGoogleAnalitics } = getProperties(arcSite)

  const isComercio = arcSite === SITE_ELCOMERCIO

  const getStoriesBySectionQty = () => {
    /**
     * Para El Comercio, cantidad de notas por seccion
     * para filtrar, varia dependiendo si hay tag
     */
    if (isComercio) {
      return tag ? 10 : 20
    }
    // Por defecto seran 15 para filtrar
    return 15
  }

  const tagStories =
    useContent(
      isComercio
        ? {
            source: 'story-feed-by-tag',
            query: {
              name: tag,
              stories_qty: 10,
              includedFields: `websites.${arcSite}.website_url,headlines.basic,promo_items.basic_gallery.type,subtype,content_restrictions.content_code`,
              contentType: 'metered,free',
            },
          }
        : {}
    ) || {}

  const sectionStories =
    useContent({
      source: 'story-feed-by-section',
      query: {
        section: removeLastSlash(path),
        stories_qty: getStoriesBySectionQty(),
        includedFields: `websites.${arcSite}.website_url,headlines.basic,promo_items.basic_gallery.type,subtype,content_restrictions.content_code`,
        contentType: 'metered,free',
      },
    }) || {}

  const sectionStoriesPremium =
    useContent(
      isComercio
        ? {
            source: 'story-feed-by-section',
            query: {
              section: removeLastSlash(path),
              stories_qty: getStoriesBySectionQty(),
              includedFields: `websites.${arcSite}.website_url,headlines.basic,promo_items.basic_gallery.type,subtype,content_restrictions.content_code`,
              contentType: 'premium',
            },
          }
        : {}
    ) || {}

  const { content_elements: tagElements = [] } = tagStories
  const { content_elements: sectionElements = [] } = sectionStories
  const {
    content_elements: sectionElementsPremium = [],
  } = sectionStoriesPremium

  const filterStoriesCb = (story = {}) => {
    const {
      websites: { [arcSite]: { website_url: websiteUrl = '' } = {} } = {},
      promo_items: { basic_gallery: { type } = {} } = {},
    } = story
    // Filtra las historias que no son Galeria horizontal
    return (
      !/^\/(somos|archivo-elcomercio|videos|recetas)\//.test(websiteUrl) &&
      cleanRequestUri !== websiteUrl &&
      ((type === ELEMENT_GALLERY && story.subtype !== GALLERY_SLIDER) ||
        (type !== ELEMENT_GALLERY && story.subtype === GALLERY_SLIDER)) &&
      story.subtype !== PARALLAX &&
      story.subtype !== MINUTO_MINUTO
    )
  }

  const filterStories = (stories = []) =>
    stories
      .filter(filterStoriesCb)
      .map(
        ({
          websites: { [arcSite]: { website_url: websiteUrl = '' } = {} } = {},
          headlines: { basic = '' } = {},
        }) => ({ link: websiteUrl, title: basic })
      )

  const getTotalStoriesBySection = () => {
    if (isComercio) {
      /**
       * Para El Comercio, cantidad de notas por seccion
       * varia dependiendo si hay notas por Tag
       */
      const existTagStories = tag && tagElements && tagElements[0]
      return existTagStories ? 5 : 10
    }
    // Por defecto, son 5 notas por seccion
    return 5
  }

  const filteredStories = {
    storiesByTag: tag ? filterStories(tagElements).slice(0, 5) : [],
    storiesBySection: filterStories(sectionElements).slice(
      0,
      getTotalStoriesBySection()
    ),
    storiesBySectionPremium: filterStories(sectionElementsPremium).slice(
      0,
      getTotalStoriesBySection()
    ),
  }

  const filledStContinueScript = stContinueScript(idGoogleAnalitics)
    .replace(/<<arcSite>>/g, arcSite)
    .replace(
      '"<<recentStoriesrecentStoriesrecentStories>>"',
      JSON.stringify({
        section: removeLastSlash(path),
        data: filteredStories,
      })
    )

  return (
    <>
      <div id="st-continue-0" style={{ height: '10px' }} />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: filledStContinueScript,
        }}
      />
      {activeAnchor ? <TopAnchor /> : null}
    </>
  )
}

StoryContinueLite.propTypes = {
  customFields,
}

StoryContinueLite.label = 'Artículo - Notas continuas'
StoryContinueLite.static = true

export default StoryContinueLite
