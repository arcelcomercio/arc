import * as React from 'react'

import Item from './_children/item'
import customFields from './_dependencies/custom-fields'

const classes = {
  container: 'title__container',
  containerBgRed: 'title__container--bg-red',
}

const Title: React.FC = (props) => {
  const {
    customFields: { title = '', color: colorInput = '#000' },
  } = props
  return (
    <div
      className={`${classes.container} ${classes.containerBgRed}`}
      style={{
        color: colorInput,
      }}>
      {title || 'titulo 2'}
      <Item />
    </div>
  )
}

Title.propTypes = {
  customFields,
}

Title.label = 'Título de prueba'
Title.static = true

export default Title
