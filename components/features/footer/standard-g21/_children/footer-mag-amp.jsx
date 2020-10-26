import React from 'react'
import getProperties from 'fusion:properties'
import { getAssetsPath } from '../../../../utilities/assets'

const classes = {
  footer: 'w-full bg-primary text-center p-20',
  logoContainer: 'mb-10',
  text: 'secondary-font',
}

const FooterStandardMagAmp = ({ arcSite, contextPath }) => {
  const { assets: { footer: { logoAmp } = {} } = {} } = getProperties(arcSite)

  const logoUrl =
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/${logoAmp}?d=1` || ''

  return (
    <footer className={classes.footer}>
      <div className={classes.logoContainer}>
        <amp-img
          width="90"
          height="41"
          src={logoUrl}
          alt={`Logo de ${arcSite}`}
        />
      </div>
      <p className={classes.text}>Todos los derechos reservados</p>
    </footer>
  )
}

export default React.memo(FooterStandardMagAmp)
