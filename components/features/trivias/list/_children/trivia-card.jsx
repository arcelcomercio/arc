import * as React from 'react'

import { reduceWord } from '../../../../utilities/parse/strings'
import Image from '../../../../global-components/image'

/**
 * @see styles src/websites/elcomercio/scss/components/trivias/_trivias-list.scss
 */
const classes = {
  container: 'trivias-item',
  figure: 'trivias-item__figure',
  image: 'trivias-item__img',
  content: 'trivias-item__content',
  title: 'trivias-item__title',
  link: 'trivias-item__link'
}

/**
 * 
 * @param {object} props
 * @param {string} props.image
 * @param {string} props.title
 * @param {string} props.link
 * @param {string} props.alt
 */
const TriviasListItem = ({
  alt = '',
  image = '',
  title = '',
  link = '/'
}) => {
  return (
    <div className={classes.container}>
      <figure className={classes.figure}>
        <Image 
          src={image}
          width={247}
          height={142}
          alt={alt}
          className={classes.image}
          loading="auto"
        />
      </figure>
      <div className={classes.content}>
        <h3 className={classes.title}>
          {reduceWord(title, 30)}
        </h3>
        <a href={link} className={classes.link}>
          Empezar
        </a>
      </div>
    </div>
  )
}

export default React.memo(TriviasListItem)