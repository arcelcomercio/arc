import React, { useState, useEffect } from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'

import StoryData from '../../../utilities/story-data'
import { formattedTime } from '../../../utilities/helpers'

import TvBody from './_children/body'
import { includePromoItems } from '../../../utilities/included-fields'

const TvFeatured = props => {
  const { customFields: { section = '' } = {} } = props
  const { arcSite, contextPath, deployment } = useFusionContext()
  const data =
    useContent({
      source: 'story-by-section',
      query: {
        section,
        presets: 'preset1:1350x570,preset2:1023x450,preset3:624x285',
        includedFields: `headlines.basic,display_date,${includePromoItems},promo_items.basic_html.content`,
      },
      filter: schemaFilter,
    }) || {}

  const { title, date, getPromoItemsType, multimedia, videoId } = new StoryData(
    {
      data,
      arcSite,
      contextPath,
      deployment,
      defaultImgSize: 'lg',
    }
  )
  const multimediaType = getPromoItemsType()
  /** Funciones */
  const getMultimedia = () => {
    let image = ''
    if (multimediaType === 'basic_video') {
      const {
        promo_items: {
          basic_video: {
            promo_items: {
              basic: { resized_urls: { preset1, preset2, preset3 } = {} } = {},
            } = {},
          } = {},
        } = {},
      } = data
      image = {
        desktop: preset1 || multimedia,
        tablet: preset2 || multimedia,
        mobile: preset3 || multimedia,
      }
    } else {
      const {
        promo_items: {
          basic: { resized_urls: { preset1, preset2, preset3 } = {} } = {},
        } = {},
      } = data
      image = {
        desktop: preset1 || multimedia,
        tablet: preset2 || multimedia,
        mobile: preset3 || multimedia,
      }
    }
    return image
  }

  const getVideoId = () => {
    let auxVideoId = {}

    if (multimediaType === 'basic_video') {
      auxVideoId = { multimediaSource: videoId }
    } else if (multimediaType === 'youtube_id') {
      const { promo_items: { youtube_id: { content = '' } = {} } = {} } = data
      auxVideoId = { youtubeId: content }
    } else {
      const { promo_items: { basic_html: { content = '' } = {} } = {} } = data
      auxVideoId = { multimediaEmbed: content }
    }
    return auxVideoId
  }

  const formatDateLocalTimeZone = rawDate => {
    const auxDate = new Date(rawDate)
    const today = new Date()
    if (
      auxDate.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0] ===
      today.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0]
    ) {
      return formattedTime(auxDate)
    }
    return `${auxDate.getUTCDate()}/${auxDate.getUTCMonth() +
      1}/${auxDate.getUTCFullYear()}`
  }

  const validateNewStory = (rawDate, hours = 24) => {
    const initDate = new Date(rawDate)
    const timeStamp = Math.round(new Date().getTime() / 1000)
    const timeStampYesterday = timeStamp - hours * 3600
    return initDate >= new Date(timeStampYesterday * 1000).getTime()
  }

  /** Estados */
  /**
   * TODO: revisar manejo de fecha. Creo que se hizo asi para poder usar la fecha local
   * en lugar de la fecha del servidor si el feature tuviera static true pero creo
   * que se puede manejar sin necesidad de estados con metodos que ya existen.
   */
  const [clientDate, setClientDate] = useState('')

  useEffect(() => {
    if (date) {
      setClientDate(formatDateLocalTimeZone(date))
    }
  }, [date])

  return (
    <TvBody
      {...{
        title,
        multimedia: getMultimedia(),
        isNewStory: validateNewStory(date),
        date,
        // section: `${section}/`,
        clientDate,
        videoId: getVideoId(),
        // menuSections: formatMenuSections(menuSections),
      }}
    />
  )
}

TvFeatured.propTypes = {
  customFields,
}

TvFeatured.label = 'Tv - destaque'

export default TvFeatured
