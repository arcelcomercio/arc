import React from 'react'

const classes = {
  item: 'separator__item w-full h-full pt-0 pr-0 pb-0 pl-0 position-relative',
  detail: 'separator__detail position-absolute bottom-0',
  separatorTitle: 'separator__title overflow-hidden title-xs',
  separatorLink: 'separator__title-link',
  mvideo: 'separator--video',
}

export default ({ title, imageUrl, typeNote, link, numline }) => {
  return (
    <article className={classes.item}>
      {typeNote === 'video' && <span>&#8227;</span>}
      {typeNote === 'gallery' && <span>G</span>}
      <div className={classes.detail}>
        <h2 className={`${classes.separatorTitle} ${numline}`}>
          <a href={link} className={classes.separatorLink}>
            {title}
          </a>
        </h2>
      </div>
      <figure>
        {link && (
          <a href={link}>
            <img src={imageUrl} alt={title} />
          </a>
        )}
      </figure>
    </article>
  )
}
