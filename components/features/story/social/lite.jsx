import { useAppContext } from 'fusion:context'
import React from 'react'

import ShareButtons from '../../../global-components/lite/share'
import TProLbl from '../../../global-components/trustprojectlabel'
import { addSlashToEnd } from '../../../utilities/parse/strings'
import StoryData from '../../../utilities/story-data'

const classes = {
  container: 'st-social f just-between',
  upsection: 'st-social__tooltdiv f alg-center uppercase',
  section: 'st-social__txt oflow-h uppercase',
  sectionLink: 'st-social__link oflow-h',
  buttons: 'st-social__share',
  special: 'st-social__special f',
  center: 'f f-center',
}

const StorySocialLite = () => {
  const { requestUri, globalContent, arcSite, contextPath } = useAppContext()

  const {
    taxonomy: { sections = [] } = {},
    websites = {},
    label: { trustproject } = {},
  } = globalContent || {}

  const { website_section: { path = '', name = '' } = {} } =
    websites[arcSite] || {}

  // En caso de que el primary section no devuelva "path" ni "name"
  const { name: auxName = '', path: auxPath = '/' } = sections[0] || {}

  const primarySection = name || auxName
  let primarySectionLink = path || auxPath
  primarySectionLink = addSlashToEnd(primarySectionLink)

  const isArchivoElcomercio = requestUri.includes('/archivo-elcomercio')

  const { isPremium, editorNote } = new StoryData({
    data: globalContent,
    contextPath,
  })

  return isArchivoElcomercio ? (
    <div className={classes.center}>
      <div className={classes.special}>
        <ShareButtons activeGoogleNews />
      </div>
    </div>
  ) : (
    <div className={classes.container}>
      <div className={classes.upsection}>
        <h2
          itemProp="name"
          className={`${classes.section}${
            isPremium ? ' st-social__premium' : ''
          }`}>
          {(editorNote && (
            <p
              itemProp="description"
              dangerouslySetInnerHTML={{ __html: editorNote }}
            />
          )) || (
            <a
              itemProp="url"
              className={classes.sectionLink}
              href={primarySectionLink}>
              {primarySection}
            </a>
          )}
        </h2>
        {trustproject && (
          <TProLbl trustproject={trustproject} plantilla="lite" />
        )}
      </div>
      <div className={classes.buttons}>
        <ShareButtons
          activeGoogleNews={
            arcSite === 'elcomercio' ||
            arcSite === 'elcomerciomag' ||
            arcSite === 'trome'
          }
          activeLinkedin={
            arcSite === 'elcomercio' ||
            arcSite === 'elcomerciomag' ||
            arcSite === 'peru21' ||
            arcSite === 'elbocon' ||
            arcSite === 'ojo' ||
            arcSite === 'gestion' ||
            arcSite === 'trome'
          }
        />
      </div>
    </div>
  )
}

StorySocialLite.label = 'Artículo - redes sociales'
StorySocialLite.static = true

export default StorySocialLite
