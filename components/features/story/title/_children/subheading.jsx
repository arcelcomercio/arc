import React from 'react'
import ENV from 'fusion:environment'
import ConfigParams from '../../../../utilities/config-params'

const isProd = ENV.ENVIRONMENT === 'elcomercio'

const classes = {
  description:
    'story-header__news-summary pr-20 pl-20 mb-20 secondary-font line-h-sm text-gray-300 text-xl font-normal',
  premiumWrapper: `premium__wrapper bg-primary flex justify-center items-center mb-10 ml-20 ${
    isProd ? 'hidden' : ''
  }`,
  premiumText:
    'premium__text flex justify-center items-center text-black font-bold icon-padlock',
}

const StoryHeaderChildShareSubheading = data => {
  const { subTitle, isPremium = '', arcSite = '' } = data || {}

  return (
    <>
      {subTitle && <h2 className={classes.description}> {subTitle}</h2>}
      {isPremium && ConfigParams.SITE_ELCOMERCIO === arcSite && (
        <div className={classes.premiumWrapper}>
          <p className={classes.premiumText}>Suscriptor Digital</p>
        </div>
      )}
    </>
  )
}

export default StoryHeaderChildShareSubheading
