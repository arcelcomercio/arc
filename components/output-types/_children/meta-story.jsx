import React, { Fragment } from 'react'
import StoryData from '../../utilities/story-data'

export default ({
  globalContent: data,
  arcSite,
  contextPath,
  siteName = '',
  siteUrl = '',
  deployment,
}) => {
  const {
    title,
    tags,
    link,
    publishDate,
    subTitle,
    seoAuthor,
    imagesSeo,
    section,
    videoSeo,
    contentElementsText: dataElement,
    relatedContent,
    seoKeywords,
    breadcrumbList,
  } = new StoryData({ data, arcSite, contextPath, siteUrl })

  const videoSeoItems = videoSeo.map(
    ({ url, caption, urlImage, date } = {}) => {
      return `{ 
      "@type":"VideoObject",
        "name":"${caption}",
        "thumbnailUrl": "${urlImage}",
        "description":"${caption}",
        "contentUrl": "${url}",
        "uploadDate": "${date}"
     }
     `
    }
  )

  const imagesSeoItems = imagesSeo.map(({ url = '', subtitle } = {}) => {
    return `{ 
         "representativeOfPage":true,
         "@type":"ImageObject",
         "url": "${url}",
         "description":"${subtitle}",
         "height":418,
         "width":696
      }
      `
  })

  const listItems = tags.map(({ description }) => {
    return `${description}`
  })

  const seoKeywordsItems = seoKeywords.map(item => {
    return `"${item}"`
  })

  const relatedContentItem = relatedContent.map((content, i) => {
    const { canonical_url: urlItem = '' } = content || {}
    return `{  
      "@type":"ListItem",
      "position":${i + 1},
      "url":"${contextPath}${urlItem}"
      }`
  })

  const relatedContentData = relatedContentItem[0]
    ? `{  
      "@context":"https://schema.org",
      "@type":"ItemList",
      "itemListElement":[${relatedContentItem}]  
   }`
    : ''

  const structuredData = `{  
    "@context":"http://schema.org",
    "@type":"NewsArticle",
    "datePublished":"${publishDate}",
    "dateModified":"${publishDate}",
    "headline":"${title}",
    "description":"${subTitle}",
    "articleBody":"${dataElement}",
    "mainEntityOfPage":{  
       "@type":"WebPage",
       "@id":"${link}"
    },
    "image":[  
       ${imagesSeoItems}
    ],
    "video":[ ${videoSeoItems}
    ],
    "author":{  
       "@type":"Person",
       "name":"${seoAuthor}"
    },
    "publisher":{  
       "@type":"Organization",
       "name":"${siteName}",
       "logo":{  
          "@type":"ImageObject",
          "url":"${deployment(
            `${siteUrl}${contextPath}/resources/dist/${arcSite}/images/logo.png`
          )}",
          "height":60,
          "width":316
       }
    },
    "keywords":[${seoKeywordsItems.map(item => item)}]
 }`

  const breadcrumbResult = breadcrumbList.map(({ url, name }, i) => {
    return (
      url &&
      `
         {  
            "@type":"ListItem",
            "position":${i + 1},
            "item":{  
               "@id":"${url}",
               "name":"${name}"
            }
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
        '//cdn.taboola.com/libtrc/grupoelcomercio-trome/loader.js',
        'tb_loader_script');
    if (window.performance && typeof window.performance.mark == 'function') {
        window.performance.mark('tbl_ic');
    }`

  return (
    <Fragment>
      <meta
        property="article:publisher"
        content={`http://www.facebook.com/${siteUrl}`}
      />
      <meta name="author" content={`Redacción ${siteName}`} />
      <meta name="bi3dPubDate" content={publishDate} />
      <meta name="bi3dArtId" content="639992" />
      <meta name="bi3dSection" content={section} />
      <meta name="bi3dArtTitle" content={title} />
      <meta name="cXenseParse:per-categories" content={section} />
      <meta name="etiquetas" content={listItems.map(item => item)} />

      <meta property="article:published_time" content={publishDate} />
      <meta property="article:modified_time" content={publishDate} />
      <meta property="article:author" content={`Redacción ${siteName}`} />
      <meta property="article:section" content={section} />
      <meta
        property="article:tag"
        content={seoKeywordsItems.map(item => item)}
      />

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
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: scriptTaboola }}
      />
    </Fragment>
  )
}
