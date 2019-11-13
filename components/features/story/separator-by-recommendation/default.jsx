import React, { useEffect, useState } from 'react'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'

import schemaFilter from './_dependencies/schema-filter'
import StorySeparatorByRecommendationChildItem from './_children/item'
import StoryData from '../../../utilities/story-data'
import { getUUID } from '../../../utilities/analytics/clavis-service'
import { clavisClicked, clavisRendered, buildClavisRenderedResponse } from '../../../utilities/analytics/clavis-recommendations'

const classes = {
  separator: 'story-separator block non-tablet non-mobile w-full h-auto',
  body: 'story-separator__body flex mt-0 mb-0 p-20',
}

const STORIES_QTY = 4

const StorySeparatorByRecommendation = () => {

  const {
    arcSite,
    globalContent,
    deployment,
    contextPath,
  } = useFusionContext()

  const contentId = globalContent ? globalContent._id : ''
  const [query, setQuery] = useState({})

  const { content_elements: recommendations = [] } = useContent(query) || {}

  useEffect(() => {
    /**
     * Se define el contenido de la `query` para `useContent` dentro del 
     * `useEffect` porque la función `getUUID()` y `document.referrer` necesitan 
     * tener el DOM disponible.
     */
    setQuery({
      source: 'clavis-recommendations',
      query: {
        uid: getUUID(),
        contentId,
        count: STORIES_QTY,
        referrer: document.referrer,
      },
      filter: schemaFilter(arcSite)
    })
  }, [])

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024
    /**
     * Esto esta dentro de un `useEffect` para que sólamene registre la 
     * impresión de las historias recomendadas una vez la data esté 
     * inequívocamente disponible y evitar errores en `clavisRendered`.
     * 
     * Por ahora sólo registra en Clavis que las historias recomendadas han sido 
     * renderizadas cuando el dispositivo tenga un `width >= 1024`.
     */
    if (recommendations && recommendations.length > 0 && isDesktop) {
      clavisRendered({
        contentId,
        count: STORIES_QTY,
        site: arcSite,
        response: buildClavisRenderedResponse([...recommendations])
      })
    }


  }, [recommendations])

  /**
   * @description Envia a Clavis información sobre la historia recomendada a la que se 
   * ha hecho click y luego redirige al usuario a la historia.
   * 
   * @param {*} event Event
   * @param {string} clickedUrl URL de la historia recomendada a la que se ha hecho **clic**.
   * 
   * @see clavisClicked
   */
  const clickedRecommendation = (event, clickedUrl) => {
    event.preventDefault();
    clavisClicked({
      contentId,
      count: STORIES_QTY, // Por ahora al ser desktop renderiza todas
      site: arcSite,
      clickedUrl,
      response: buildClavisRenderedResponse([...recommendations])
    })
    window.location.href = clickedUrl;
  }

  const renderItems = (stories) => {
    const instance = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })

    return (
      stories &&
      stories.map((story, i) => {
        instance.__data = story

        const data = {
          title: instance.title,
          link: instance.websiteLink,
          section: instance.primarySection,
          sectionLink: instance.primarySectionLink,
          multimediaPortraitXS: instance.multimediaPortraitXS,
          multimediaType: instance.multimediaType,
        }
        return (
          <StorySeparatorByRecommendationChildItem
            data={data}
            // eslint-disable-next-line react/no-array-index-key
            key={`separator-recommended-story-${i}`}
            clickedRecommendation={clickedRecommendation}
          />
        )
      })
    )
  }


  return (
    <div className={classes.separator}>
      <div className={classes.body}>
        {renderItems(recommendations)}
      </div>
    </div>
  )

}

StorySeparatorByRecommendation.label = 'Separador de artículo'
// StorySeparatorByRecommendation.static = true

export default StorySeparatorByRecommendation
