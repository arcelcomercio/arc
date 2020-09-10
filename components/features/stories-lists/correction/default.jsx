import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'

import Item from './_children/item'
import StoryData from '../../../utilities/story-data'

import {
  getActualDate,
  formatDateLocalTimeZone,
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

    const correctionCurrent = []
    list.forEach(el => {
      const {
        subtype = '',
        type = '',
        embed: { config: { date = '' } = {} } = {},
      } = el
      if (
        type === ELEMENT_CUSTOM_EMBED &&
        subtype === STORY_CORRECTION &&
        dateCurrent === formatDateLocalTimeZone(date, '-', true, false)
      ) {
        correctionCurrent.push({ ...ele, content_elements: [el] })
      }
    })
    correctionToday = [...correctionToday, ...correctionCurrent]
  })

  let corrections = []
  dataList.forEach(ele => {
    const list = ele.content_elements || []

    const correctionCurrent = []
    list.forEach(el => {
      const {
        subtype = '',
        type = '',
        embed: { config: { date = '' } = {} } = {},
      } = el
      if (
        type === ELEMENT_CUSTOM_EMBED &&
        subtype === STORY_CORRECTION &&
        dateCurrent !== formatDateLocalTimeZone(date, '-', true, false)
      ) {
        correctionCurrent.push({ ...ele, content_elements: [el] })
      }
    })

    corrections = [...corrections, ...correctionCurrent]
  })

  const timestamp = date => {
    return Date.parse(date)
  }

  corrections = corrections.sort((a, b) => {
    const { embed: { config: { date: dateA = '' } = {} } = {} } =
      a.content_elements[0] || {}
    const { embed: { config: { date: dateB = '' } = {} } = {} } =
      b.content_elements[0] || {}
    if (timestamp(dateA) > timestamp(dateB)) {
      return -1
    }
    if (timestamp(dateA) < timestamp(dateB)) {
      return 1
    }

    return 0
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
