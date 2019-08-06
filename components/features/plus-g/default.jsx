import React from 'react'
import PlusGChild from './_children/destaque-g'
import customFields from './_dependencies/custom-fields'

const PlusG = props => {
  const { customFields: { model, bgColor } = {} } = props
  const params = {
    model,
    bgColor,
  }
  return <PlusGChild {...params} />
}

PlusG.propTypes = {
  customFields,
}

PlusG.label = 'Destaque Plus G'
export default PlusG
