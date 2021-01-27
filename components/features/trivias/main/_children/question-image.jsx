import * as React from 'react'

import Image from '../../../../global-components/image'

const classes = {
  picture: 'trivias-quiz__picture',
  image: 'trivias-quiz__image',
}

/**
 *
 * @param {object} props
 * @param {number} props.height
 * @param {number} props.width
 * @param {string} props.image
 * @param {string} props.alt
 */
const QuestionImage = ({ height, width, image, alt }) => {
  return (
    <figure
      style={{
        margin: '0 auto',
        width: '100%',
        height: 'auto',
        paddingTop: `${(height * 100) / width}%`,
        position: 'relative',
      }}>
      <Image
        src={image}
        width={540}
        height={Math.floor((height * 540) / width)}
        sizes="(max-width: 360px) 360px, 540px"
        alt={alt}
        className={classes.image}
        pictureClassName={classes.picture}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          height: '100%',
          width: '100%',
        }}
        loading="eager"
        clientResize
      />
    </figure>
  )
}

export default React.memo(QuestionImage)
