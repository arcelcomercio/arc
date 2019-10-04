import React from 'react'

import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import customFields from './_dependencies/custom-fields'

import SectionTitle from '../../../global-components/independent-title'

const HeaderSectionTitle = ({
  customFields: {
    section = '',
    sectionUrl = '',
    bgColor = '',
    fontColor = '',
    TextType = 'h1',
  } = {},
}) => {
  const { contextPath, globalContent: data } = useFusionContext()

  const { primarySectionLink, primarySection } = new StoryData({
    data,
    contextPath,
  })

  const title = section || primarySection
  const link = sectionUrl || primarySectionLink

  const params = {
    title,
    link,
    bgColor,
    fontColor,
    TextType,
  }

  return <SectionTitle {...params} />
}

HeaderSectionTitle.propTypes = {
  customFields,
}

HeaderSectionTitle.label = 'Cabecera - Título independiente'
HeaderSectionTitle.static = true

export default HeaderSectionTitle
