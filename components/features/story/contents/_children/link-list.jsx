import React from 'react'
import { getResizedUrl } from '../../../../utilities/resizer'

const Item = ({ url, title, image, imageDefault, site, isAmp }) => {
  const classAmp = isAmp ? 'amp-' : ''
  const classes = {
    multimedia: `${classAmp}story-content__link-list-figure position-relative`,
    image: `${classAmp}story-content__link-list-image w-full h-full`,
    item: `${classAmp}story-content__link-list-item flex flex-row mt-20`,
    info: `${classAmp}story-content__link-list-information w-full md:pr-10 pl-20`,
    titleLink: `${classAmp}story-content__link-list-title-link underline font-bold overflow-hidden`,
  }

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

  const imgAmp = (
    <a href={url}>
      <amp-img
        src={extractImage(image).small || imageDefault}
        alt={title}
        width="96"
        height="64"
        tabindex="0"
        class={classes.image}
      />
    </a>
  )

  const figuregHtml = (
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
  )

  return (
    <div className={classes.item}>
      {isAmp ? imgAmp : figuregHtml}
      <div className={classes.info}>
        <span className={classes.titleLink}>
          <a href={url}>{title}</a>
        </span>
      </div>
    </div>
  )
}

function LinkList({
  items,
  multimediaLazyDefault,
  arcSite,
  isAmp = false,
  isAdmin = false,
}) {
  const classAmp = isAmp ? 'amp-' : ''
  const classes = {
    container: `${classAmp}story-content__link-list position-relative p-20 mb-20 mt-20 mr-20`,
    title: `${classAmp}story-content__link-list-title uppercase mb-20`,
  }

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
              isAmp={isAmp}
              isAdmin={isAdmin}
            />
          )
        })}
    </div>
  )
}

export default LinkList
