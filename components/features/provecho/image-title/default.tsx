import * as React from 'react'

import customFields from './_dependencies/custom-fields'

const classes = {
  container: 'provecho-image-title',
  containerBigImage: 'provecho-image-title--big-image',
  titleBox: 'provecho-image-title__title-box',
  title: 'provecho-image-title__title',
  picture: 'provecho-image-title__picture',
  image: 'provecho-image-title__image',
}

const ProvechoImageTitle: React.FC = (props) => {
  const {
    customFields: { urlImage = '', link = '', title = '', isBigImage = false },
  } = props
  const classBigImage = isBigImage ? classes.containerBigImage : ''
  return (
    <div className={`${classes.container} ${classBigImage}`}>
      <div className={classes.titleBox}>
        <a href={link} className={classes.title}>
          {title}
        </a>
      </div>
      <picture className={classes.picture}>
        <a href={link}>
          <img
            className={classes.image}
            src={urlImage}
            alt={title}
            title={title}
          />
        </a>
      </picture>
    </div>
  )
}

ProvechoImageTitle.propTypes = {
  customFields,
}

ProvechoImageTitle.label = 'Image con título - Provecho'
ProvechoImageTitle.static = true

export default ProvechoImageTitle
