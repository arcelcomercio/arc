import React from 'react'
import ENV from 'fusion:environment'
import StoriesRecent from '../../global-components/stories-recent'

import StoryData from '../../utilities/story-data'
import {
  formatHtmlToText,
  getMultimedia,
  removeLastSlash,
  getDateSeo,
  msToTime,
} from '../../utilities/helpers'
import ConfigParams from '../../utilities/config-params'
import { getAssetsPath } from '../../utilities/constants'
import { getResizedUrl } from '../../utilities/resizer'
import { getAssetsPathVideo } from '../../utilities/assets'

export default ({
  globalContent: data,
  arcSite,
  contextPath,
  socialName,
  deployment,
  isAmp,
  siteAssets: { seo },
  siteName = '',
  siteUrl = '',
}) => {
  const {
    id,
    title,
    metaTitle,
    tags,
    link,
    displayDate: publishDate,
    publishDate: publishDatedate,
    subTitle,
    seoAuthor,
    imagePrimarySeo,
    primarySection,
    primarySectionLink,
    videoSeo,
    contentElementsText: dataElement,
    contentElementsHtml = [],
    relatedContent,
    seoKeywords,
    breadcrumbList,
    multimediaType,
    sourceId,
    isPremium,
    sourceUrlOld,
    getPremiumValue,
    contentElementsRedesSociales,
  } = new StoryData({ data, arcSite, contextPath, siteUrl })
  const parameters = {
    primarySectionLink,
    id,
    arcSite,
    cant: 4,
    presets: 'no-presets',
  }
  const resultStoryRecent = StoriesRecent(parameters)
  let publishDateZone =
    arcSite === ConfigParams.SITE_ELCOMERCIOMAG ||
    arcSite === ConfigParams.SITE_DEPOR ||
    arcSite === ConfigParams.SITE_ELBOCON
      ? getDateSeo(publishDate)
      : publishDate

  publishDateZone =
    arcSite === ConfigParams.SITE_ELCOMERCIO
      ? getDateSeo(publishDate)
      : publishDateZone

  const lastPublishDate =
    arcSite === ConfigParams.SITE_ELCOMERCIO
      ? getDateSeo(publishDatedate)
      : publishDatedate

  const redSocialVideo = contentElementsRedesSociales
    .map(({ youtube = '', facebook = '', twitter = '', user = '' }) => {
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
            title
          )}",   "description": "${formatHtmlToText(
            subTitle
          )}",  "thumbnailUrl": "${thumbnailUrlYoutube ||
            thumbnailUrlTwitter ||
            thumbnailUrlFacebook}", "uploadDate": "${publishDateZone}",  "embedUrl": "${embedUrlYoutube ||
            embedUrlTwitter ||
            embedUrlFacebook}" }`
        : ''
    })
    .filter(video => video !== '')

  let resultRelated = ''

  if (relatedContent[0] && relatedContent[0].type !== 'reference') {
    resultRelated = relatedContent
  } else {
    resultRelated = resultStoryRecent.map(story => {
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
      "url": "${deployment(
        `${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/${arcSite}/images/${seo.logoAmp}`
      )}",
      "width": ${seo.width},
      "height": ${seo.height}
    }
  },`
  const videoSeoItems = videoSeo.map(
    ({ url, caption, description, urlImage, date, duration } = {}) => {
      const {
        large = '',
        amp_image_1x1: ampVideo1x1 = urlImage,
        amp_image_4x3: ampVideo4x3 = urlImage,
        amp_image_16x9: ampVideo16x9 = urlImage,
      } =
        getResizedUrl({
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
        caption
      )}", ${
        isAmp === true ? publishedVideoOrganization : ''
      }  "thumbnailUrl": ${image},  "description":"${formatHtmlToText(
        description || caption
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
      getResizedUrl({
        url,
        presets:
          'amp_image_1x1:1200x1200,amp_image_4x3:1200x900,amp_image_16x9:1200x675,large:980x528',
        arcSite,
      }) || {}

    return `["${ampImage16x9 || url}","${ampImage1x1 || url}","${ampImage4x3 ||
      url}"]`
  })

  const imagesSeoItems = imagePrimarySeo.map(image => {
    const { subtitle = false, url = '' } = image || {}

    const { large } =
      getResizedUrl({
        url,
        presets: 'large:1200x800',
        arcSite,
      }) || {}

    const description = subtitle
      ? `"description":"${formatHtmlToText(subtitle)}",`
      : ''
    return `{  "@type":"ImageObject", "url": "${large ||
      url}", ${description} "height":800, "width":1200 }`
  })

  const listItems = tags.map(({ description }) => {
    return `${description}`
  })

  const listItemsTagsKeywords = tags.map(({ description }) => {
    return `"${formatHtmlToText(description)}"`
  })
  const seoKeyWordsStructurada = seoKeywords.map(item => {
    return `"${formatHtmlToText(item)}"`
  })

  const seoKeywordsItems = seoKeywords.map(item => {
    return `${item}`
  })

  const relatedContentItem = resultRelated.map((content, i) => {
    const { canonical_url: urlItem = '' } = content || {}
    const pathUrl = ENV.ENVIRONMENT === 'elcomercio' ? siteUrl : ''
    return `{  "@type":"ListItem",  "position":${i +
      1}, "url":"${pathUrl}${urlItem}" }`
  })

  const relatedContentData = relatedContentItem[0]
    ? `{  "@context":"https://schema.org", "@type":"ItemList", "itemListElement":[${relatedContentItem}]  }`
    : ''

  const storyPremium = !isAmp
    ? ` "isAccessibleForFree": "False", "hasPart": { "@type": "WebPageElement",  "isAccessibleForFree": "False",   "cssSelector" : ".paywall" },`
    : ''

  const arrayImage = isAmp ? imagesSeoItemsAmp : imagesSeoItems

  const imagenData = arrayImage[1]
    ? `"image": ${arrayImage[0]} ,`
    : `"image": ${arrayImage},`

  const imagenDefoult = imagesSeoItems[0]
    ? imagenData
    : `"image": {  "@type": "ImageObject", "url": "${deployment(
        `${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/${arcSite}/images/logo-story-default.jpg`
      )}",  "description": "${formatHtmlToText(
        siteName
      )}", "height": 800, "width": 1200 },`

  const dataVideo =
    `  "video":[ ${redSocialVideo.concat(videoSeoItems)} ],` || ''

  const bodyStructured =
    isAmp !== true
      ? `"articleBody":"${dataElement.replace(
          /\(function\(d, s, id\).*\)\);/g,
          ''
        )}",`
      : ''
  const structuredData = `{  "@context":"http://schema.org", "@type":"NewsArticle", "datePublished":"${publishDateZone}",
    "dateModified":"${
      arcSite === ConfigParams.SITE_ELCOMERCIOMAG ||
      arcSite === ConfigParams.SITE_DEPOR ||
      arcSite === ConfigParams.SITE_ELBOCON
        ? publishDateZone
        : lastPublishDate
    }",

    "headline":"${formatHtmlToText(title)}",
    "alternativeHeadline":"${formatHtmlToText(metaTitle)}",
    "description":"${formatHtmlToText(subTitle)}",
  ${bodyStructured}
    "mainEntityOfPage":{   "@type":"WebPage",  "@id":"${siteUrl}${link}"     },     ${imagenDefoult}    ${
    videoSeoItems[0] || redSocialVideo[0] ? dataVideo : ''
  }
    "author":{    "@type":"Person",   "name":"${formatHtmlToText(
      seoAuthor
    )}"    },
    "publisher":{  "@type":"Organization", "name":"${siteName}",  "logo":{  "@type":"ImageObject", "url":"${deployment(
    `${getAssetsPath(arcSite, contextPath)}/resources/dist/${arcSite}/images/${
      seo.logoAmp
    }`
  )}",   "height":${seo.height}, "width":${seo.width}
       }
    },    
    ${(isPremium && storyPremium) || ''} 
    "keywords":[${
      seoKeyWordsStructurada[0]
        ? seoKeyWordsStructurada.map(item => item)
        : listItemsTagsKeywords.map(item => item)
    }]
 }`

  const breadcrumbResult = breadcrumbList.map(({ url, name }, i) => {
    return (
      url &&
      `{"@type":"ListItem", "position":${i +
        1}, "name":"${name}", "item":"${url}" }`
    )
  })

  const structuredBreadcrumb = `{ "@context":"https://schema.org", "@type":"BreadcrumbList", "itemListElement":[${breadcrumbResult}] }`

  const taboolaScript =
    arcSite === ConfigParams.SITE_ELCOMERCIOMAG ? 'elcomercio' : arcSite

  const scriptTaboola = `
  window._taboola=window._taboola||[],_taboola.push({article:"auto"}),function(){if("undefined"!=typeof window){window.onload=document.addEventListener("scroll",function o(){document.removeEventListener("scroll",o);const e="tb_loader_script";if(!document.getElementById(e)){const o=document.createElement("script"),n=document.getElementsByTagName("script")[0];o.async=1,o.src="//cdn.taboola.com/libtrc/grupoelcomercio-${
    arcSite === ConfigParams.SITE_PUBLIMETRO ? 'publimetrope' : taboolaScript
  }/loader.js",o.id=e,n.parentNode.insertBefore(o,n)}})}window.performance&&"function"==typeof window.performance.mark&&window.performance.mark("tbl_ic")}();`

  /*  ******************************* Version con event scroll que iba a reemplazar a la lazyload
        window._taboola = window._taboola || [];
    _taboola.push({
        article: 'auto'
    });
    ! function(){
      if (typeof window !== 'undefined') {
        function injectTaboola() {
          document.removeEventListener('scroll', injectTaboola)
          const id = 'tb_loader_script'
          if (!document.getElementById(id)) {
            const n = document.createElement('script')
            const f = document.getElementsByTagName('script')[0]
            n.async = 1;
            n.src = '//cdn.taboola.com/libtrc/grupoelcomercio-${arcSite === ConfigParams.SITE_PUBLIMETRO ? 'publimetrope' : taboolaScript}/loader.js';
            n.id = id;
            f.parentNode.insertBefore(n, f);
          }
        }
        window.onload = document.addEventListener('scroll', injectTaboola) 
      }
      if (window.performance && typeof window.performance.mark == 'function') {
        window.performance.mark('tbl_ic');
      }
    }() */

  /**
   ****************************** scriptTaboola NO MINIFICADO
   *   window._taboola = window._taboola || [];
      _taboola.push({
          article: 'auto'
      });

      ! function(){
        if (typeof window !== 'undefined') {
          document.addEventListener('DOMContentLoaded', () => {
            const taboolaDiv = document.getElementById('taboola-below-content-thumbnails')

            function execTaboola() {
              const id = 'tb_loader_script'
              if (!document.getElementById(id)) {
                const n = document.createElement('script')
                const f = document.getElementsByTagName('script')[0]
                n.async = 1;
                n.src = '//cdn.taboola.com/libtrc/grupoelcomercio-${arcSite === ConfigParams.SITE_PUBLIMETRO ? 'publimetrope' : taboolaScript}/loader.js';
                n.id = id;
                f.parentNode.insertBefore(n, f);
              }
            }
      
            if (
              'IntersectionObserver' in window &&
              'IntersectionObserverEntry' in window &&
              'intersectionRatio' in window.IntersectionObserverEntry.prototype
            ) {
              const taboolaObserver = new IntersectionObserver(
                (entries, observer) => {
                  entries.forEach(entry => {
                    if (entry.isIntersecting) {
                      execTaboola()
                      taboolaObserver.unobserve(entry.target)
                    }
                  })
                },{rootMargin: "0px 0px 200px 0px"}
              )

              taboolaObserver.observe(taboolaDiv)
            } else {
              execTaboola()
            }
          })
        }
        if (window.performance && typeof window.performance.mark == 'function') {
          window.performance.mark('tbl_ic');
        }
      }()
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
  const dataStructuraHtmlAmp =
    contentElementsHtml.match(/:<script(.*?)>(.*?)<\/script>:/gm) || []
  return (
    <>
      <meta name="data-article-id" content={id} />
      <meta property="article:publisher" content={socialName.url} />
      <meta name="author" content={`Redacción ${siteName}`} />
      <meta name="bi3dPubDate" content={publishDateZone} />
      {sourceId && (
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
      <meta name="etiquetas" content={listItems.map(item => item)} />
      <meta name="content-type" content={getMultimedia(multimediaType)} />
      <meta name="section-id" content={removeLastSlash(primarySectionLink)} />
      <meta
        name="keywords"
        content={
          seoKeywordsItems[0]
            ? seoKeywordsItems.map(item => item)
            : (listItems[0] && listItems.map(item => item)) || arcSite
        }
      />
      {isPremium && <meta name="cXenseParse:per-tiponota" content="premium" />}
      <meta property="article:published_time" content={publishDateZone} />
      <meta
        property="article:modified_time"
        content={`${
          arcSite === ConfigParams.SITE_ELCOMERCIOMAG
            ? publishDateZone
            : lastPublishDate
        }`}
      />
      <meta property="article:author" content={`Redacción ${siteName}`} />
      <meta property="article:section" content={primarySection} />
      <meta property="article:content_tier" content={getContentType()} />
      {listItems.map(item => {
        return <meta property="article:tag" content={item} />
      })}
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
      {isAmp !== true && (
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: scriptTaboola }}
          async
        />
      )}

      {isAmp !== true &&
        contentElementsHtml.match(/<mxm-event (.*)><\/mxm-event>/gm) && (
          <style
            dangerouslySetInnerHTML={{
              __html: `.live-event {font-size: 16px;} .live-event .live-event-comment {display: block;position: relative;padding: 0 0 10px 65px;border-bottom: 1px solid #dcdcdc;margin-bottom: 10px;} .live-event .live-event-comment .live-event-minute{background: #e2e2e2;padding: 3px 8px;display: block;color: #000;top: 0px;position: absolute;left: 0;} .live-event .live-event-comment p{font-size: 18px;font-family: Georgia;line-height: 1.5;} .live-event .live-event-comment p a{color: #4a88c6;font-weight: bold;} .live-match {font-size: 16px;} .live-match .live-match-comment {display: block;position: relative;padding: 0 0 10px 40px;border-bottom: 1px solid #dcdcdc;margin-bottom: 10px;} .live-match .live-match-comment .live-match-minute{background: #e2e2e2;padding: 3px 8px;display: block;color: #000;top: 0px;position: absolute;left: 0;} .live-match .live-match-comment p{font-size: 18px;font-family: Georgia;line-height: 1.5;} .live-match .live-match-comment p a{color: #4a88c6;font-weight: bold;}`,
            }}></style>
        )}
      {isAmp === true &&
        dataStructuraHtmlAmp.map(datas => {
          return (
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
          )
        })}
    </>
  )
}
