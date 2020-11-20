import * as React from 'react'
import { useAppContext } from 'fusion:context'

import StorySocialAmpChildSocial from './_children/amp-social'
import NextStoryButton from '../next-story-button/amp'
import { SITE_ELCOMERCIOMAG } from '../../../utilities/constants/sitenames'

const classes = {
  container:
    'amp-sh__fixed flex justify-center pl-15 pr-15 border-b-1 border-solid border-gray',
  buttonClass:
    'amp-sh__next-story flex items-center justify-center secondary-font text-sm',
  arrowClass: 'text-xl',
}

/**
 * Por ahora este feature debe estar disponible
 * solo para Mag.
 */
const StorySocialAmp = () => {
  const { arcSite } = useAppContext()

  return (
    arcSite === SITE_ELCOMERCIOMAG && (
      <div className={classes.container}>
        <StorySocialAmpChildSocial />
        <NextStoryButton
          buttonClass={classes.buttonClass}
          arrowClass={classes.arrowClass}
          source="header"
        />
      </div>
    )
  )
}

StorySocialAmp.label = 'Artículo - redes sociales'
StorySocialAmp.static = true

export default StorySocialAmp
