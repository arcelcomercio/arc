import React, { Fragment } from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryItem from '../../../global-components/story-item'
import Ads from '../../../global-components/ads'

const classes = {
  listado: 'w-full',
  listadoSeeMore: 'flex justify-center mt-20 uppercase',
  adsBox: 'flex items-center flex-col no-desktop pb-20',
}

const StoriesListNew = props => {
  const hasAds = (index, adsList) => adsList.filter(el => el.pos === index)
  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()

  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
    } = {},
  } = props
  const { customFields: customFieldsProps = {} } = props

  const data =
    useContent({
      source: contentService,
      query: contentConfigValues,
      filter: schemaFilter(arcSite),
    }) || {}

  const { content_elements: contentElements } = data || {}
  const stories = contentElements || []

  const activeAds = Object.keys(customFieldsProps)
    .filter(prop => prop.match(/adsMobile(\d)/))
    .filter(key => customFieldsProps[key] === true)

  const activeAdsArray = activeAds.map(el => {
    return {
      name: `movil${el.slice(-1)}`,
      pos: customFieldsProps[`adsMobilePosition${el.slice(-1)}`] || 0,
      inserted: false,
    }
  })

  // Archivo sólo está disponible para secciones principales, no subsecciones.
  // const seeMorePath = `/archivo/${section.split('/')[1]}/`

  return (
    <div className={classes.listado}>
      <div>
        {stories &&
          stories.map((story, index) => {
            const ads = hasAds(index + 1, activeAdsArray)
            return (
              <Fragment key={`Section-storie-${story._id}`}>
                <StoryItem
                  data={story}
                  {...{ deployment, contextPath, arcSite, isAdmin }}
                  formato="row"
                />
                {ads.length > 0 && (
                  <div className={classes.adsBox}>
                    <Ads adElement={ads[0].name} isDesktop={false} isMobile />
                  </div>
                )}
              </Fragment>
            )
          })}
      </div>
      <div className={classes.listadoSeeMore}>
        <a href="/" tabIndex="0" role="button">
          Ver más
        </a>
      </div>
    </div>
  )
}

StoriesListNew.propTypes = {
  customFields,
}

StoriesListNew.label = 'Listado de Noticia'
StoriesListNew.static = true

export default StoriesListNew
