import { useContent } from 'fusion:content'
import { ENVIRONMENT } from 'fusion:environment'
import * as React from 'react'

import StoriesRecent from '../../global-components/stories-recent'
import { getAssetsPath, getAssetsPathVideo } from '../../utilities/assets'
import { FREE } from '../../utilities/constants/content-tiers'
import {
  SITE_DEPOR,
  SITE_ELBOCON,
  SITE_ELCOMERCIO,
  SITE_ELCOMERCIOMAG,
  SITE_GESTION,
} from '../../utilities/constants/sitenames'
import { GALLERY_VERTICAL } from '../../utilities/constants/subtypes'
import { getDateSeo } from '../../utilities/date-time/dates'
import { msToTime, msToTimeJplayer } from '../../utilities/date-time/time'
import { getMultimedia } from '../../utilities/multimedia'
import {
  formatHtmlToText,
  removeLastSlash,
} from '../../utilities/parse/strings'
import { createResizedParams } from '../../utilities/resizer/resizer'
import { getResultJwplayer } from '../../utilities/story/helpers'
import StoryData from '../../utilities/story-data'
import workType, { revisionAttr } from '../_dependencies/work-type'

export default ({
  globalContent: data,
  arcSite,
  contextPath,
  socialName,
  isAmp,
  siteAssets: { seo },
  isIframeStory = false,
  siteName = '',
  siteUrl = '',
}) => {
  const {
    id,
    title,
    metaTitle,
    tags,
    link,
    displayDate,
    publishDate: updateDate,
    subTitle = arcSite,
    locality,
    imagePrimarySeo,
    primarySection,
    primarySectionLink,
    videoSeo,
    contentElementsText: dataElement,
    contentElementsLinks = [],
    contentElementsHtml = [],
    contentElementsCorrectionList = [],
    firstContentElementsRevision = {},
    seoKeywords,
    breadcrumbList,
    multimediaType,
    sourceId,
    isPremium,
    sourceUrlOld,
    getPremiumValue,
    contentElementsRedesSociales,
    contentElementCustomBlock = [],
    idYoutube,
    getGallery,
    subtype,
    jwplayerSeo,
    promoItemJwplayer = {},
    authorsList,
  } = new StoryData({ data, arcSite, contextPath, siteUrl })

  const parameters = {
    primarySectionLink,
    id,
    arcSite,
    cant: 4,
    presets: 'no-presets',
  }
  const { basic: relatedContent = [] } =
    useContent({
      source: 'related-content',
      query: {
        _id: id,
        presets: 'no-presets',
      },
    }) || {}
  const resultStoryRecent = StoriesRecent(parameters)
  let publishDateZone =
    arcSite === SITE_ELCOMERCIOMAG ||
      arcSite === SITE_DEPOR ||
      arcSite === SITE_ELBOCON
      ? getDateSeo(displayDate)
      : displayDate

  publishDateZone =
    arcSite === SITE_ELCOMERCIO ? getDateSeo(displayDate) : publishDateZone

  const logoAuthor = `${contextPath}/resources/dist/${arcSite}/images/author.png`
  const structuredAuthors = authorsList.map(
    (author) => `
  {
    "@context": "http://schema.org/",
    "@type": "Person",
    "name": "${author.nameAuthor || arcSite}",
    "image": "${author.imageAuthor || logoAuthor}",
    "contactPoint"     : {
      "@type"        : "ContactPoint",
      "contactType"  : "Journalist",
      "email"        : "${author.mailAuthor}"
    },
    "email": "${author.mailAuthor}",
    "jobTitle"	: "${author.role}"
  }`
  )
  const structuredAutor =
    structuredAuthors.length > 0
      ? structuredAuthors
      : `
  {
    "@context": "http://schema.org/",
    "@type": "Person",
    "name": "${arcSite}",
    "image": "${logoAuthor}",
    "contactPoint"     : {
      "@type"        : "ContactPoint",
      "contactType"  : "Journalist",
      "email"        : ""
    },
    "email": "",
    "jobTitle"	: ""
  }`

  const finalStructuredDataAuthor =
    structuredAuthors.length > 1
      ? `[${structuredAuthors.join()}]`
      : structuredAutor

  const lastPublishDate =
    arcSite === SITE_ELCOMERCIO ? getDateSeo(updateDate) : updateDate

  const redSocialVideo = contentElementsRedesSociales
    .map((redesSociales) => {
      const { youtube = '', facebook = '', twitter = '', user = '' } =
        redesSociales || {}
      const thumbnailUrlYoutube =
        youtube && `https://img.youtube.com/vi/${youtube}/maxresdefault.jpg`
      const embedUrlYoutube =
        youtube && `https://www.youtube.com/embed/${youtube}`

      const thumbnailUrlTwitter =
        twitter && `https://twitter.com/i/videos/${twitter}`
      const embedUrlTwitter =
        twitter && `https://twitter.com${user}/status/${twitter}`

      const thumbnailUrlFacebook =
        facebook && `https://graph.facebook.com/${facebook}/picture`
      const embedUrlFacebook =
        facebook && `https://www.facebook.com${user}/videos/${facebook}`

      return thumbnailUrlYoutube || thumbnailUrlTwitter || thumbnailUrlFacebook
        ? `{ "@context": "http://schema.org", "@type": "VideoObject", "name": "${formatHtmlToText(
          title || arcSite
        )}",   "description": "${formatHtmlToText(
          subTitle || arcSite
        )}",  "thumbnailUrl": "${thumbnailUrlYoutube || thumbnailUrlTwitter || thumbnailUrlFacebook
        }", "uploadDate": "${publishDateZone}",  "embedUrl": "${embedUrlYoutube || embedUrlTwitter || embedUrlFacebook
        }" }`
        : ''
    })
    .filter((video) => video !== '')

  let resultRelated = ''

  if (relatedContent[0] && relatedContent[0].type !== 'reference') {
    resultRelated = relatedContent
  } else {
    resultRelated = resultStoryRecent.map((story) => {
      const { websites = {} } = story || {}
      const brandWeb = websites[arcSite] || {}
      return { canonical_url: brandWeb.website_url }
    })
  }

  const publishedVideoOrganization = ` 
  "publisher" : {
    "@type": "Organization",
    "name": "${siteName}",
    "logo": {
      "@type": "ImageObject",
      "url": "${`${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/dist/${arcSite}/images/${seo.logoAmp}?d=1`}",
      "width": ${seo.width},
      "height": ${seo.height}
    }
  },`

  const jwplayerSeoItems =
    jwplayerSeo[0] &&
    jwplayerSeo[0].conversions &&
    jwplayerSeo.map(
      ({
        conversions = [],
        title: titleVideo = '',
        thumbnail_url: urlImage,
        date = '',
        duration,
      } = {}) => {
        if (!date || date < 946702800000) {
          // eslint-disable-next-line no-param-reassign
          date = getDateSeo(updateDate)
        } else {
          const dateObj = new Date(date)
          // eslint-disable-next-line no-param-reassign
          date = getDateSeo(dateObj)
        }

        const {
          large = '',
          amp_image_1x1: ampVideo1x1 = urlImage,
          amp_image_4x3: ampVideo4x3 = urlImage,
          amp_image_16x9: ampVideo16x9 = urlImage,
        } =
          createResizedParams({
            url: urlImage,
            presets:
              'amp_image_1x1:1200x1200,amp_image_4x3:1200x900,amp_image_16x9:1200x675,large:980x528',
            arcSite,
          }) || {}

        const image =
          isAmp === true
            ? `"${large || urlImage}"`
            : `["${ampVideo1x1}", "${ampVideo4x3}", "${ampVideo16x9}"]`

        return `{ "@type":"VideoObject",  "name":"${formatHtmlToText(
          titleVideo.trim() || title
        )}", ${isAmp === true ? publishedVideoOrganization : ''
          }  "thumbnailUrl": ${image},  "description":"${formatHtmlToText(
            titleVideo.trim() || subTitle
          )}", "contentUrl": "${getResultJwplayer(
            conversions
          )}",  "uploadDate": "${date}", "duration": "${msToTimeJplayer(
            duration
          )}" }`
      }
    )

  const videoSeoItems = videoSeo.map(
    ({ url, caption, description, urlImage, date, duration } = {}) => {
      const {
        large = '',
        amp_image_1x1: ampVideo1x1 = urlImage,
        amp_image_4x3: ampVideo4x3 = urlImage,
        amp_image_16x9: ampVideo16x9 = urlImage,
      } =
        createResizedParams({
          url: urlImage || url,
          presets:
            'amp_image_1x1:1200x1200,amp_image_4x3:1200x900,amp_image_16x9:1200x675,large:980x528',
          arcSite,
        }) || {}
      const image =
        isAmp === true
          ? `"${large || urlImage}"`
          : `["${ampVideo1x1}", "${ampVideo4x3}", "${ampVideo16x9}"]`

      return `{ "@type":"VideoObject",  "name":"${formatHtmlToText(
        caption.trim() || title
      )}", ${isAmp === true ? publishedVideoOrganization : ''
        }  "thumbnailUrl": ${image},  "description":"${formatHtmlToText(
          description.trim() || caption.trim() || subTitle
        )}", "contentUrl": "${getAssetsPathVideo(
          arcSite,
          url
        )}",  "uploadDate": "${date}", "duration": "${msToTime(
          duration,
          false
        )}" } `
    }
  )

  const imagesSeoItemsAmp = imagePrimarySeo.map(({ url = '' }) => {
    const {
      amp_image_1x1: ampImage1x1 = url,
      amp_image_4x3: ampImage4x3 = url,
      amp_image_16x9: ampImage16x9 = url,
    } =
      createResizedParams({
        url,
        presets:
          'amp_image_1x1:1200x1200,amp_image_4x3:1200x900,amp_image_16x9:1200x675,large:980x528',
        arcSite,
      }) || {}

    return `["${ampImage16x9 || url}","${ampImage1x1 || url}","${ampImage4x3 || url
      }"]`
  })

  const imagesSeoItems = imagePrimarySeo.map((image) => {
    const { subtitle = false, url = '' } = image || {}
    let presets = ''
    let img = ''
    if (SITE_ELCOMERCIOMAG === arcSite)
      presets =
        'amp_image_1x1:1200x1200,amp_image_4x3:1200x900,amp_image_16x9:1200x675'
    else presets = 'large:1200x800'

    const {
      amp_image_1x1: ampImage1x1 = url,
      amp_image_4x3: ampImage4x3 = url,
      amp_image_16x9: ampImage16x9 = url,
      large,
    } =
      createResizedParams({
        url,
        presets,
        arcSite,
      }) || {}

    const description = subtitle
      ? `"description":"${formatHtmlToText(subtitle)}",`
      : ''
    if (SITE_ELCOMERCIOMAG === arcSite)
      img = `["${ampImage16x9 || url}","${ampImage1x1 || url}","${ampImage4x3 || url
        }"]`
    else img = `"${large}"`
    return `{  "@type":"ImageObject", "url": ${img || url
      }, ${description} "height":800, "width":1200 }`
  })

  const listItems = tags.map(({ description }) => `${description}`)

  const listItemsTagsKeywords = tags.map(
    ({ description }) => `"${formatHtmlToText(description)}"`
  )
  const seoKeyWordsStructurada = seoKeywords.map(
    (item) => `"${formatHtmlToText(item)}"`
  )

  const seoKeywordsItems = seoKeywords.map((item) => `${item}`)

  const relatedContentItem = resultRelated.map((content, i) => {
    const { canonical_url: urlItem = '' } = content || {}
    const pathUrl = ENVIRONMENT === 'elcomercio' ? siteUrl : ''
    return `{  "@type":"ListItem",  "position":${i + 1
      }, "url":"${pathUrl}${urlItem}" }`
  })

  const relatedContentData = relatedContentItem[0]
    ? `{  "@context":"https://schema.org", "@type":"ItemList", "itemListElement":[${relatedContentItem}]  }`
    : ''

  /**
   * @returns {"free" | "metered" | "locked"}
   */
  const getContentType = () => {
    const premiumValue =
      getPremiumValue === 'vacio' ? 'metered' : getPremiumValue

    let contenType = isPremium ? 'locked' : premiumValue
    const section = primarySectionLink && primarySectionLink.split('/')[1]
    contenType = section.match(/publirreportaje|publireportaje/)
      ? 'free'
      : contenType

    contenType = arcSite === 'elcomerciomag' ? 'free' : contenType
    return contenType
  }

  const accessibleForFree =
    arcSite === SITE_ELCOMERCIO || arcSite === SITE_GESTION
      ? `"isAccessibleForFree": ${getContentType() === FREE ? 'true' : 'false'
      }, 
        "isPartOf": { "@type": ["CreativeWork", "Product"],  "name" : "${siteName}",   "productID": "${arcSite}:${getContentType()}" },`
      : ''

  const arrayImage = isAmp ? imagesSeoItemsAmp : imagesSeoItems

  const imagenData = arrayImage[1]
    ? `"image":[ ${arrayImage} ],`
    : `"image": ${arrayImage},`

  const imageJWplayer = ({ key = '' }) => {
    const url = `https://cdn.jwplayer.com/v2/media/${key}/poster.jpg`
    const { large = url } =
      createResizedParams({
        url,
        presets: 'large:1200x800',
        arcSite,
      }) || {}
    return key
      ? large
      : `${getAssetsPath(
        arcSite,
        contextPath
      )}/resources/dist/${arcSite}/images/logo-story-default.jpg?d=1`
  }

  const imageYoutube = idYoutube
    ? `https://i.ytimg.com/vi/${idYoutube}/hqdefault.jpg`
    : imageJWplayer(promoItemJwplayer)

  const imagenDefoult = imagesSeoItems[0]
    ? imagenData
    : `"image": {  "@type": "ImageObject", "url": "${imageYoutube}",  "description": "${formatHtmlToText(
      siteName
    )}", "height": 800, "width": 1200 },`

  const dataVideoJplayer =
    jwplayerSeo[0] && jwplayerSeo[0].conversions
      ? videoSeoItems.concat(jwplayerSeoItems)
      : videoSeoItems

  const dataVideo =
    `  "video":[ ${redSocialVideo.concat(dataVideoJplayer)} ],` || ''

  let citationStructuredItems = ''
  if (arcSite === SITE_ELCOMERCIO) {
    contentElementsLinks.forEach((url) => {
      citationStructuredItems += `{
        "@type": "CreativeWork",
        "url": "${url}"
      },`
    })
  }

  const citationStructured =
    arcSite === SITE_ELCOMERCIO && contentElementsLinks.length > 0
      ? `"citation":[${citationStructuredItems.substring(
        0,
        citationStructuredItems.length - 1
      )}],`
      : ''

  const bodyStructured =
    isAmp !== true
      ? `"articleBody":"${formatHtmlToText(
        dataElement.replace(/\(function\(d, s, id\).*\)\);/g, '')
      )}",`
      : ''

  const backStoryStructured = `
  "backstory":"${contentElementCustomBlock
      .map((element) =>
        element.embed.config.customBlockType === 'backstory'
          ? element.embed.config.customBlockContent
          : ''
      )
      .join(' ')
      .trim()
      .replace(/"/g, '\\"')
      .replace(/\r?\n|\r/g, '')}", `

  let correctionStructuredItems = ''
  contentElementsCorrectionList.forEach((ele) => {
    const {
      embed: {
        config: { content: contentCorrection = '', date: dateCorrection = '' },
      } = {},
    } = ele || {}
    correctionStructuredItems += `{
      "@type": "CorrectionComment",
      "text": "${formatHtmlToText(contentCorrection.trim())}",
      "datePublished": "${dateCorrection}"
    },`
  })

  const correctionStructured =
    contentElementsCorrectionList.length > 0
      ? `"correction":[${correctionStructuredItems.substring(
        0,
        correctionStructuredItems.length - 1
      )}],`
      : ''

  const { label: { trustproject = {} } = {} } = data || {}
  const trustType =
    workType(trustproject, dataElement, getGallery) || '"NewsArticle"'
  const {
    embed: { config: configRevision = {} } = {},
  } = firstContentElementsRevision
  const revisionWorkType = revisionAttr(trustproject, configRevision) || ''

  let publishingPrinciples = ''
  if (arcSite === SITE_ELCOMERCIO) {
    publishingPrinciples = `"publishingPrinciples": "${siteUrl}/buenas-practicas/",`
  }

  const dateline =
    subtype !== GALLERY_VERTICAL && primarySection !== 'Trivias'
      ? `"dateline": "${`${getDateSeo(displayDate)} ${locality}`}",`
      : ''
  const typeStory = primarySection !== 'Trivias' ? trustType : '"Quiz"'

  const structuredData = `{  "@context":"http://schema.org", "@type":${typeStory}, ${revisionWorkType} "datePublished":"${publishDateZone}",
    "dateModified":"${arcSite === SITE_DEPOR || arcSite === SITE_ELBOCON
      ? publishDateZone
      : lastPublishDate
    }",
    ${backStoryStructured}
    ${locality && `"locationCreated": {"@type":"Place", "name":"${locality}"},`}
    ${dateline}
    "headline":"${formatHtmlToText(title)}",
    "alternativeHeadline":"${formatHtmlToText(metaTitle)}",
    "description":"${formatHtmlToText(data?.description?.basic) || formatHtmlToText(subTitle)
    }",
    ${publishingPrinciples}
  ${bodyStructured}
  ${correctionStructured}
  ${citationStructured}
    "mainEntityOfPage":{   "@type":"WebPage",  "@id":"${siteUrl}${link}"     },     ${imagenDefoult}    ${videoSeoItems[0] || redSocialVideo[0] || jwplayerSeo[0] ? dataVideo : ''
    }
    "author": ${finalStructuredDataAuthor},
    "publisher":{  "@type":"Organization", "name":"${siteName}",  "logo":{  "@type":"ImageObject", "url":"${`${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/${seo.logoAmp}?d=1`}",   "height":${seo.height
    }, "width":${seo.width}
      }
    },    
    ${accessibleForFree} 
    "keywords":[${seoKeyWordsStructurada[0]
      ? seoKeyWordsStructurada.map((item) => item)
      : listItemsTagsKeywords.map((item) => item)
    }]
 }`

  const breadcrumbResult = breadcrumbList.map(
    ({ url, name }, i) =>
      url &&
      `{"@type":"ListItem", "position":${i + 1
      }, "name":"${name}", "item":"${url}" }`
  )

  const structuredBreadcrumb = `{ "@context":"https://schema.org", "@type":"BreadcrumbList", "itemListElement":[${breadcrumbResult}] }`

  const taboolaScript =
    arcSite === SITE_ELCOMERCIOMAG ? SITE_ELCOMERCIO : arcSite

  const scriptTaboola = `"use strict";window._taboola=window._taboola||[],_taboola.push({article:"auto"}),function(){if("undefined"!=typeof window){if(window.location.search.includes("widgettaboola=none"))return;document.addEventListener("DOMContentLoaded",function(){function e(){var e="tb_loader_script";if(!document.getElementById(e)){var o=document.createElement("script"),n=document.getElementsByTagName("script")[0];o.defer=1,o.src="//cdn.taboola.com/libtrc/grupoelcomercio-${taboolaScript}/loader.js",o.id=e,n.parentNode.insertBefore(o,n)}}if("IntersectionObserver"in window){var o=1200;/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent)&&(o=300);var n=new IntersectionObserver(function(o,t){o.forEach(function(o){o.isIntersecting&&(e(),n.unobserve(o.target))})},{rootMargin:"0px 0px "+o+"px 0px"}),t=document.getElementById("taboola-below-content-thumbnails");t&&n.observe(t)}else e()}),window.performance&&"function"==typeof window.performance.mark&&window.performance.mark("tbl_ic")}}();`

  /*  ******************************* Version con event scroll que iba a reemplazar a la lazyload
    window._taboola = window._taboola || [];
    _taboola.push({
      article: 'auto'
    });
    !function(){
      if (typeof window !== 'undefined') {
        if(window.location.search.includes('widgettaboola=none')) {
          return;
        }
        function injectTaboola() {
          document.removeEventListener('scroll', injectTaboola)
          requestIdle(() => {
            const id = 'tb_loader_script'
            if (!document.getElementById(id)) {
              const n = document.createElement('script')
              const f = document.getElementsByTagName('script')[0]
              n.defer = 1;
              n.src = '//cdn.taboola.com/libtrc/grupoelcomercio-${taboolaScript}/loader.js';
              n.id = id;
              f.parentNode.insertBefore(n, f);
            }
          })
        }
        window.onload = document.addEventListener('scroll', injectTaboola) 
        if (window.performance && typeof window.performance.mark == 'function') {
          window.performance.mark('tbl_ic');
        }
      }
    }() */

  /**
   ****************************** scriptTaboola NO MINIFICADO
   *   window._taboola = window._taboola || [];
      _taboola.push({
          article: 'auto'
      });
      !function(){
        if (typeof window !== 'undefined') {
          if(window.location.search.includes('widgettaboola=none')) {
            return;
          }
          document.addEventListener('DOMContentLoaded', () => {
            function execTaboola() {
              const id = 'tb_loader_script'
              if (!document.getElementById(id)) {
                const n = document.createElement('script')
                const f = document.getElementsByTagName('script')[0]
                n.defer = 1;
                n.src = '//cdn.taboola.com/libtrc/grupoelcomercio-${taboolaScript}/loader.js';
                n.id = id;
                f.parentNode.insertBefore(n, f);
              }
            }
      
            if ('IntersectionObserver' in window) {
              let marginTaboola = 1200;
              const isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent)
              if (isMobile) {
                marginTaboola = 300;
              }
              const taboolaObserver = new IntersectionObserver(
                (entries, observer) => {
                  entries.forEach(entry => {
                    if (entry.isIntersecting) {
                      execTaboola()
                      taboolaObserver.unobserve(entry.target)
                    }
                  })
                },{rootMargin: "0px 0px "+marginTaboola+"px 0px"}
              )

              const taboolaDiv = document.getElementById('taboola-below-content-thumbnails')
              if(taboolaDiv) taboolaObserver.observe(taboolaDiv)
            } else {
              execTaboola()
            }
          })
          if (window.performance && typeof window.performance.mark == 'function') {
            window.performance.mark('tbl_ic');
          }
        }
      }()
   */

  const dataStructuraHtmlAmp =
    contentElementsHtml.match(/:<script(.*?)>(.*?)<\/script>:/gm) || []
  return (
    <>
      <meta name="data-article-id" content={id} />
      <meta property="article:publisher" content={socialName?.url} />
      <meta name="author" content={`Redacción ${siteName}`} />
      <meta name="bi3dPubDate" content={publishDateZone} />
      {sourceId && sourceId.includes('_story') && (
        <meta
          name="cms_old_id"
          content={sourceId.match(/_story([0-9]+)/, '$1')[1]}
        />
      )}
      {sourceUrlOld && <meta name="cms_old_url" content={sourceUrlOld} />}
      <meta name="bi3dArtId" content="639992" />
      <meta name="bi3dSection" content={primarySection} />
      <meta name="bi3dArtTitle" content={title} />
      <meta name="cXenseParse:per-categories" content={primarySection} />
      <meta name="etiquetas" content={listItems.map((item) => item)} />
      <meta
        name="content-type"
        content={
          subtype === GALLERY_VERTICAL
            ? 'gallery_vertical'
            : getMultimedia(multimediaType)
        }
      />
      <meta name="section-id" content={removeLastSlash(primarySectionLink)} />
      <meta
        name="keywords"
        content={
          seoKeywordsItems[0]
            ? seoKeywordsItems.map((item) => item)
            : (listItems[0] && listItems.map((item) => item)) || arcSite
        }
      />
      {isPremium && <meta name="cXenseParse:per-tiponota" content="premium" />}
      <meta property="article:published_time" content={publishDateZone} />
      <meta
        property="article:modified_time"
        content={`${arcSite === SITE_ELCOMERCIOMAG ? publishDateZone : lastPublishDate
          }`}
      />
      <meta property="article:author" content={`Redacción ${siteName}`} />
      <meta property="article:section" content={primarySection} />
      <meta property="article:content_tier" content={getContentType()} />
      {listItems.map((item) => (
        <meta property="article:tag" content={item} />
      ))}
      {!isIframeStory && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: structuredData }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: relatedContentData }}
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: structuredBreadcrumb }}
          />
        </>
      )}
      {isAmp !== true && (
        <script dangerouslySetInnerHTML={{ __html: scriptTaboola }} />
      )}
      {isAmp === true &&
        dataStructuraHtmlAmp.map((datas) => (
          <>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: datas
                  .replace(':<script type="application/ld+json">', '')
                  .replace('</script>:', ''),
              }}
            />
          </>
        ))}
      {isAmp !== true &&
        contentElementsHtml.match(/<mxm-event (.*)><\/mxm-event>/gm) && (
          <style
            dangerouslySetInnerHTML={{
              __html: `.live-event {font-size: 16px;} .live-event .live-event-comment {display: block;position: relative;padding: 0 0 10px 65px;border-bottom: 1px solid #dcdcdc;margin-bottom: 10px;} .live-event .live-event-comment .live-event-minute{background: #e2e2e2;padding: 3px 8px;display: block;color: #000;top: 0px;position: absolute;left: 0;} .live-event .live-event-comment p{font-size: 18px;font-family: Georgia;line-height: 1.5;} .live-event .live-event-comment p a{color: #4a88c6;font-weight: bold;} .live-match {font-size: 16px;} .live-match .live-match-comment {display: block;position: relative;padding: 0 0 10px 40px;border-bottom: 1px solid #dcdcdc;margin-bottom: 10px;} .live-match .live-match-comment .live-match-minute{background: #e2e2e2;padding: 3px 8px;display: block;color: #000;top: 0px;position: absolute;left: 0;} .live-match .live-match-comment p{font-size: 18px;font-family: Georgia;line-height: 1.5;} .live-match .live-match-comment p a{color: #4a88c6;font-weight: bold;}`,
            }}
          />
        )}
    </>
  )
}
