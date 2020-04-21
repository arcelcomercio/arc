import React from 'react'
import { getResizedUrl } from '../../../../utilities/resizer'

const classes = {
  container:
    'story-content__link-list position-relative p-20 mb-20 mt-20 mr-20',
  title: 'story-content__link-list-title uppercase mb-20',
  multimedia: 'story-content__link-list-figure position-relative',
  image: 'w-full h-full lazy',
  item: 'story-content__link-list-item flex flex-row mt-20',
  info: 'story-content__link-list-information w-full md:pr-10 pl-20',
  titleLink: 'story-content__link-list-title-link underline font-bold',
}

const Item = ({ url, title, image, imageDefault, site }) => {
  const presets = 'small:96x64'
  const extractImage = urlImg => {
    if (typeof window === 'undefined') {
      return (
        getResizedUrl({
          url: urlImg,
          presets,
          arcSite: site,
        }) || {}
      )
    }
    return urlImg
  }

  return (
    <div className={classes.item}>
      <figure className={classes.multimedia}>
        <a href={url}>
          <img
            src={imageDefault}
            data-src={extractImage(image).small || imageDefault}
            alt={title}
            className={classes.image}
          />
        </a>
      </figure>
      <div className={classes.info}>
        <h2 className={classes.titleLink}>
          <a href={url}>{title}</a>
        </h2>
      </div>
    </div>
  )
}

function LinkList({ items, multimediaLazyDefault, arcSite }) {
  return (
    <div className={classes.container}>
      <div className={classes.title}>Mira también:</div>
      {items &&
        items.map(data => {
          const { url = '', content = '', image: { url: urlImg = '' } = {} } =
            data || {}
          return (
            <Item
              url={url}
              title={content}
              image={urlImg}
              imageDefault={multimediaLazyDefault}
              site={arcSite}
            />
          )
        })}
    </div>
  )
}

export default LinkList
