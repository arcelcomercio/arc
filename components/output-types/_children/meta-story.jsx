import React from 'react'
import ENV from 'fusion:environment'
import StoryData from '../../utilities/story-data'
import {
  formatHtmlToText,
  getMultimedia,
  getDateSeo,
} from '../../utilities/helpers'
import ConfigParams from '../../utilities/config-params'

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
    tags,
    link,
    displayDate: publishDate,
    publishDate: lastPublishDate,
    subTitle,
    seoAuthor,
    imagePrimarySeo,
    primarySection,
    primarySectionLink,
    videoSeo,
    contentElementsText: dataElement,
    relatedContent,
    relatedStories,
    seoKeywords,
    breadcrumbList,
    multimediaType,
    sourceId,
    isPremium,
    sourceUrlOld,
  } = new StoryData({ data, arcSite, contextPath, siteUrl })

  const resultRelated = relatedContent[0] ? relatedContent : relatedStories

  const videoSeoItems = videoSeo.map(
    ({
      url,
      caption,
      urlImage,
      date,
      resized_urls: { large = '' } = {},
    } = {}) => {
      return `{ "@type":"VideoObject",  "name":"${formatHtmlToText(
        caption
      )}",  "thumbnailUrl": "${large ||
      urlImage}",  "description":"${formatHtmlToText(
        caption
      )}", "contentUrl": "${url}",  "uploadDate": "${date}" } `
    }
  )

  const imagesSeoItems = imagePrimarySeo.map((image) => {
    const {
      subtitle = false,
      url = '',
      resized_urls: { amp_new: large = '' } = {},
    } = image || {}
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

  const imagenData = imagesSeoItems[1]
    ? `"image": ${imagesSeoItems[0]} ,`
    : `"image": ${imagesSeoItems},`

  const imagenDefoult = imagesSeoItems[0]
    ? imagenData
    : `"image": {  "@type": "ImageObject", "url": "${siteUrl}${deployment(
      `${contextPath}/resources/dist/${arcSite}/images/logo-story-default.jpg`
    )}",  "description": "${formatHtmlToText(
      siteName
    )}", "height": 800, "width": 1200 },`

  const dataVideo = `  "video":[ ${videoSeoItems} ],` || ''

  const publishDateZone =
    arcSite === ConfigParams.SITE_ELCOMERCIO ||
      arcSite === ConfigParams.SITE_ELCOMERCIOMAG ||
      arcSite === ConfigParams.SITE_DEPOR ||
      arcSite === ConfigParams.SITE_ELBOCON
      ? getDateSeo(publishDate)
      : publishDate

  const bodyStructured = isAmp !== true ? `"articleBody":"${dataElement}",` : ''
  const structuredData = `{  "@context":"http://schema.org", "@type":"NewsArticle", "datePublished":"${publishDateZone}",
    "dateModified":"${
    arcSite === ConfigParams.SITE_ELCOMERCIO ||
      arcSite === ConfigParams.SITE_ELCOMERCIOMAG ||
      arcSite === ConfigParams.SITE_DEPOR ||
      arcSite === ConfigParams.SITE_ELBOCON
      ? publishDateZone
      : lastPublishDate
    }", "headline":"${formatHtmlToText(
      title
    )}",  "description":"${formatHtmlToText(subTitle)}",
  ${bodyStructured}
    "mainEntityOfPage":{   "@type":"WebPage",  "@id":"${siteUrl}${link}"     },     ${imagenDefoult}    ${(videoSeoItems[0] &&
      dataVideo) ||
    ''}
    "author":{    "@type":"Person",   "name":"${seoAuthor}"    },
    "publisher":{  "@type":"Organization", "name":"${siteName}",  "logo":{  "@type":"ImageObject", "url":"${siteUrl}${deployment(
      `${contextPath}/resources/dist/${arcSite}/images/${seo.logoAmp}`
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
  window._taboola=window._taboola||[],_taboola.push({article:"auto"}),function(){if("undefined"!=typeof window){window.onload=document.addEventListener("scroll",function o(){document.removeEventListener("scroll",o);const e="tb_loader_script";if(!document.getElementById(e)){const o=document.createElement("script"),n=document.getElementsByTagName("script")[0];o.async=1,o.src="//cdn.taboola.com/libtrc/grupoelcomercio-${arcSite === ConfigParams.SITE_PUBLIMETRO ? 'publimetrope' : taboolaScript}/loader.js",o.id=e,n.parentNode.insertBefore(o,n)}})}window.performance&&"function"==typeof window.performance.mark&&window.performance.mark("tbl_ic")}();`

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
      <meta name="section-id" content={primarySectionLink} />
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
          arcSite === ConfigParams.SITE_ELCOMERCIO ||
            arcSite === ConfigParams.SITE_ELCOMERCIOMAG
            ? publishDateZone
            : lastPublishDate
          }`}
      />
      <meta property="article:author" content={`Redacción ${siteName}`} />
      <meta property="article:section" content={primarySection} />

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
    </>
  )
}
