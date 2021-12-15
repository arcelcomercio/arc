import * as React from 'react'

import Image from '../../../../../global-components/image'

const classes = {
  despiece: 'despiece',
  listTitle: 'despiece__list-title',
  title: 'despiece__title',
  body: 'despiece__body',
  img: 'despiece__img'
}

const StoryContentChildDespiece: React.FC<{
  data: any
}> = (props) => {
  const {
    data: { embed: { config: { data: { listTitle = '', title = '', html = '', img = '' } = {}, } = {}, } = {}, } = {},
  } = props

  return (
    <div className={classes.despiece}>
      <div className={classes.listTitle}>{listTitle}</div>
      <div className={classes.title}>{title}</div>
      <div
        className={classes.body}
        dangerouslySetInnerHTML={{
          __html: html.trim()
        }}
      />
      {img && 
      <Image
        src={img}
        data-src={img}
        width={700}
        height={400}
        alt={title}
        className={classes.img}
        loading="lazy"
      />}
    </div>
  )
}

export default StoryContentChildDespiece