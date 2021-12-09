import React from 'react'
import { FC } from 'types/features'

import customFields from './_dependencies/custom-fields'

const classes = {
  wrapper: 'custom-title-section',
  content: 'custom-title-section__content',
}

interface Props {
  customFields?: {
    textAlign?: string
    customText?: string
    isUppercase?: boolean
  }
}

const CustomTitleSection: FC<Props> = (props) => {
  const { customFields: { textAlign, customText, isUppercase } = {} } = props

  return (
    <div
      className={`${classes.wrapper} justify-${textAlign} ${
        isUppercase ? 'uppercase' : ''
      }`}>
      <h1 className={classes.content}>{customText}</h1>
    </div>
  )
}

CustomTitleSection.propTypes = {
  customFields,
}

CustomTitleSection.label = 'Título de Sección'

export default CustomTitleSection
