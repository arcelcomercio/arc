import * as React from 'react'

import Image from '../../../../global-components/image'

/**
 * @param {object} props
 * @param {string} props.date
 * @param {string} props.title
 * @param {string} props.imgUrl
 * @param {string} props.caption
 * @param {string} props.subtitle
 * @param {string} props.url
 * @see estilos src/websites/elcomercio/scss/components/statics/resumen-2020/_story.scss
 */
const StaticsResumen2020Story = ({
  date,
  title,
  imgUrl,
  caption,
  subtitle,
  url,
}) => {
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
            sizes="(max-width: 640px) 640px, 809px"
          />
          <figcaption className="st__cap">{caption}</figcaption>
        </>
      )}
      <p className="st__subtitle">{subtitle}</p>
    </div>
  )
}

export default StaticsResumen2020Story
