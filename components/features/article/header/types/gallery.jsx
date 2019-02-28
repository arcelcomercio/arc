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

const Gallery = props => {
  //console.log(props.data);debugger;
  const { content_elements: elements } = props.data
  console.log(elements)
  debugger
  return (
    <Fragment>
      <Slider>
        {elements.map((item, index) => (
          <div className="item">
            <div className={classes.itemSlideImg} key={index}>
              <Image
                url={'http://' + item.resized_urls['4:3']}
                className={classes.itemImageComponent}
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

export default Gallery
