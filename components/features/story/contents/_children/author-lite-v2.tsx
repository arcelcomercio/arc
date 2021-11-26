import * as React from 'react'

import Image from '../../../../global-components/image'
import { locale } from '../../../../utilities/date-time/constants'

interface FeatureProps {
  authorsList?: {
    nameAuthor: string
    urlAuthor: string
    slugAuthor: string
    imageAuthor: string
    socialLinks: any
    mailAuthor: string
    role: string
    sortBiography: string
  }[]
  displayDate: string
  publishDate: string
}

const DEFAULT_AUTHOR_IMG =
  'https://cdna.elcomercio.pe/resources/dist/elcomercio/images/author.png?d=1'

const formatDate = (d: string) => {
  const rawDate = new Date(d)
  const timeZone = 'America/Lima'

  const year = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    timeZone,
  }).format(rawDate)
  const month = new Intl.DateTimeFormat(locale, {
    month: 'numeric',
    timeZone,
  }).format(rawDate)
  const day = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    timeZone,
  }).format(rawDate)
  const hours = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    timeZone,
    hour12: false,
  }).format(rawDate)
  const minutes = new Intl.DateTimeFormat(locale, {
    minute: '2-digit',
    timeZone,
    hour12: false,
  }).format(rawDate)
  return `${day}/${month}/${year} ${hours}H${minutes}`
}

const StoryContentChildAuthorLiteV2: React.FC<FeatureProps> = ({
  authorsList,
  displayDate,
  publishDate,
}) => (
  <div className="s-aut">
    <div>
      {authorsList?.map(({ imageAuthor, urlAuthor, nameAuthor }) => (
        <a href={urlAuthor} className="s-aut__img-l">
          <Image
            itemProp="image"
            src={imageAuthor}
            width={40}
            height={40}
            title={nameAuthor}
            alt={nameAuthor}
            placeholder={DEFAULT_AUTHOR_IMG}
            className="s-aut__img"
            uid={urlAuthor}
          />
        </a>
      ))}
    </div>
    <div className="s-aut__n-cont f">
      {authorsList?.map(({ urlAuthor, nameAuthor, mailAuthor }) => (
        <div className="s-aut__n-item">
          <a href={`mailto:${mailAuthor}`}>
            <svg
              width="20"
              height="13"
              viewBox="0 0 20 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1425:2)">
                <path
                  d="M0.792977 0C0.582925 0 0.381477 0.0834426 0.232948 0.231971C0.0844191 0.3805 0.000976563 0.581949 0.000976562 0.792V11.492C0.000976563 11.7021 0.0844191 11.9035 0.232948 12.052C0.381477 12.2006 0.582925 12.284 0.792977 12.284H18.622C18.832 12.284 19.0335 12.2006 19.182 12.052C19.3305 11.9035 19.414 11.7021 19.414 11.492V0.792C19.414 0.581949 19.3305 0.3805 19.182 0.231971C19.0335 0.0834426 18.832 0 18.622 0L0.792977 0Z"
                  fill="#6F6F6F"
                />
                <path
                  d="M0.123047 0.791992L9.63105 8.31999L19.414 0.791992"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </g>
              <defs>
                <clipPath id="clip0_1425:2">
                  <rect width="19.535" height="12.282" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
          <a href={urlAuthor} className="s-aut__n">
            {nameAuthor}
          </a>
        </div>
      ))}
    </div>
    <div className="s-aut__time">
      <time dateTime={displayDate}>{formatDate(displayDate) || ''}</time>
      <time dateTime={publishDate}>
        {publishDate ? ` - ACTUALIZADO A ${formatDate(publishDate)}` : ''}
      </time>
    </div>
  </div>
)

export default StoryContentChildAuthorLiteV2
