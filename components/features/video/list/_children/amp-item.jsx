import React from 'react'

const classes = {
  videoList: 'amp-video-list__item flex mb-40',
  link: 'amp-video-list__image position-relative mr-20',
  picture: 'block mb-10',
  duration: 'amp-video-list__time position-absolute flex items-center spr-5 ',
  title: 'line-h-xs text-xl font-bold amp-video-list__title overflow-hidden',
}

export default ({ websiteLink, title, multimediaSquareMD, videoDuration }) => {
  return (
    <div className={classes.videoList}>
      <a className={classes.link} href={websiteLink}>
        <amp-img
          src={multimediaSquareMD}
          layout="responsive"
          width="304"
          height="200"
          alt={title}
        />
        <span className={classes.duration}>{videoDuration}</span>
      </a>
      <a href={websiteLink}>
        <h3 className={classes.title}>{title}</h3>
      </a>
    </div>
  )
}
