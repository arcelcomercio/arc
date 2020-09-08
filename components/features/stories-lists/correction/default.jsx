import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'

import Item from './_children/item'
import StoryData from '../../../utilities/story-data'

import { formatDateLocalTimeZone } from '../../../utilities/helpers'
import {
  getActualDate,
  // getYYYYMMDDfromISO,
} from '../../../utilities/date-time/dates'
import { ELEMENT_CUSTOM_EMBED } from '../../../utilities/constants/element-types'
import { STORY_CORRECTION } from '../../../utilities/constants/subtypes'

const CONTENT_SOURCE = 'story-feed-by-correction'

const classes = {
  list: 'stories-list-correction',
  label: 'stories-list-correction__label block mb-15',
}

const StoriesListCorrection = props => {
  const { arcSite, globalContent } = useFusionContext()

  const {
    customFields: {
      storiesQty,
      includedFields = '',
      // titleList,
    },
  } = props

  const {
    page_number: pageNumber = 0,
    content_elements: contentElements = [],
  } = globalContent || {}

  const params = {
    from: pageNumber,
    size: storiesQty,
    includedFields,
  }

  const data =
    contentElements.length > 0
      ? globalContent
      : useContent({
          source: CONTENT_SOURCE,
          query: params,
          filter: schemaFilter(arcSite),
        }) || {}

  const story = new StoryData({
    arcSite,
  })

  const dataList = data.content_elements || []
  const dateCurrent = getActualDate()

  let correctionToday = []
  dataList.forEach(ele => {
    const list = ele.content_elements || []
    const dataToday = list.filter(
      ({
        subtype = '',
        type = '',
        embed: { config: { date = '' } = {} } = {},
      }) => {
        return (
          type === ELEMENT_CUSTOM_EMBED &&
          subtype === STORY_CORRECTION &&
          dateCurrent === formatDateLocalTimeZone(date, '-', true, false)
        )
      }
    )
    const correctionCurrent =
      dataToday.length > 0 ? [{ ...ele, content_elements: dataToday }] : []
    correctionToday = [...correctionToday, ...correctionCurrent]
  })

  let corrections = []
  dataList.forEach(ele => {
    const list = ele.content_elements || []
    const dataCorrection = list.filter(
      ({
        subtype = '',
        type = '',
        embed: { config: { date = '' } = {} } = {},
      }) => {
        return (
          type === ELEMENT_CUSTOM_EMBED &&
          subtype === STORY_CORRECTION &&
          dateCurrent !== formatDateLocalTimeZone(date, '-', true, false)
        )
      }
    )
    const correctionCurrent =
      dataCorrection.length > 0
        ? [{ ...ele, content_elements: dataCorrection }]
        : []
    corrections = [...corrections, ...correctionCurrent]
  })

  const contentCorrection = el => {
    story.__data = el
    const {
      websiteLink,
      title,
      contentElementsCorrectionList,
      displayDate,
    } = story
    const paramsItem = {
      websiteLink,
      title,
      contentElementsCorrectionList,
      displayDate,
    }
    return <Item {...paramsItem} />
  }

  return (
    <div className={classes.list}>
      {correctionToday.length > 0 && (
        <span className={classes.label}>Correcciones y aclaraciones del día</span>
      )}
      {correctionToday.map(el => {
        return contentCorrection(el)
      })}
      {corrections.length > 0 && (
        <span className={classes.label}>Correcciones y aclaraciones de días anteriores</span>
      )}
      {corrections.map(el => {
        return contentCorrection(el)
      })}
    </div>
  )
}

StoriesListCorrection.propTypes = {
  customFields,
}

StoriesListCorrection.label = 'Listado de corrección de notas'
StoriesListCorrection.static = true

export default StoriesListCorrection
