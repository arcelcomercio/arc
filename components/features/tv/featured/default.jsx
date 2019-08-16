import React, { useState, useEffect } from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'

import StoryData from '../../../utilities/story-data'
import { formattedTime } from '../../../utilities/helpers'

import TvBody from './_children/body'

const TvFeatured = props => {
  const { customFields: { section = '' } = {} } = props
  const { arcSite, contextPath, deployment } = useFusionContext()
  const { content_elements: contentElements = [] } =
    useContent({
      source: 'story-feed-by-section-with-custom-presets',
      query: { section, stories_qty: 1, preset1: '1350x570' },
      filter: schemaFilter,
    }) || {}
  const data = contentElements[0] || {}
  const menuSections =
    useContent({
      source: 'navigation-by-hierarchy',
      query: { hierarchy: 'tv-menu-default' },
      filter: `{ 
        children {
          name
          _id
          display_name
          url
          node_type
        }
      }`,
    }) || {}

  const {
    title,
    date,
    multimediaType, // basic | basic_video
    multimedia,
    videoId,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'lg',
  })

  /** Funciones */
  const getMultimedia = () => {
    let image = ''
    if (multimediaType === 'basic_video') {
      const {
        promo_items: {
          basic_video: {
            promo_items: {
              basic: { resized_urls: { preset1 } = {} } = {},
            } = {},
          } = {},
        } = {},
      } = data
      image = preset1 || multimedia
    } else if (multimediaType === 'basic') {
      const {
        promo_items: { basic: { resized_urls: { preset1 } = {} } = {} } = {},
      } = data
      image = preset1 || multimedia
    }
    return image
  }

  const getVideoId = () => {
    let auxVideoId = {}
    const { promo_items: { youtube_id: { content = '' } = {} } = {} } = data
    if (multimediaType === 'basic_video') {
      auxVideoId = { multimediaSource: videoId }
    } else if (multimediaType === 'basic') {
      auxVideoId = { youtubeId: content }
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

  const formatMenuSections = res => {
    const { children = [] } = res || {}
    const auxList = children.map(el => {
      if (el.node_type === 'link') {
        return {
          name: el.display_name,
          url: el.url,
          node_type: el.node_type,
        }
      }
      return {
        name: el.name,
        url: el._id,
        node_type: el.node_type,
      }
    })
    return auxList
  }
  /** Estados */
  const [clientDate, setClientDate] = useState('')

  useEffect(() => {
    if (date) {
      setClientDate(formatDateLocalTimeZone(date))
    }
  })

  return (
    <TvBody
      {...{
        title,
        multimedia: getMultimedia(),
        isNewStory: validateNewStory(date),
        date,
        clientDate,
        videoId: getVideoId(),
        menuSections: formatMenuSections(menuSections),
      }}
    />
  )
}

TvFeatured.propTypes = {
  customFields,
}

TvFeatured.label = 'Tv - destaque'

export default TvFeatured
