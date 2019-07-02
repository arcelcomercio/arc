import React from 'react'
import Icon from '../../../../global-components/multimedia-icon'

const classes = {
  item: 'separator__item w-full h-full p-0 position-relative',
  detail: 'separator__detail position-absolute bottom-0 pr-15 pl-15',
  text: 'separator__title overflow-hidden text-white text-md line-h-sm',
  mvideo: 'separator--video',
  imgBox: 'p-0 m-0 w-full h-full',
  img: 'separator__img w-full h-full object-cover object-center',
  icon: `separator__icon title-sm`,
}

export default ({ title, imageUrl, mediaIcon, link, numline }) => {
  return (
    <a href={link} target="_BLANK" rel="noopener noreferrer">
      <article role="listitem" className={classes.item}>
        <Icon type={mediaIcon} iconClass={classes.icon} />
        <div className={classes.detail}>
          <h3 className={`${classes.text} ${numline}`}>{title}</h3>
        </div>
        <figure className={classes.imgBox}>
          <img src={imageUrl} alt={title} className={classes.img} />
        </figure>
      </article>
    </a>
  )
}
