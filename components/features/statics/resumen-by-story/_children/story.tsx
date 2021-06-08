import * as React from 'react'

import Image from '../../../../global-components/image'

const StaticsResumen2020Story: React.FC<{
  date?: string
  title: string
  imgUrl: string
  caption: string
  subtitle: string
  url?: string
}> = (props) => {
  const { date, title, imgUrl, caption, subtitle, url } = props
  return (
    <div className="st">
      <div className="st__time-container">
        <time className="st__time" dateTime="20/1/2020">
          {date}
        </time>
      </div>
      <h2 className="st__title">{url ? <a href={url}>{title}</a> : title}</h2>
      {imgUrl && (
        <>
          <Image
            src={imgUrl}
            width={809}
            height={0}
            alt={title}
            className="st__img"
            loading="lazy"
            sizes="(max-width: 360px) 360px, (max-width: 540px) 540px, 809px"
          />
          <figcaption className="st__cap">{caption}</figcaption>
        </>
      )}
      <p className="st__subtitle">{subtitle}</p>
    </div>
  )
}

export default React.memo(StaticsResumen2020Story)
