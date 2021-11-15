import React from 'react'

import {
  SITE_DIARIOCORREO,
  SITE_ELCOMERCIO,
} from '../../../../utilities/constants/sitenames'

const classes = {
  description:
    'story-header__news-summary pr-20 pl-20 mb-20 secondary-font line-h-sm text-gray-300 text-xl font-normal',
  premiumWrapper: `premium__wrapper bg-primary flex justify-center items-center mb-10 ml-20`,
  premiumText:
    'premium__text flex justify-center items-center text-black font-bold icon-padlock',
}

const StoryHeaderChildShareSubheading = (data) => {
  const { subTitle, isPremium = '', arcSite = '', items, type = '' } =
    data || {}

  return (
    <>
      {subTitle && items && type !== 'list' && (
        <h2 itemProp="name" className={classes.description}>
          {' '}
          {subTitle}
        </h2>
      )}
      {isPremium && SITE_ELCOMERCIO === arcSite && (
        <div className={classes.premiumWrapper}>
          <p itemProp="description" className={classes.premiumText}>
            Suscriptor Digital
          </p>
        </div>
      )}
      {isPremium && SITE_DIARIOCORREO === arcSite && (
        <div className={classes.premiumWrapper}>
          <p
            itemProp="description"
            className="premium__text flex justify-center items-center text-white">
            <span style={{ color: '#FFD333' }}>★</span>&nbsp;&nbsp;COMUNIDAD
            DIGITAL
          </p>
        </div>
      )}
    </>
  )
}

export default StoryHeaderChildShareSubheading
