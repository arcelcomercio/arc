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
  const initialPointer = document.getElementById('st-continue-0')

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

  const nextStoriesArray = [
    {
      title: document.title,
      link: location.href
    }, 
    ...((JSON.parse(window.sessionStorage.getItem(URLS_STORAGE)) || {}).data) || []
  ]
  
  let isIntersecting = false
  let nextStory = 0
  let prevStory = 0
  
  let currentStoryIndex = 0
  let currentStoryIntersectionRatio = 1.0
  let storyCounter = 0

  const context = () => location.href.includes("/pf")

  const pushState = (storyState, storyNumber) => {
    document.title = storyState.title
    history.pushState({story: storyNumber}, storyState.title, context() ? "/pf" + storyState.link : storyState.link)
  }

  const THRESHOLD_STEPS = 50

  // No disponible para navegadores antiguos (IE11)
  const storiesListObserver = (storyIndex = 0) => {
    requestIdle(() => {
      if ('IntersectionObserver' in window) {
        let storyToObserve = null
        if(storyIndex <= 0) {
          // Contenido de la primera nota
          storyToObserve = document.getElementById("contenedor")
          storyToObserve.setAttribute("data-index", 0)
        } else if(storyIndex > 0){
          storyToObserve = document.getElementById("st-iframe-" + storyIndex)
        }

        function buildThresholdList() {
          let thresholds = [];
          for (let i=1.0; i<=THRESHOLD_STEPS; i++) {
            let ratio = i/THRESHOLD_STEPS;
            thresholds.push(ratio);
          }
          thresholds.push(0);
          return thresholds;
        }


        const storyObserver = new IntersectionObserver(function(entries) {
          const minThreshold = 1.0 / THRESHOLD_STEPS
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const intersectingStoryIndex = parseInt(entry.target.dataset.index)
              
              if(currentStoryIndex === intersectingStoryIndex) {
                currentStoryIntersectionRatio = entry.intersectionRatio
              } else if(currentStoryIntersectionRatio < minThreshold && entry.intersectionRatio > minThreshold) {
                currentStoryIndex = intersectingStoryIndex
                currentStoryIntersectionRatio = entry.intersectionRatio
                pushState(nextStoriesArray[currentStoryIndex] , currentStoryIndex)
              }
            }
          })
        }, {
          rootMargin: '0px',
          threshold: buildThresholdList()
        })

        if(storyToObserve) {
          storyObserver.observe(storyToObserve)
        }
      }
    })
  }

  
  const isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
    typeof window !== 'undefined' ? window.navigator.userAgent : ''
    )
  
  const loadNextUrlStorage = (observedElement) => {
    storyCounter = storyCounter + 1
    const nextStory = nextStoriesArray[storyCounter] || {}

    if(nextStory.link){
      // Se crea iframe y pushea nuevo registro al historial
      requestIdle(() => {
        let nextUrl = nextStory.link + "?ref=nota&ft=autoload&story=" + storyCounter
        nextUrl = context()
          ? nextUrl + "&outputType=lite&_website=" + arcSite 
          : nextUrl

        const next = document.createElement('iframe')
        next.src = location.origin + nextUrl
        next.width = "100%"
        next.height = "6000"
        next.id = "st-iframe-" + storyCounter
        next.frameborder = "0"
        next.scrolling = "no"
        next.setAttribute("data-index", storyCounter)

        observedElement.insertAdjacentElement('afterEnd', next)
        // pushState(nextStory, storyCounter)

        // Observa la noticia actual
        storiesListObserver(storyCounter)
      })
      
      // Se crea nuevo div para observar
      requestIdle(() => {
        const pointer = document.createElement('div')
        pointer.id = "st-continue-" + storyCounter
        pointer.style.height = "10px"
        
        const iframe = document.getElementById("st-iframe-" + storyCounter)
        iframe.insertAdjacentElement('afterEnd', pointer)        
        
        // Se observa el siguiente div
        iframeObserver(pointer)
        
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
    const legacyBrowserTrigger = (observedElement) => {
        if (
          window.innerHeight + document.documentElement.scrollTop >=
          observedElement.offsetTop - 800
        )
          window.removeEventListener('scroll', function cbTrigger() {legacyBrowserTrigger(observedElement)})
          loadNextUrlStorage(observedElement)
    }
  
    if ('IntersectionObserver' in window) {
      const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadNextUrlStorage(entry.target)
            sectionObserver.unobserve(entry.target)
          }
        })
      }, {rootMargin: '0px 0px 800px 0px'})
      sectionObserver.observe(elementToObserve)
    } else {
      window.addEventListener('scroll', function cbTrigger() {legacyBrowserTrigger(elementToObserve)})
    }
  } 

  iframeObserver(initialPointer)
  storiesListObserver(0)
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

  const stContinueScript = `"use strict";window.addEventListener("load",function(){requestIdle(function(){var e="_recent_articles_",t="<<recentStoriesrecentStoriesrecentStories>>",n=JSON.parse(window.sessionStorage.getItem(e))||{},i=document.getElementById("st-continue-0"),o=function(t){void 0===t&&(t={});var n=t,i=n.section,o=n.data,r=void 0===o?[]:o;window.sessionStorage.setItem(e,JSON.stringify({section:i,data:r.filter(function(e){return e.link!==window.location.pathname})}))};n.section?n.section!==t.section?(window.sessionStorage.removeItem(e),o(t)):(window.sessionStorage.removeItem(e),o(n)):o(t);var r=[{title:document.title,link:location.href}].concat((JSON.parse(window.sessionStorage.getItem(e))||{}).data||[]),s=0,a=1,c=0,d=function(){return location.href.includes("/pf")},u=function(e){void 0===e&&(e=0),requestIdle(function(){if("IntersectionObserver"in window){var t=null;e<=0?(t=document.getElementById("contenedor")).setAttribute("data-index",0):e>0&&(t=document.getElementById("st-iframe-"+e));var n=new IntersectionObserver(function(e){e.forEach(function(e){if(e.isIntersecting){var t=parseInt(e.target.dataset.index);s===t?a=e.intersectionRatio:a<.02&&e.intersectionRatio>.02&&(s=t,a=e.intersectionRatio,n=r[s],i=s,document.title=n.title,history.pushState({story:i},n.title,d()?"/pf"+n.link:n.link))}var n,i})},{rootMargin:"0px",threshold:function(){for(var e=[],t=1;t<=50;t++){var n=t/50;e.push(n)}return e.push(0),e}()});t&&n.observe(t)}})},l=(/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test("undefined"!=typeof window?window.navigator.userAgent:""),function(e){var t=r[c+=1]||{};t.link&&(requestIdle(function(){var n=t.link+"?ref=nota&ft=autoload&story="+c;n=d()?n+"&outputType=lite&_website=<<arcSite>>":n;var i=document.createElement("iframe");i.src=location.origin+n,i.width="100%",i.height="6000",i.id="st-iframe-"+c,i.frameborder="0",i.scrolling="no",i.setAttribute("data-index",c),e.insertAdjacentElement("afterEnd",i),u(c)}),requestIdle(function(){var e=document.createElement("div");e.id="st-continue-"+c,e.style.height="10px";var t=document.getElementById("st-iframe-"+c);t.insertAdjacentElement("afterEnd",e),f(e),t.onload=function(){requestIdle(function(){t.height=t.contentWindow.document.documentElement.offsetHeight+"px"})}}))}),f=function(e){if("IntersectionObserver"in window){var t=new IntersectionObserver(function(e){e.forEach(function(e){e.isIntersecting&&(l(e.target),t.unobserve(e.target))})},{rootMargin:"0px 0px 800px 0px"});t.observe(e)}else window.addEventListener("scroll",function(){!function e(t){window.innerHeight+document.documentElement.scrollTop>=t.offsetTop-800&&window.removeEventListener("scroll",function(){e(t)}),l(t)}(e)})};f(i),u(0)})});`
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
      const storyLimit = document.getElementById("st-continue-0").offsetTop
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
  const anchorScript = `"use strict";window.addEventListener("load",function(){requestIdle(function(){var e=document.getElementById("anchor"),c=document.getElementById("st-continue-0").offsetTop,n=(document.documentElement.scrollHeight,window.innerHeight);window.addEventListener("scroll",function(){n+window.scrollY>=c?e.className.includes("active")||(e.className=e.className.concat(" active")):e.className.includes("active")&&n+window.scrollY<c&&(e.className=e.className.replace(" active",""))},{passive:!0}),e.addEventListener("click",function(){e.className=e.className.replace(" active",""),window.scrollTo(0,0)})})});`

  return (
    <>
      <div id="st-continue-0" style={{ height: '10px' }}/>
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
