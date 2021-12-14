import { useAppContext } from 'fusion:context'
import React from 'react'

import Image from '../../../global-components/image/index'
import ShareButtons from '../../../global-components/lite/share'
import TProLbl from '../../../global-components/trustprojectlabel'
import { SITE_TROME } from '../../../utilities/constants/sitenames'
import { addSlashToEnd } from '../../../utilities/parse/strings'
import StoryData from '../../../utilities/story-data'
import { storyTagsBbc } from '../../../utilities/tags'

const classes = {
  container: 'st-social f just-between',
  upsection: 'st-social__tooltdiv f alg-center uppercase',
  section: 'st-social__txt oflow-h uppercase',
  sectionLink: 'st-social__link oflow-h',
  buttons: 'st-social__share',
  special: 'st-social__special f',
  center: 'f f-center',
  tagPremium:'st-social__tag'
}

const StorySocialLite = () => {
  const {
    requestUri,
    globalContent,
    arcSite,
    contextPath,
    metaValue,
  } = useAppContext()

  const {
    taxonomy: { sections = [], tags = [] } = {},
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

  const tromePremiumTag = isPremium && arcSite === SITE_TROME

  return metaValue('section_style') !== 'story-v2-standard' &&
    isArchivoElcomercio ? (
    <div className={classes.center}>
      <div className={classes.special}>
        <ShareButtons activeGoogleNews />
      </div>
    </div>
  ) : (
    <div
      className={`${classes.container} ${metaValue('section_style') === 'story-v2-standard' && storyTagsBbc(tags)
        ? 'st-social--bbc'
        : ''
        }`}>
      <div className={classes.upsection}>
        {metaValue('section_style') === 'story-v2-standard' && isPremium && (
          <svg
            style={{ marginRight: '12px' }}
            width="17"
            height="22"
            viewBox="0 0 17 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.7036 16.775C11.2594 16.775 10.9632 16.6375 10.519 16.5L8.74198 15.8125L6.96501 16.5C6.66885 16.6375 6.22461 16.775 5.78037 16.775C5.48421 16.775 5.33613 16.775 5.03996 16.6375L4.29956 22L8.74198 19.25L13.1844 22L12.2959 16.6375C12.1478 16.775 11.8517 16.775 11.7036 16.775Z"
              fill="#AB8900"
            />
            <path
              d="M15.998 8.1125C15.8499 7.8375 15.8499 7.425 15.998 7.15L16.8865 5.5C17.1827 4.95 16.8865 4.2625 16.1461 3.9875L14.2211 3.3C13.9249 3.1625 13.6287 2.8875 13.4807 2.6125L12.7402 0.825C12.5922 0.275 12.1479 0 11.7037 0C11.5556 0 11.2594 0 11.1114 0.1375L9.18631 0.9625H8.74207C8.59399 0.9625 8.44591 0.9625 8.29783 0.825L6.37278 0.1375C6.2247 0 5.92854 0 5.78046 0C5.33621 0 4.89197 0.275 4.59581 0.6875L3.85541 2.6125C3.85541 2.8875 3.55925 3.1625 3.26308 3.3L1.18995 3.9875C0.597631 4.125 0.301469 4.8125 0.597631 5.5L1.48611 7.2875C1.6342 7.5625 1.6342 7.975 1.48611 8.25L0.597631 9.9C0.301469 10.45 0.597631 11.1375 1.33803 11.4125L3.26308 12.1C3.55925 12.2375 3.85541 12.5125 4.00349 12.7875L4.74389 14.575C4.89197 15.125 5.33621 15.4 5.78046 15.4C5.92854 15.4 6.07662 15.4 6.2247 15.2625L8.14975 14.4375C8.29783 14.4375 8.44591 14.3 8.59399 14.3C8.74207 14.3 8.89015 14.3 9.03823 14.4375L10.9633 15.2625C11.1114 15.4 11.2594 15.4 11.4075 15.4C11.8518 15.4 12.296 15.125 12.5922 14.7125L13.3326 12.925C13.4807 12.65 13.7768 12.375 14.073 12.2375L15.998 11.55C16.5903 11.275 17.0346 10.5875 16.7384 10.0375L15.998 8.1125V8.1125ZM8.74207 13.2C5.48429 13.2 2.81884 10.725 2.81884 7.7C2.81884 4.675 5.48429 2.2 8.74207 2.2C11.9998 2.2 14.6653 4.675 14.6653 7.7C14.6653 10.725 11.9998 13.2 8.74207 13.2Z"
              fill="#AB8900"
            />
            <path
              d="M13.1844 7.7002C13.1844 8.79421 12.7164 9.84342 11.8832 10.617C11.0501 11.3906 9.92019 11.8252 8.74198 11.8252C7.56378 11.8252 6.43383 11.3906 5.60072 10.617C4.7676 9.84342 4.29956 8.79421 4.29956 7.7002C4.29956 6.60618 4.7676 5.55697 5.60072 4.78338C6.43383 4.00979 7.56378 3.5752 8.74198 3.5752C9.92019 3.5752 11.0501 4.00979 11.8832 4.78338C12.7164 5.55697 13.1844 6.60618 13.1844 7.7002V7.7002Z"
              fill="#AB8900"
            />
          </svg>
        )}
        {metaValue('section_style') === 'story-v2-standard' &&
          storyTagsBbc(tags) && (
            <a
              itemProp="url"
              href={primarySectionLink}
              className="st-social__bbc">
              <img
                src="https://assets.elnacional.com/bbc-news-mundo/BBC_News_Linear_Mundo_HR_RGB_728.webp"
                alt="BBC News | mundo"
              />
            </a>
          )}
        <h2
          itemProp="name"
          className={`${classes.section}${isPremium ? ' st-social__premium' : ''
            }`}
        >
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
          {tromePremiumTag && <Image
            src="https://cdna.trome.pe/resources/dist/trome/images/logo-club-trome.png?d=1"
            alt="Logo de Club Trome"
            className={classes.tagPremium}
            loading="eager"
            importance="high"
          />}

        </h2>
        {trustproject && (
          <TProLbl
            trustproject={trustproject}
            plantilla="lite"
            sectionStyle={metaValue('section_style')}
          />
        )}
      </div>
      {metaValue('section_style') !== 'story-v2-standard' &&
        metaValue('section_style') !== 'story-v2-video' && (
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
            />
          </div>
        )}
    </div>
  )
}

StorySocialLite.label = 'Artículo - redes sociales'
StorySocialLite.static = true

export default StorySocialLite
