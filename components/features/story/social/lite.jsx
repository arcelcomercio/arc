import React from 'react'
import { useFusionContext } from 'fusion:context'

import ShareButtons from '../../../global-components/lite/share'
import TProLbl from './_children/trustprojectlabel'

const classes = {
  container: 'st-social f just-between',
  upsection: 'st-social__tooltdiv uppercase',
  section: 'st-social__txt f f-center oflow-h uppercase',
  sectionLink: 'st-social__link oflow-h',
  buttons: 'st-social__share',
  special: 'st-social__special f',
  center: 'f f-center',
}

const StorySocialLite = () => {
  const { requestUri, globalContent } = useFusionContext()

  const {
    taxonomy: {
      primary_section: { name = '', path = '' } = {},
      sections = [],
    } = {},
    label: { trustproject } = {},
  } = globalContent || {}

  // En caso de que el primary section no devuelva "path" ni "name"
  const { name: auxName = '', path: auxPath = '/' } = sections[0] || {}

  const primarySection = name || auxName
  const primarySectionLink = path || auxPath

  const isArchivoElcomercio = requestUri.includes('/archivo-elcomercio')

  return isArchivoElcomercio ? (
    <div className={classes.center}>
      <div className={classes.special}>
        <ShareButtons />
      </div>
    </div>
  ) : (
    <div className={classes.container}>
      <div className={classes.upsection}>
        <h2 itemProp="name" className={classes.section}>
          <a
            itemProp="url"
            className={classes.sectionLink}
            href={primarySectionLink}>
            {primarySection}
          </a>
        </h2>
        {trustproject && (
          <TProLbl trustproject={trustproject} plantilla="lite" />
        )}
      </div>
      <div className={classes.buttons}>
        <ShareButtons />
      </div>
    </div>
  )
}

StorySocialLite.label = 'Artículo - redes sociales'
StorySocialLite.static = true

export default StorySocialLite
