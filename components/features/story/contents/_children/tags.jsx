import React from 'react'
import { SITE_ELCOMERCIOMAG } from '../../../../utilities/constants/sitenames'
import UtilListKey from '../../../../utilities/list-keys'

const classes = {
  container: 'story-tags mt-25 mb-20',
  title: 'story-tags__title mb-10 primary-font font-bold text-lg line-h-none',
  tag: 'inline-block primary-font text-lg mr-5 mb-5',
  link:
    'story-tags__link block bg-gray-100 text-gray-200 pt-5 pb-5 pr-10 pl-10',
}
const StoryContentChildTags = ({ data, isAmp, arcSite }) => {
  const isMag = arcSite === SITE_ELCOMERCIOMAG
  classes.title = isMag ? `${classes.title} inline-block` : classes.title
  classes.link = isMag
    ? classes.link.replace(/bg-gray-100|pr-10/g, '')
    : classes.link

  return (
    data.length > 0 && (
      <div className={classes.container}>
        <h4
          itemProp="name"
          className={isAmp ? `amp-${classes.title}` : classes.title}>
          {isAmp && isMag ? 'Archivado en:' : 'Tags Relacionados:'}
        </h4>
        {data.map(
          ({ slug, text }, idx) =>
            slug &&
            text && (
              <h2
                itemProp="name"
                key={UtilListKey(idx)}
                className={classes.tag}>
                <a
                  itemProp="url"
                  className={isAmp ? `amp-${classes.link}` : classes.link}
                  href={slug && `/noticias/${slug}/`}>
                  {text}
                </a>
              </h2>
            )
        )}
      </div>
    )
  )
}

export default StoryContentChildTags
