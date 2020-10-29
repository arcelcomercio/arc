import React from 'react'
import { useAppContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import { removeLastSlash } from '../../../utilities/parse/strings'
import { GALLERY_SLIDER } from '../../../utilities/constants/subtypes'
import { ELEMENT_GALLERY } from '../../../utilities/constants/element-types'
import customFields from './_dependencies/custom-fields'

/* 
window.addEventListener('load', () => {requestIdle(() => {
  const URLS_STORAGE = "_recent_articles_"
  const arcSite = "<<arcSite>>" 
  const recentStories = "<<recentStoriesrecentStoriesrecentStories>>" || {}
  const sessionStories =
    JSON.parse(window.sessionStorage.getItem(URLS_STORAGE)) || {}

  const setSessionStorageData = (dataTo = {}) => {
    const { section, data = [] } = dataTo
    window.sessionStorage.setItem(
      URLS_STORAGE,
      JSON.stringify({
        section,
        data: data.filter(({ link }) => link !== window.location.pathname),
      })
    )
  }

  if (sessionStories.section) {
    if (sessionStories.section !== recentStories.section) {
      window.sessionStorage.removeItem(URLS_STORAGE)
      setSessionStorageData(recentStories)
    } else {
      window.sessionStorage.removeItem(URLS_STORAGE)
      // dentro de setSessionStorageData() se filtra la URL actual
      setSessionStorageData(sessionStories)
    }
  } else {
    setSessionStorageData(recentStories)
  }

  
  const isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
    typeof window !== 'undefined' ? window.navigator.userAgent : ''
    )
    
  const nextStoriesArray =
    ((JSON.parse(window.sessionStorage.getItem(URLS_STORAGE)) || {}).data) || []
  let page = 0
  
  const loadNextUrlStorage = () => {
    const nextStory = nextStoriesArray[page] || {}

    if(nextStory.link){
      page =+ 1

      // Se crea iframe y pushea nuevo registro al historial
      requestIdle(() => {
        const context = location.href.includes("/pf")
        let nextUrl = nextStory.link + "?ref=nota&ft=autoload&story=" + page
        nextUrl = context
          ? nextUrl + "&outputType=lite&_website=" + arcSite 
          : nextUrl

        const next = document.createElement('iframe')
        next.src = location.origin + nextUrl
        next.width = "100%"
        next.height = "8000"
        next.id = "st-iframe-" + page
        next.frameborder = "0"
        next.scrolling = "no"
        document.body.appendChild(next)
        document.title = nextStory.title
        history.pushState({story: page}, nextStory.title, context ? "/pf" + nextStory.link : nextStory.link)
      })
      
      // Se crea nuevo div para observar
      requestIdle(() => {
        const pointer = document.createElement('div')
        pointer.id = "st-continue-" + page
        pointer.style.height = "10px"
        document.body.appendChild(pointer)

        // Se observa el siguiente div
        iframeObserver(pointer)

        const iframe = document.getElementById("st-iframe-" + page)
        
        function resetIframeHeight() {
          iframe.height = iframe.contentWindow.document.documentElement.offsetHeight + "px"
        }

        iframe.onload = function(){
          requestIdle(() => {
            resetIframeHeight()
            // Completar logica aqui si hace falta
          })
        }
      })
    }
  }

  const iframeObserver = (elementToObserve) => {
    // No soporte para Legacy Browsers
    const legacyBrowserTrigger = () => {
        if (
          window.innerHeight + document.documentElement.scrollTop >=
          document.body.scrollHeight - 500
        )
          window.removeEventListener('scroll', legacyBrowserTrigger)
          loadNextUrlStorage()
    }
  
    if ('IntersectionObserver' in window) {
      const sectionOneObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadNextUrlStorage()
            sectionOneObserver.unobserve(entry.target)
          }
        })
      }, {rootMargin: '0px 0px 800px 0px'})
      sectionOneObserver.observe(elementToObserve)
    } else {
      window.addEventListener('scroll', legacyBrowserTrigger)
    }
  } 

  iframeObserver(document.getElementById('st-continue'))
})})
*/

const StoryContinueLite = props => {
  const { customFields: { activeAnchor } = {} } = props
  const { globalContent, arcSite } = useAppContext()
  const { taxonomy: { primary_section: { path = '' } = {}, tags = [] } = {} } =
    globalContent || {}
  const { slug: tag } = tags[0]

  const tagStories =
    useContent({
      source: 'story-feed-by-tag',
      query: {
        name: tag,
        stories_qty: 10,
        includedFields: `websites.${arcSite}.website_url,headlines.basic,promo_items.basic_gallery.type,subtype,content_restrictions.content_code`,
        isContentType: 'free',
      },
    }) || {}

  const sectionStories =
    useContent({
      source: 'story-feed-by-section',
      query: {
        section: removeLastSlash(path),
        stories_qty: tag ? 10 : 20,
        includedFields: `websites.${arcSite}.website_url,headlines.basic,promo_items.basic_gallery.type,subtype,content_restrictions.content_code`,
        isContentType: 'free',
      },
    }) || {}

  const sectionStoriesPremium =
    useContent({
      source: 'story-feed-by-section',
      query: {
        section: removeLastSlash(path),
        stories_qty: tag ? 10 : 20,
        includedFields: `websites.${arcSite}.website_url,headlines.basic,promo_items.basic_gallery.type,subtype,content_restrictions.content_code`,
        isContentType: 'premium',
      },
    }) || {}

  const { content_elements: tagElements = [] } = tagStories
  const { content_elements: sectionElements = [] } = sectionStories
  const {
    content_elements: sectionElementsPremium = [],
  } = sectionStoriesPremium

  const filterStoriesCb = (story = {}) => {
    const { promo_items: { basic_gallery: { type } = {} } = {} } = story
    // Filtra las historias que no son Galeria horizontal
    return (
      (type === ELEMENT_GALLERY && story.subtype !== GALLERY_SLIDER) ||
      (type !== ELEMENT_GALLERY && story.subtype === GALLERY_SLIDER)
    )
  }

  // Determina cantidad de historias si hay o no tag
  const filteredStories = [
    ...(tag ? tagElements.filter(filterStoriesCb).slice(0, 5) : []),
    ...sectionElements.filter(filterStoriesCb).slice(0, tag ? 5 : 10),
    ...sectionElementsPremium.filter(filterStoriesCb).slice(0, tag ? 5 : 10),
  ]

  const stContinueScript = `"use strict";window.addEventListener("load",function(){requestIdle(function(){var e="_recent_articles_",t="<<recentStoriesrecentStoriesrecentStories>>",n=JSON.parse(window.sessionStorage.getItem(e))||{},o=function(t){void 0===t&&(t={});var n=t,o=n.section,i=n.data,r=void 0===i?[]:i;window.sessionStorage.setItem(e,JSON.stringify({section:o,data:r.filter(function(e){return e.link!==window.location.pathname})}))};n.section?n.section!==t.section?(window.sessionStorage.removeItem(e),o(t)):(window.sessionStorage.removeItem(e),o(n)):o(t);/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test("undefined"!=typeof window?window.navigator.userAgent:"");var i=(JSON.parse(window.sessionStorage.getItem(e))||{}).data||[],r=0,s=function(){var e=i[r]||{};e.link&&(r=1,requestIdle(function(){var t=location.href.includes("/pf"),n=e.link+"?ref=nota&ft=autoload&story="+r;n=t?n+"&outputType=lite&_website=<<arcSite>>":n;var o=document.createElement("iframe");o.src=location.origin+n,o.width="100%",o.height="8000",o.id="st-iframe-"+r,o.frameborder="0",o.scrolling="no",document.body.appendChild(o),document.title=e.title,history.pushState({story:r},e.title,t?"/pf"+e.link:e.link)}),requestIdle(function(){var e=document.createElement("div");e.id="st-continue-"+r,e.style.height="10px",document.body.appendChild(e),d(e);var t=document.getElementById("st-iframe-"+r);t.onload=function(){requestIdle(function(){t.height=t.contentWindow.document.documentElement.offsetHeight+"px"})}}))},d=function(e){if("IntersectionObserver"in window){var t=new IntersectionObserver(function(e){e.forEach(function(e){e.isIntersecting&&(s(),t.unobserve(e.target))})},{rootMargin:"0px 0px 800px 0px"});t.observe(e)}else window.addEventListener("scroll",function e(){window.innerHeight+document.documentElement.scrollTop>=document.body.scrollHeight-500&&window.removeEventListener("scroll",e),s()})};d(document.getElementById("st-continue"))})});`
    .replace('<<arcSite>>', arcSite)
    .replace(
      '"<<recentStoriesrecentStoriesrecentStories>>"',
      JSON.stringify({
        section: removeLastSlash(path),
        data: filteredStories.map(
          ({
            websites: { [arcSite]: { website_url: websiteUrl = '' } = {} } = {},
            headlines: { basic = '' } = {},
          }) => ({ link: websiteUrl, title: basic })
        ),
      })
    )

  /*
    window.addEventListener('load', () => {requestIdle(() => {
      const $anchor = document.getElementById("anchor")
      const storyLimit = document.getElementById("st-continue").offsetTop
      const {scrollHeight} = document.documentElement
      const {innerHeight} = window 

      const setScrollLoaderPage = () => {
        if (innerHeight + window.scrollY >= storyLimit) {
          if(!$anchor.className.includes('active'))
            $anchor.className = $anchor.className.concat(" active")
        } else if($anchor.className.includes('active')) {
          if(innerHeight + window.scrollY < storyLimit)
            $anchor.className = $anchor.className.replace(" active", "")
        }
      }

      window.addEventListener('scroll', setScrollLoaderPage, { passive: true })
      $anchor.addEventListener("click", () => {
        $anchor.className = $anchor.className.replace(" active", "")
        window.scrollTo(0,0)
      })
    })})
  */
  const anchorScript = `"use strict";window.addEventListener("load",function(){requestIdle(function(){var e=document.getElementById("anchor"),c=document.getElementById("st-continue").offsetTop,n=(document.documentElement.scrollHeight,window.innerHeight);window.addEventListener("scroll",function(){n+window.scrollY>=c?e.className.includes("active")||(e.className=e.className.concat(" active")):e.className.includes("active")&&n+window.scrollY<c&&(e.className=e.className.replace(" active",""))},{passive:!0}),e.addEventListener("click",function(){e.className=e.className.replace(" active",""),window.scrollTo(0,0)})})});`

  return (
    <>
      <div id="st-continue" style={{ height: '10px' }} />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: stContinueScript,
        }}
      />
      {activeAnchor && (
        <>
          <button
            type="button"
            aria-label="Ir al inicio de la página"
            id="anchor"
            className="st-continue__anchor">
            <svg
              aria-disabled="true"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              viewBox="0 0 451.8 451.8">
              <path d="M345.4 248.3L151.2 442.6c-12.4 12.4-32.4 12.4-44.7 0 -12.4-12.4-12.4-32.4 0-44.7L278.3 225.9 106.4 54c-12.4-12.4-12.4-32.4 0-44.7 12.4-12.4 32.4-12.4 44.8 0l194.3 194.3c6.2 6.2 9.3 14.3 9.3 22.4C354.7 234 351.6 242.1 345.4 248.3z" />
            </svg>
          </button>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: anchorScript,
            }}
          />
        </>
      )}
    </>
  )
}
StoryContinueLite.static = true

StoryContinueLite.propTypes = {
  customFields,
}

export default StoryContinueLite
