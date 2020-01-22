import React from 'react'
import ConfigParams from '../../../../utilities/config-params'

const classes = {
  title:
    'story-header__news-title pr-20 pl-20 mb-20 primary-font line-h-xs text-gray-300 title-xl',
  premiumWrapper:
    'premium__wrapper bg-primary flex justify-center items-center mb-10 ml-20',
  premiumText:
    'premium__text flex justify-center items-center text-black font-bold icon-padlock',
}

const StoryHeaderChildHeading = props => {
  const { title, isPremium = '', arcSite = '' } = props || {}

  return (
    <>
      {isPremium && ConfigParams.SITE_ELCOMERCIO === arcSite && (
        <div className={classes.premiumWrapper}>
          <p className={classes.premiumText}>Suscriptor Digital</p>
        </div>
      )}
      {title && <h1 className={classes.title}> {title}</h1>}
    </>
  )
}

export default StoryHeaderChildHeading
