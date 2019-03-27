import React, { Fragment } from 'react'
import Image from '@arc-core-components/element_image'
import Slider from './slider'

const classes = {
  itemSlideImg: 'slider__slide slider__slide--image',
  itemImageComponent: 'visual__image visual__image--cover',
  itemDetail: 'slider__slide__details',
  itemDetailPagImage: 'slider__slide__details__image-ord num-photos',
  itemDetailDescription:
    'slider__slide__details__foto-description openSansRegular4',
}

export default props => {
  const { data: { content_elements: elements = [] } = {} } = props

  return (
    <Fragment>
      <Slider>
        {elements.map((item, index) => (
          <div className="item">
            <div className={classes.itemSlideImg} key={item.url}>
              <Image
                url={item.url}
                alt={item.subtitle}
                className={classes.itemImageComponent}
                width=""
                height=""
                layout=""
              />
            </div>
            <div className={classes.itemDetail}>
              <span className={classes.itemDetailPagImage}>
                {index + 1} / 5
              </span>
              <p className={classes.itemDetailDescription}>
                A continuación, te mostramos en qué países (Perú, Brasil,
                Colombia y Chile) se miente más en las hojas de vida. (Foto:
                Shutterstock)
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </Fragment>
  )
}
