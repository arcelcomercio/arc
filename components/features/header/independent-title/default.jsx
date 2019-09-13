import React from 'react'

import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import customFields from './_dependencies/custom-fields'

const classes = {
  titulo: 'title-independient w-full text-white pt-10 pb-10',
  link:
    'title-independient__link flex justify-center title-xs font-bold uppercase',
}

const HeaderIndependentTitle = ({
  customFields: {
    section = '',
    sectionUrl = '',
    bgColor = '',
    fontColor = '',
  } = {},
}) => {
  const { contextPath, globalContent: data } = useFusionContext()

  const { primarySectionLink, primarySection } = new StoryData({
    data,
    contextPath,
  })

  const title = section || primarySection
  const link = sectionUrl || primarySectionLink

  return (
    <div className={`${classes.titulo} ${bgColor}`}>
      <a href={link} className={`${classes.link} ${fontColor}`}>
        {title}
      </a>
    </div>
  )
}

HeaderIndependentTitle.propTypes = {
  customFields,
}

HeaderIndependentTitle.label = 'Cabecera - Título independiente'
HeaderIndependentTitle.static = true

export default HeaderIndependentTitle
