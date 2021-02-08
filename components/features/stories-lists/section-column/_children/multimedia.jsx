import * as React from 'react'

import Image from '../../../../global-components/image'
import getMultimediaIcon from '../../../../utilities/multimedia-icon'

const classes = {
  figure: 'position-relative mb-10 overflow-hidden block',
  icon:
    'sec-col__icon m-icon position-absolute text-center mx-auto rounded text-gray-100',
  image: 'sec-col__image w-full object-center object-cover',
}

const StoriesListsCardChildMultimedia = ({
  urlNews,
  multimedia,
  multimediaType,
}) => {
  const icon = getMultimediaIcon(multimediaType)
  return (
    <a itemProp="url" href={urlNews} className={classes.figure}>
      {icon ? <i className={`${icon} ${classes.icon}`} /> : null}
      <Image
        src={multimedia}
        width={314}
        height={157}
        alt=""
        className={classes.image}
        loading="lazy"
      />
    </a>
  )
}

export default React.memo(StoriesListsCardChildMultimedia)
