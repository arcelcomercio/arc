import React from 'react'

import Image from '../../../../../global-components/image'
import MultimediaIcon from '../../../../../global-components/lite/multimedia-icon'
import { SITE_DEPOR } from '../../../../../utilities/constants/sitenames'

const CardMostReadChildItem = (props) => {
  const { item, viewImage, arcSite, metaValue } = props
  const { websiteUrl, imageUrl, title, storyType, isPremium } = item

  const classes = {
    item: `most-read__item `,
    link: `most-read__link f`,
    figure: `most-read__multimedia f pos-rel`,
    img: 'most-read__img ',
    icon: 'most-read__icon',
    title: `most-read__txt w-full `,
    numLines: 'three-lines',
    logoPremium: 'most-read__logo-premium',
    boxTime: 'most-read__box-time',
    time: 'most-read__time',
    iconPlay: 'most-read__icon-play',
  }

  if (viewImage) classes.numLines = 'four-lines'

  let customWidth = 118
  let customHeight = 72

  if (arcSite === SITE_DEPOR) {
    customWidth = 314
    customHeight = 157
  } else if (metaValue('section_style') === 'story-v2-standard') {
    customWidth = 85
    customHeight = 85
  } else if (metaValue('section_style') === 'story-v2-video') {
    customWidth = 160
    customHeight = 92
  }

  return (
    <article role="listitem" className={classes.item}>
      <a itemProp="url" href={websiteUrl} className={classes.link}>
        {viewImage && (
          <figure className={classes.figure}>
            <Image
              src={imageUrl}
              width={customWidth}
              height={customHeight}
              alt={title}
              className={classes.img}
              loading="lazy"
            />
            {metaValue('section_style') === 'story-v2-video' ? (
              <div className={classes.boxTime}>
                <div className={classes.iconPlay} />
                <p className={classes.time}>1:30</p>
              </div>
            ) : (
              <MultimediaIcon type={storyType} />
            )}
          </figure>
        )}
        <h4 itemProp="name" className={`${classes.title} ${classes.numLines}`}>
          {metaValue('section_style') === 'story-v2-standard' && isPremium && (
            <svg
              className={classes.logoPremium}
              width="12.36"
              height="16"
              viewBox="0 0 17 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.7036 16.775C11.2594 16.775 10.9632 16.6375 10.519 16.5L8.74198 15.8125L6.96501 16.5C6.66885 16.6375 6.22461 16.775 5.78037 16.775C5.48421 16.775 5.33613 16.775 5.03996 16.6375L4.29956 22L8.74198 19.25L13.1844 22L12.2959 16.6375C12.1478 16.775 11.8517 16.775 11.7036 16.775Z"
                fill="#AB8900"
              />
              <path
                d="M15.998 8.1125C15.8499 7.8375 15.8499 7.425 15.998 7.15L16.8865 5.5C17.1827 4.95 16.8865 4.2625 16.1461 3.9875L14.2211 3.3C13.9249 3.1625 13.6287 2.8875 13.4807 2.6125L12.7402 0.825C12.5922 0.275 12.1479 0 11.7037 0C11.5556 0 11.2594 0 11.1114 0.1375L9.18631 0.9625H8.74207C8.59399 0.9625 8.44591 0.9625 8.29783 0.825L6.37278 0.1375C6.2247 0 5.92854 0 5.78046 0C5.33621 0 4.89197 0.275 4.59581 0.6875L3.85541 2.6125C3.85541 2.8875 3.55925 3.1625 3.26308 3.3L1.18995 3.9875C0.597631 4.125 0.301469 4.8125 0.597631 5.5L1.48611 7.2875C1.6342 7.5625 1.6342 7.975 1.48611 8.25L0.597631 9.9C0.301469 10.45 0.597631 11.1375 1.33803 11.4125L3.26308 12.1C3.55925 12.2375 3.85541 12.5125 4.00349 12.7875L4.74389 14.575C4.89197 15.125 5.33621 15.4 5.78046 15.4C5.92854 15.4 6.07662 15.4 6.2247 15.2625L8.14975 14.4375C8.29783 14.4375 8.44591 14.3 8.59399 14.3C8.74207 14.3 8.89015 14.3 9.03823 14.4375L10.9633 15.2625C11.1114 15.4 11.2594 15.4 11.4075 15.4C11.8518 15.4 12.296 15.125 12.5922 14.7125L13.3326 12.925C13.4807 12.65 13.7768 12.375 14.073 12.2375L15.998 11.55C16.5903 11.275 17.0346 10.5875 16.7384 10.0375L15.998 8.1125V8.1125ZM8.74207 13.2C5.48429 13.2 2.81884 10.725 2.81884 7.7C2.81884 4.675 5.48429 2.2 8.74207 2.2C11.9998 2.2 14.6653 4.675 14.6653 7.7C14.6653 10.725 11.9998 13.2 8.74207 13.2Z"
                fill="#AB8900"
              />
              <path
                d="M13.1844 7.7002C13.1844 8.79421 12.7164 9.84342 11.8832 10.617C11.0501 11.3906 9.92019 11.8252 8.74198 11.8252C7.56378 11.8252 6.43383 11.3906 5.60072 10.617C4.7676 9.84342 4.29956 8.79421 4.29956 7.7002C4.29956 6.60618 4.7676 5.55697 5.60072 4.78338C6.43383 4.00979 7.56378 3.5752 8.74198 3.5752C9.92019 3.5752 11.0501 4.00979 11.8832 4.78338C12.7164 5.55697 13.1844 6.60618 13.1844 7.7002V7.7002Z"
                fill="#AB8900"
              />
            </svg>
          )}
          {title}
        </h4>
      </a>
    </article>
  )
}

export default CardMostReadChildItem
