import React from 'react'

import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import customFields from './_dependencies/custom-fields'

const classes = {
  titulo: 'w-full text-white ',
  link: ' ',
}

const HeaderTitleIndependiente = () => {
  const {
    contextPath,
    globalContent: data,
    customFields: {
      section = '',
      sectionUrl = '',
      bgColor = '',
      fontColor = '',
    } = {},
  } = useFusionContext()

  const { primarySectionLink, primarySection } = new StoryData({
    data,
    contextPath,
  })

  const title = section || primarySection
  const link = sectionUrl || primarySectionLink

  return (
    <>
      <div className={`${classes.titulo} ${bgColor}`}>
        <a
          href={link}
          className={`${classes.titulo} ${fontColor}`}
          href={sectionUrl}>
          {title}
        </a>
      </div>
    </>
  )
}

HeaderTitleIndependiente.propTypes = {
  customFields,
}

HeaderTitleIndependiente.label = 'Header - Título independiente'
HeaderTitleIndependiente.static = true

export default HeaderTitleIndependiente
