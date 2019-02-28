import React, { Fragment } from 'react'
import Video from './video'
import Imagen from './image'

const ElePrincipal = props => {
  const { Basic: initialEl, basic } = props.data
  return (
    <Fragment>
      {basic && basic.type === 'image' && <Imagen data={basic} />}
      {initialEl && initialEl.type === 'video' && (
        <Video data={initialEl.embed_html} />
      )}
    </Fragment>
  )
}

export default ElePrincipal
