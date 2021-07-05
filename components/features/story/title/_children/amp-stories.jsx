import React from 'react'

import {
  SITE_DEPOR,
  SITE_DIARIOCORREO,
  SITE_ELBOCON,
  SITE_GESTION,
  SITE_OJO,
  SITE_PERU21,
  SITE_TROME,
} from '../../../../utilities/constants/sitenames'

const AmpStoriesChild = ({ arcSite }) => (
  <>
    {arcSite === SITE_TROME && (
      <amp-iframe
        height="150"
        layout="fixed-height"
        sandbox="allow-scripts allow-popups allow-same-origin allow-top-navigation"
        src="https://stories.trome.pe/spc/load/ZECO_453_877_194/132/amp/stories-amp"
        noloading="">
        <amp-img
          layout="fill"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          placeholder
        />
      </amp-iframe>
    )}
    {arcSite === SITE_PERU21 && (
      <amp-iframe
        height="150"
        layout="fixed-height"
        sandbox="allow-scripts allow-popups allow-same-origin allow-top-navigation"
        src="https://stories.peru21.pe/spc/load/ZECO_453_877_194/188/amp/stories-amp"
        noloading="">
        <amp-img
          layout="fill"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          placeholder
        />
      </amp-iframe>
    )}
    {arcSite === SITE_OJO && (
      <amp-iframe
        height="150"
        layout="fixed-height"
        sandbox="allow-scripts allow-popups allow-same-origin allow-top-navigation"
        src="https://stories.ojo.pe/spc/load/ZECO_453_877_194/200/amp/stories-amp"
        noloading="">
        <amp-img
          layout="fill"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          placeholder
        />
      </amp-iframe>
    )}
    {arcSite === SITE_DEPOR && (
      <amp-iframe
        height="150"
        layout="fixed-height"
        sandbox="allow-scripts allow-popups allow-same-origin allow-top-navigation"
        src="https://stories.depor.com/spc/load/ZECO_453_877_194/70/amp/stories-amp"
        noloading="">
        <amp-img
          layout="fill"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          placeholder
        />
      </amp-iframe>
    )}
    {arcSite === SITE_DIARIOCORREO && (
      <amp-iframe
        height="150"
        layout="fixed-height"
        sandbox="allow-scripts allow-popups allow-same-origin allow-top-navigation"
        src="https://stories.diariocorreo.pe/spc/load/ZECO_453_877_194/229/amp/stories-amp"
        noloading="">
        <amp-img
          layout="fill"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          placeholder
        />
      </amp-iframe>
    )}
    {arcSite === SITE_ELBOCON && (
      <amp-iframe
        height="150"
        layout="fixed-height"
        sandbox="allow-scripts allow-popups allow-same-origin allow-top-navigation"
        src="https://stories.elbocon.pe/spc/load/ZECO_453_877_194/71/amp/stories-amp"
        noloading="">
        <amp-img
          layout="fill"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          placeholder
        />
      </amp-iframe>
    )}
    {arcSite === SITE_GESTION && (
      <amp-iframe
        height="150"
        layout="fixed-height"
        sandbox="allow-scripts allow-popups allow-same-origin allow-top-navigation"
        src="https://stories.gestion.pe/spc/load/ZECO_453_877_194/228/amp/stories-amp"
        noloading="">
        <amp-img
          layout="fill"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          placeholder
        />
      </amp-iframe>
    )}
  </>
)

export default AmpStoriesChild
