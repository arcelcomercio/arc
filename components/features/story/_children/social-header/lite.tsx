import React from 'react'
import { FC } from 'types/features'

import ShareButtons from '../../../../global-components/lite/share/social'
import TProLbl from '../../../../global-components/trustprojectlabel'

const classes = {
  container: 'st-social f just-between',
  upsection: 'st-social__tooltdiv f alg-center uppercase',
  section: 'st-social__txt oflow-h uppercase',
  sectionLink: 'st-social__link oflow-h',
  buttons: 'st-social__share',
  special: 'st-social__special f',
  center: 'f f-center',
}

interface FeatureProps {
  primarySection?: string
  primarySectionLink?: string
  isPremium?: string
  trustproject?: string
  arcSite?: string
  postPermaLink?: string
  postTitle?: string
}

const StorySocialHeaderLite: FC<FeatureProps> = (data) => {
  const {
    primarySection,
    primarySectionLink,
    isPremium,
    trustproject,
    arcSite,
    postPermaLink,
    postTitle,
  } = data || {}

  return (
    <>
      <div className={classes.container}>
        <div className={classes.upsection}>
          <h2
            itemProp="name"
            className={`${classes.section}${
              isPremium ? ' st-social__premium' : ''
            }`}>
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
              arcSite === 'gestion'
            }
            arcSite={arcSite}
            postPermaLink={postPermaLink}
            postTitle={postTitle}
          />
        </div>
      </div>
    </>
  )
}

StorySocialHeaderLite.label = 'Artículo - redes sociales'

export default StorySocialHeaderLite
