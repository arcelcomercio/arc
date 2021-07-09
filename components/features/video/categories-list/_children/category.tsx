import React from 'react'
import { FC } from 'types/features'
import ItemVideo from './item-video'

interface Props {
  category?: object
}

const classes = {
  wrapper: 'video-categories-list__category',
  // name: 'video-categories-list__category-name',
  name: 'play-list__name',
  morevideos: 'video-categories-list__category-more-videos',
}

const Category: FC<Props> = (props) => {
  const {category = ""} = props
  return(
    <div className={classes.wrapper}>
      <h2 className={classes.name}>{category.name}</h2>
      <div className={classes.morevideos}>Ver más videos ></div>
    </div>
  )
}

Category.label = 'Videos de Categoría'

export default Category