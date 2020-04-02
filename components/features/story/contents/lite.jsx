// file path: StoryContentContent.js
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import ArcStoryContent, {
  Oembed,
  Text,
} from '@arc-core-components/feature_article-body'

import { replaceTags, storyTagsBbc } from '../../../utilities/tags'
import { getDateSeo } from '../../../utilities/date-time/dates'
import { getAssetsPath } from '../../../utilities/constants'
import {
  SITE_ELCOMERCIO,
  SITE_PERU21,
} from '../../../utilities/constants/sitenames'
/* import {
  SPECIAL,
  SPECIAL_BASIC,
  BIG_IMAGE,
} from '../../../utilities/constants/subtypes' */
import { OPTA_CSS_LINK, OPTA_JS_LINK } from '../../../utilities/constants/opta'
import {
  ELEMENT_HEADER,
  ELEMENT_IMAGE,
  ELEMENT_QUOTE,
  ELEMENT_RAW_HTML,
  ELEMENT_TABLE,
  ELEMENT_TEXT,
  ELEMENT_VIDEO,
  ELEMENT_GALLERY,
  ELEMENT_OEMBED,
  ELEMENT_STORY,
} from '../../../utilities/constants/element-types'
import StoryData from '../../../utilities/story-data'

import StoryContentsChildVideo from '../multimedia/_children/video'
import StoryContentsChildImage from '../multimedia/_children/image'
import StoryHeaderChildGallery from '../gallery/_children/gallery'
import StoryContentChildRawHTML from './_children/rawHtml'
import StoryContentsChildBlockQuote from './_children/blockquote'
import StoryContentsChildTable from '../../../global-components/story-table'
import StoryContentsChildAuthorLite from './_children/author-lite'
import StoryContentsChildRelatedInternal from './_children/related-internal'
import StoryContentsChildVideoNativo from '../multimedia/_children/video-nativo'
import Ads from '../../../global-components/ads'

const classes = {
  news: 'story-contents w-full ',
  content: 'story-contents__content ',
  textClasses: 'story-contents__font-paragraph ',
  newsImage: 'story-contents__image  ',
  newsEmbed: 'story-contents__embed',
  tags: 'story-contents',
  section: 'w-full',
  listClasses: 'story-contents__paragraph-list',
  alignmentClasses: 'story-contents__alignment',
  bbcHead: 'bbc-head p-10',
}

@Consumer
class StoryContentsLite extends PureComponent {
  render() {
    const {
      globalContent,
      arcSite,
      contextPath,
      deployment,
      siteProperties: {
        ids: { opta },
      },
      siteProperties: { isDfp = false },
    } = this.props
    const { related_content: { basic: relatedContent } = {} } =
      globalContent || {}

    const {
      publishDate: date,
      promoItems,
      displayDate: updatedDate,
      createdDate,
      authorImage,
      authorLink,
      author,
      primarySection,
      authorEmail,
      primarySectionLink,
      subtype,
      isPremium,
      multimediaLandscapeMD,
      multimediaStorySmall,
      multimediaLarge,
      multimediaLazyDefault,
      tags,
      contentPosicionPublicidadLite,
    } = new StoryData({
      data: globalContent,
      contextPath,
      deployment,
      arcSite,
    })

    const params = {
      authorImage,
      author,
      authorLink,
      updatedDate: getDateSeo(updatedDate || createdDate),
      date,
      primarySectionLink,
      authorEmail,
      primarySection,
      subtype,
      ...promoItems,
      multimediaLandscapeMD,
      multimediaStorySmall,
      multimediaLarge,
      multimediaLazyDefault,
      primaryImage: true,
    }
    const URL_BBC = 'http://www.bbc.co.uk/mundo/?ref=ec_top'
    const imgBbc =
      `${getAssetsPath(
        arcSite,
        contextPath
      )}/resources/dist/${arcSite}/images/bbc_head.png?d=1` || ''

    return (
      <>
        <div className={classes.news}>
          <StoryContentsChildAuthorLite {...params} />

          <Ads
            adElement={`${isDfp === true ? 'caja3' : 'movil2'}`}
            isDesktop={false}
            isMobile
            isDfp={isDfp}
          />
          <div
            className={`${classes.content} ${isPremium && 'paywall'} `}
            id="contenedor">
            {!isDfp && (
              <>
                <div id="ads_d_inline" />
                <div id="ads_m_movil_video" />
                <div id="ads_m_movil3" />
              </>
            )}
            {contentPosicionPublicidadLite && (
              <ArcStoryContent
                data={contentPosicionPublicidadLite}
                elementClasses={classes}
                renderElement={element => {
                  const {
                    _id,
                    type,
                    subtype: sub,
                    raw_oembed: rawOembed,
                    content,
                    level,
                    alignment = '',
                    headlines: { basic: captionVideo = '' } = {},
                    publicidad = false,
                    // nameAds,
                  } = element
                  if (type === ELEMENT_IMAGE) {
                    const presets = 'landscapeMd:314,storySmall:482,large:980'

                    return (
                      <StoryContentsChildImage
                        {...element}
                        multimediaLazyDefault={multimediaLazyDefault}
                        presets={presets}
                      />
                    )
                  }
                  if (type === ELEMENT_VIDEO) {
                    return (
                      <>
                        {element && element.embed_html ? (
                          <StoryContentsChildVideo
                            data={element.embed_html}
                            {...element}
                            className={classes.newsImage}
                            description={captionVideo}
                            contentElemtent="true"
                          />
                        ) : (
                          <StoryContentsChildVideoNativo
                            streams={element && element.streams}
                          />
                        )}
                      </>
                    )
                  }
                  if (type === ELEMENT_GALLERY) {
                    return (
                      <StoryHeaderChildGallery
                        contentElementGallery={element}
                        type={type}
                      />
                    )
                  }
                  if (type === ELEMENT_TABLE) {
                    return (
                      <StoryContentsChildTable data={element} type={type} />
                    )
                  }
                  if (type === ELEMENT_QUOTE) {
                    return <StoryContentsChildBlockQuote data={element} />
                  }
                  if (type === ELEMENT_OEMBED) {
                    return (
                      <Oembed
                        rawOembed={rawOembed}
                        subtype={sub}
                        className={classes.newsEmbed}
                      />
                    )
                  }
                  if (type === ELEMENT_STORY) {
                    return (
                      <StoryContentsChildRelatedInternal
                        stories={relatedContent}
                        id={_id}
                        imageDefault={multimediaLazyDefault}
                      />
                    )
                  }

                  if (type === ELEMENT_HEADER && level === 1) {
                    return (
                      <h2
                        dangerouslySetInnerHTML={{
                          __html: content,
                        }}
                      />
                    )
                  }

                  if (type === ELEMENT_TEXT) {
                    const alignmentClass = alignment
                      ? `${classes.textClasses} ${classes.alignmentClasses}-${alignment}`
                      : classes.textClasses
                    return (
                      <>
                        {publicidad && (
                          <div
                            id="div-gpt-ad-1585689586219-0"
                            data-ads-name="/28253241/elcomercio/web/sect/respuestas/caja4"
                            data-ads-dimensions-m="[[300, 100], [320, 50], [300, 50], [320, 100], [300, 250]]"></div>
                        )}
                        <Text
                          content={replaceTags(content)}
                          className={alignmentClass}
                        />
                      </>
                    )
                  }

                  if (type === ELEMENT_RAW_HTML) {
                    if (
                      content.includes('opta-widget') &&
                      // eslint-disable-next-line camelcase
                      typeof opta_settings === 'undefined'
                    ) {
                      return (
                        <>
                          {/* <script
                            dangerouslySetInnerHTML={{
                              __html: `
                                var opta_settings={
                                  subscription_id: '${opta}',
                                  language: 'es_CO',
                                  timezone: 'America/Lima'
                                };`,
                            }}></script> */}
                          <StoryContentChildRawHTML content={content} />
                          <script
                            dangerouslySetInnerHTML={{
                              __html: `(function(){window.addEventListener('load', function(){
                                setTimeout(function(){
                                  if(!window.optaReady){
                                    var os=document.createElement('script')
                                    os.textContent=\`
                                      var opta_settings={
                                        subscription_id: '${opta}',
                                        language: 'es_CO',
                                        timezone: 'America/Lima'
                                      };\`
                                    document.head.append(os)
                                    var s=document.createElement('script')
                                    s.src='${OPTA_JS_LINK}'
                                    s.defer=true
                                    s.type='text/javascript'
                                    document.head.append(s)
                                    var n=document.createElement('link')
                                    n.rel='stylesheet'
                                    n.href='${OPTA_CSS_LINK}'
                                    document.head.append(n)
                                    window.optaReady=true
                                  }
                                }, 0)
                              })
                              })()`,
                            }}
                          />
                        </>
                      )
                    }
                    if (content.includes('id="powa-')) {
                      let contentVideo = content
                      if (arcSite === SITE_PERU21) {
                        contentVideo = content.replace(
                          /peru21.pe\/upload/gi,
                          'img.peru21.pe/upload'
                        )
                      }
                      return (
                        <>
                          <StoryContentsChildVideo
                            data={contentVideo}
                            htmlContent="html"
                            className={classes.newsImage}
                            {...element}
                          />
                        </>
                      )
                    }
                    return <StoryContentChildRawHTML content={content} />
                  }
                  return ''
                }}
              />
            )}
          </div>
          {storyTagsBbc(tags) && (
            <div className={classes.bbcHead}>
              <a
                href={URL_BBC}
                rel="nofollow noopener noreferrer"
                target="_blank">
                <img alt="BBC" src={imgBbc} data-src={imgBbc} />
              </a>
            </div>
          )}
        </div>
        {arcSite === SITE_ELCOMERCIO && (
          <script
            src="https://w.ecodigital.pe/components/elcomercio/mxm/mxm.bundle.js?v=1.7"
            defer></script>
        )}
      </>
    )
  }
}

StoryContentsLite.label = 'Artículo - contenidos'
StoryContentsLite.static = true

export default StoryContentsLite
