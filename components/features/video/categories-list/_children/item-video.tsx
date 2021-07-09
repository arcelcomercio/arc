import React from 'react'
import { FC } from 'types/features'

interface Props {
  customFields?: {
    hierarchyConfig?: string
  }
}

const classes = {
  wrapper: 'video-categories-list__item-video',
}

const ItemVideo: FC<Props> = (props) => {
  
}

ItemVideo.label = 'Listado de videos de categorías'

export default ItemVideo