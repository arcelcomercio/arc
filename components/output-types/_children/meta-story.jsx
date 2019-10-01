import React from 'react'
import ENV from 'fusion:environment'
import StoryData from '../../utilities/story-data'
import { formatHtmlToText, getMultimedia } from '../../utilities/helpers'
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
    seoTitle: title,
    tags,
    link,
    displayDate: publishDate,
    publishDate: lastPublishDate,
    subTitle,
    seoAuthor,
    imagesSeo,
    primarySection,
    primarySectionLink,
    videoSeo,
    contentElementsText: dataElement,
    relatedContent,
    seoKeywords,
    breadcrumbList,
    multimediaType,
    sourceId,
    isPremium,
    sourceUrlOld,
  } = new StoryData({ data, arcSite, contextPath, siteUrl })

  const videoSeoItems = videoSeo.map(
    ({ url, caption, urlImage, date } = {}) => {
      return `{ 
      "@type":"VideoObject",
        "name":"${formatHtmlToText(caption)}",
        "thumbnailUrl": "${urlImage}",
        "description":"${formatHtmlToText(caption)}",
        "contentUrl": "${url}",
        "uploadDate": "${date}"
     }
     `
    }
  )

  const imagesSeoItems = imagesSeo.map((image, i) => {
    const {
      subtitle = false,
      url = '',
      resized_urls: { amp_new: large = '' } = {},
    } = image || {}
    const representativeOfPage = i === 0 ? '"representativeOfPage":true,' : ''
    const description = subtitle
      ? `"description":"${formatHtmlToText(subtitle)}",`
      : ''
    return `{ 
         ${representativeOfPage}
         "@type":"ImageObject",
         "url": "${large || url}",
         ${description}
         "height":800,
         "width":1200
      }
      `
  })

  const listItems = tags.map(({ description }) => {
    return `${description}`
  })

  const listItemsTagsKeywords = tags.map(({ description }) => {
    return `"${description}"`
  })
  const seoKeyWordsStructurada = seoKeywords.map(item => {
    return `"${item}"`
  })

  const seoKeywordsItems = seoKeywords.map(item => {
    return `${item}`
  })

  const relatedContentItem = relatedContent.map((content, i) => {
    const { canonical_url: urlItem = '' } = content || {}
    const pathUrl = ENV.ENVIRONMENT === 'elcomercio' ? siteUrl : ''
    return `{  
      "@type":"ListItem",
      "position":${i + 1},
      "url":"${pathUrl}${urlItem}"
      }`
  })

  const relatedContentData = relatedContentItem[0]
    ? `{  
      "@context":"https://schema.org",
      "@type":"ItemList",
      "itemListElement":[${relatedContentItem}]  
   }`
    : ''

  const storyPremium = !isAmp
    ? ` "isAccessibleForFree": "False",
    "hasPart":
      {
      "@type": "WebPageElement",
      "isAccessibleForFree": "False",
      "cssSelector" : ".paywall"
      },`
    : ''

  const imagenData = imagesSeoItems[1]
    ? `"image":[ ${imagesSeoItems} ],`
    : `"image": ${imagesSeoItems},`

  const imagenDefoult = imagesSeoItems[0]
    ? imagenData
    : ` "image": {
      "@type": "ImageObject",
      "url": "${siteUrl}${deployment(
        `${contextPath}/resources/dist/${arcSite}/images/logo-story-default.jpg`
      )}",
      "description": "${formatHtmlToText(siteName)}",
      "height": 800,
      "width": 1200
    },`

  const dataVideo =
    `  "video":[ ${videoSeoItems}
  ],` || ''
  const structuredData = `{  
    "@context":"http://schema.org",
    "@type":"NewsArticle",
    "datePublished":"${publishDate}",
    "dateModified":"${lastPublishDate}",
    "headline":"${formatHtmlToText(title)}",
    "description":"${formatHtmlToText(subTitle)}",
    "articleBody":"${dataElement}",
    "mainEntityOfPage":{  
       "@type":"WebPage",
       "@id":"${siteUrl}${link}"
    },
    ${imagenDefoult}
    ${(videoSeoItems[0] && dataVideo) || ''}
    "author":{  
       "@type":"Person",
       "name":"${seoAuthor}"
    },
    "publisher":{  
       "@type":"Organization",
       "name":"${siteName}",
       "logo":{  
          "@type":"ImageObject",
          "url":"${siteUrl}${deployment(
    `${contextPath}/resources/dist/${arcSite}/images/${seo.logoAmp}`
  )}",
          "height":${seo.height},
          "width":${seo.width}
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
      `
         {  
            "@type":"ListItem",
            "position":${i + 1},
            "name":"${name}",
            "item":"${url}"
         } `
    )
  })

  const structuredBreadcrumb = `{  
      "@context":"https://schema.org",
      "@type":"BreadcrumbList",
      "itemListElement":[${breadcrumbResult}]  
      }`

  const scriptTaboola = `
  window._taboola = window._taboola || [];
    _taboola.push({
        article: 'auto'
    });
    ! function(e, f, u, i) {
        if (!document.getElementById(i)) {
            e.async = 1;
            e.src = u;
            e.id = i;
            f.parentNode.insertBefore(e, f);
        }
    }(document.createElement('script'),
        document.getElementsByTagName('script')[0],
        '//cdn.taboola.com/libtrc/grupoelcomercio-${
          arcSite === ConfigParams.SITE_PUBLIMETRO ? 'publimetrope' : arcSite
        }/loader.js',
        'tb_loader_script');
    if (window.performance && typeof window.performance.mark == 'function') {
        window.performance.mark('tbl_ic');
    }`

  const htmlAmpIs =
    arcSite === ConfigParams.ARC_SITE_GESTION && isPremium ? '' : true

  return (
    <>
      {!isAmp && htmlAmpIs && (
        <link rel="amphtml" href={`${siteUrl}${link}?outputType=amp`} />
      )}
      <meta name="data-article-id" content={id} />
      <meta property="article:publisher" content={socialName.url} />
      <meta name="author" content={`Redacción ${siteName}`} />
      <meta name="bi3dPubDate" content={publishDate} />
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
      <meta property="article:published_time" content={publishDate} />
      <meta property="article:modified_time" content={lastPublishDate} />
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
        />
      )}
    </>
  )
}
