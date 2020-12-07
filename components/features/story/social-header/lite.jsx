import * as React from 'react'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { getAssetsPath } from '../../../utilities/assets'

import DynamicShareButtons from '../../../global-components/lite/dynamic-share'
import NextStoryButton from '../next-story-button/lite'

// import { SITE_ELCOMERCIOMAG } from '../../../utilities/constants/sitenames'

const classes = {
  wrapper: 'wrap-sh',
  container: 'sh',
  shareContainer: 'sh__wrap-share',
  buttonClass: 'sh__next-story-button',
  logoClass: 'sh__logo',
  logoUrl: 'header__logo',
  arrowClass: 'sh__next-story-button__arrow',
  logo: 'header__logo',
}

const StorySocialHeader = () => {
  const { arcSite, contextPath } = useAppContext()

  const {
    assets: { header },
  } = getProperties(arcSite)

  const logoUrl = `${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/dist/${arcSite}/images/${header.inverted}?d=1`

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.shareContainer}>
          <DynamicShareButtons />
        </div>
        <a itemProp="url" href="/" title="" className={classes.logoClass}>
          <img src={logoUrl} alt="" className={classes.logoUrl} />
        </a>
        <NextStoryButton
          buttonClass={classes.buttonClass}
          arrowClass={classes.arrowClass}
          source="header"
        />
      </div>
    </div>
  )
}

StorySocialHeader.label = 'Header - redes sociales'
StorySocialHeader.static = true

export default StorySocialHeader
