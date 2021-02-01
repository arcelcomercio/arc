import * as React from 'react'

import { reduceWord } from '../../../../utilities/parse/strings'
import Image from '../../../../global-components/image'

/**
 * @see styles src/websites/elcomercio/scss/components/trivias/_trivias-list.scss
 */
const classes = {
  container: 'trivias-re-item',
  figure: 'trivias-re-item__figure',
  image: 'trivias-re-item__img',
  content: 'trivias-re-item__content',
  title: 'trivias-re-item__title',
  link: 'trivias-re-item__link',
}

/**
 *
 * @param {object} props
 * @param {boolean} props.clientResize
 * @param {string} props.image
 * @param {string} props.title
 * @param {string} props.link
 * @param {string} props.alt
 */
const TriviasRecommendedItem = ({
  clientResize,
  alt = '',
  image = '',
  title = '',
  link = '/',
}) => {
  return (
    <div className={classes.container}>
      <figure className={classes.figure}>
        <Image
          src={image}
          width={211}
          height={121}
          sizes="(max-width: 480px) 166px, 211px"
          alt={alt}
          className={classes.image}
          loading="auto"
          clientResize={clientResize}
        />
      </figure>
      <div className={classes.content}>
        <h3 className={classes.title}>{reduceWord(title, 30)}</h3>
        <a href={link} className={classes.link}>
          Empezar
        </a>
      </div>
    </div>
  )
}

export default React.memo(TriviasRecommendedItem)
