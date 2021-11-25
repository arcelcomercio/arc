import { useFusionContext } from 'fusion:context'
import React from 'react'

import { getAssetsPath } from '../../../utilities/assets'
import {
  SITE_DEPOR,
  SITE_ELCOMERCIO,
  SITE_ELCOMERCIOMAG,
} from '../../../utilities/constants/sitenames'
import StoryData from '../../../utilities/story-data'
import { storyTagsBbc } from '../../../utilities/tags'
import StorySocialChildAmpSocial from '../social/_children/amp-social'
import AmpStoriesChild from './_children/amp-stories'
import customFields from './_dependencies/custom-fields'

const classes = {
  stories: 'amp-sh bg-white pr-20 pl-20 m-5 mx-auto',
  titleAmp:
    'amp-sh__title font-bold secondary-font title-md text-gray-300 line-h-xs mt-20',
  datetime: 'amp-sh__datetime mt-15 mb-15 block secondary-font text-lg',
  description:
    'amp-sh__description mt-0 text-md text-gray-300 secondary-font pt-10 pb-10',
  gallery: 'amp-sh bg-white w-full pr-20 pl-20 m-5 mx-auto',
  adsAmp: 'text-center ad-amp-movil',
  bbcHead: 'bbc-head',
  listClasses: 'amp-story-content mt-20',
}
const StoryTitleAmp = () => {
  const {
    arcSite,
    contextPath,
    globalContent: data,
    requestUri = '',
    customFields: { ampAdjson = '', ampAdName = '', ampAdDimensions = '' } = {},
  } = useFusionContext()

  const {
    title,
    subTitle,
    tags,
    primarySectionLink,
    promoItems: { basic_gallery: { content_elements: galleryItems } = {} } = {},
    contentElementsListOne: { items = [], type = '' } = {},
  } = new StoryData({
    data,
    arcSite,
    contextPath,
  })

  const URL_BBC = 'http://www.bbc.co.uk/mundo/?ref=ec_top'
  const imgBbc =
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/bbc_head.png?d=1` || ''

  const medida = (ampAdDimensions && ampAdDimensions.split('x')) || []
  const widthx = medida[0]
  const heightx = medida[1]
  const getDiv = () =>
    `<amp-ad data-loading-strategy="prefer-viewability-over-views" type="doubleclick"  data-slot=${ampAdName} width="${widthx}"  height="${heightx}" json="${ampAdjson}" />`

  return (
    <>
      <div className={galleryItems ? classes.gallery : classes.stories}>
        <header>
          {storyTagsBbc(tags) && (
            <div className={classes.bbcHead}>
              <a
                href={URL_BBC}
                rel="nofollow noopener noreferrer"
                target="_blank">
                <amp-img
                  alt="BBC"
                  layout="responsive"
                  width="500"
                  height="30"
                  src={imgBbc}
                  data-src={imgBbc}
                />
              </a>
            </div>
          )}

          {/^\/saltar-intro/.test(primarySectionLink) ? (
            <div style={{ maxWidth: '240px', margin: '30px auto;' }}>
              <a href="/saltar-intro/">
                <amp-img
                  width="240px"
                  height="31px"
                  src="https://elcomercio.pe/resizer/naRu0PT5lScjAnLV3MMk2JxYS8I=/240x0/smart/filters:format(png):quality(100)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/B576KDATVBA4XFMUPCFSMTEC4A.png"
                  alt="Saltar Intro"
                  layout="responsive"
                />
              </a>
            </div>
          ) : null}

          {arcSite === SITE_ELCOMERCIO ||
          (arcSite === SITE_DEPOR &&
            (/^\/mexico\//.test(requestUri) ||
              /^\/colombia\//.test(requestUri))) ? null : (
            <AmpStoriesChild arcSite={arcSite} />
          )}

          {title && <h1 className={classes.titleAmp}>{title}</h1>}

          {/* Condicion para mag igual que web */}
          {items && arcSite === SITE_ELCOMERCIOMAG && type === 'list' ? (
            <div className={classes.listClasses}>
              <ul>
                {items.map(({ content }) => (
                  <>
                    <li dangerouslySetInnerHTML={{ __html: content }} />
                  </>
                ))}
              </ul>
            </div>
          ) : null}
        </header>
        {ampAdName && (
          <div
            className="text-center ad-amp-movil"
            dangerouslySetInnerHTML={{ __html: getDiv() }}
          />
        )}

        {subTitle && <div className={classes.description}> {subTitle}</div>}
        {arcSite !== SITE_ELCOMERCIOMAG && <StorySocialChildAmpSocial />}
      </div>
    </>
  )
}

StoryTitleAmp.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  customFields,
}

StoryTitleAmp.static = true

export default StoryTitleAmp
