import React from 'react'

const classes = {
  item: 'separator__item w-full h-full p-0 position-relative',
  detail: 'separator__detail position-absolute bottom-0 pr-10 pl-10',
  separatorTitle: 'separator__title overflow-hidden ',
  separatorLink:
    'separator__title-link text-white text-sm line-h-none text-white',
  mvideo: 'separator--video',
  figure: 'p-0 m-0 w-full h-full',
  figureImg: 'w-full h-full object-cover object-center',
}

export default ({ title, imageUrl, storyType, link, numline }) => {
  return (
    <article role="listitem" className={classes.item}>
      {storyType === 'video' && <span>&#8227;</span>}
      {storyType === 'gallery' && <span>G</span>}
      <div className={classes.detail}>
        <h2 className={`${classes.separatorTitle} ${numline}`}>
          <a className={classes.separatorLink} href={link}>
            {title}
          </a>
        </h2>
      </div>
      <figure className={classes.figure}>
        {link && (
          <a href={link}>
            <img src={imageUrl} alt={title} className={classes.figureImg} />
          </a>
        )}
      </figure>
    </article>
  )
}
