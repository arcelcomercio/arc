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
        data: recentStories.data,
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

  let currentStoryIndex = 0
  let currentStoryIntersectionRatio = 1.0
  let storyCounter = 0

    const isPremiumUser = () => {
            let isPremium = false
            if(window.localStorage && window.localStorage.hasOwnProperty('ArcId.USER_INFO') && window.localStorage.getItem('ArcId.USER_INFO') !== '{}'){
              const UUID_USER = JSON.parse(window.localStorage.getItem('ArcId.USER_INFO')).uuid;
              const COUNT_USER = JSON.parse(window.localStorage.getItem('ArcP') || '{}')[UUID_USER]
              if(COUNT_USER && COUNT_USER.sub.p.length) { isPremium = true }
            } else { isPremium = false }
            return isPremium;
          }
  const sessionStoriesObject = ((JSON.parse(window.sessionStorage.getItem(URLS_STORAGE)) || {}).data) || {storiesByTag:[],storiesBySection:[],storiesBySectionPremium:[]} 
  let nextStoriesArray = isPremiumUser() 
    ? [...sessionStoriesObject.storiesBySectionPremium, ...sessionStoriesObject.storiesByTag]
    : [...sessionStoriesObject.storiesByTag, ...sessionStoriesObject.storiesBySection]
  nextStoriesArray.unshift({
    title: document.title,
    link: location.pathname
  })

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
  
  let page = 0
  
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
  const { globalContent, arcSite, requestUri } = useAppContext()
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
    const {
      websites: { [arcSite]: { website_url: websiteUrl = '' } = {} } = {},
      promo_items: { basic_gallery: { type } = {} } = {},
    } = story
    // Filtra las historias que no son Galeria horizontal
    return (
      requestUri !== websiteUrl &&
      ((type === ELEMENT_GALLERY && story.subtype !== GALLERY_SLIDER) ||
        (type !== ELEMENT_GALLERY && story.subtype === GALLERY_SLIDER))
    )
  }

  const filterStories = (stories = []) => {
    return stories
      .filter(filterStoriesCb)
      .map(
        ({
          websites: { [arcSite]: { website_url: websiteUrl = '' } = {} } = {},
          headlines: { basic = '' } = {},
        }) => ({ link: websiteUrl, title: basic })
      )
  }

  // Determina cantidad de historias si hay o no tag
  const filteredStories = {
    storiesByTag: tag ? filterStories(tagElements).slice(0, 5) : [],
    storiesBySection: filterStories(sectionElements).slice(0, tag ? 5 : 10),
    storiesBySectionPremium: filterStories(sectionElementsPremium).slice(
      0,
      tag ? 5 : 10
    ),
  }

  const stContinueScript = `"use strict";window.addEventListener("load",function(){requestIdle(function(){var e="_recent_articles_",t="<<recentStoriesrecentStoriesrecentStories>>",n=JSON.parse(window.sessionStorage.getItem(e))||{},o=document.getElementById("st-continue-0"),i=function(n){void 0===n&&(n={});var o=n,i=o.section;o.data;window.sessionStorage.setItem(e,JSON.stringify({section:i,data:t.data}))};n.section?n.section!==t.section?(window.sessionStorage.removeItem(e),i(t)):(window.sessionStorage.removeItem(e),i(n)):i(t);var r=0,s=1,a=0,c=(JSON.parse(window.sessionStorage.getItem(e))||{}).data||{storiesByTag:[],storiesBySection:[],storiesBySectionPremium:[]},d=function(){var e=!1;if(window.localStorage&&window.localStorage.hasOwnProperty("ArcId.USER_INFO")&&"{}"!==window.localStorage.getItem("ArcId.USER_INFO")){var t=JSON.parse(window.localStorage.getItem("ArcId.USER_INFO")).uuid,n=JSON.parse(window.localStorage.getItem("ArcP")||"{}")[t];n&&n.sub.p.length&&(e=!0)}else e=!1;return e}()?[].concat(c.storiesBySectionPremium,c.storiesByTag):[].concat(c.storiesByTag,c.storiesBySection);d.unshift({title:document.title,link:location.pathname});var u=function(){return location.href.includes("/pf")},l=function(e){void 0===e&&(e=0),requestIdle(function(){if("IntersectionObserver"in window){var t=null;e<=0?(t=document.getElementById("contenedor")).setAttribute("data-index",0):e>0&&(t=document.getElementById("st-iframe-"+e));var n=new IntersectionObserver(function(e){e.forEach(function(e){if(e.isIntersecting){var t=parseInt(e.target.dataset.index);r===t?s=e.intersectionRatio:s<.02&&e.intersectionRatio>.02&&(r=t,s=e.intersectionRatio,n=d[r],o=r,document.title=n.title,history.pushState({story:o},n.title,u()?"/pf"+n.link:n.link))}var n,o})},{rootMargin:"0px",threshold:function(){for(var e=[],t=1;t<=50;t++){var n=t/50;e.push(n)}return e.push(0),e}()});t&&n.observe(t)}})},f=(/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test("undefined"!=typeof window?window.navigator.userAgent:""),function(e){var t=d[a+=1]||{};t.link&&(requestIdle(function(){var n=t.link+"?ref=nota&ft=autoload&story="+a;n=u()?n+"&outputType=lite&_website=<<arcSite>>":n;var o=document.createElement("iframe");o.src=location.origin+n,o.width="100%",o.height="6000",o.id="st-iframe-"+a,o.frameborder="0",o.scrolling="no",o.setAttribute("data-index",a),e.insertAdjacentElement("afterEnd",o),l(a)}),requestIdle(function(){var e=document.createElement("div");e.id="st-continue-"+a,e.style.height="10px";var t=document.getElementById("st-iframe-"+a);t.insertAdjacentElement("afterEnd",e),w(e),t.onload=function(){requestIdle(function(){t.height=t.contentWindow.document.documentElement.offsetHeight+"px"})}}))}),w=function(e){if("IntersectionObserver"in window){var t=new IntersectionObserver(function(e){e.forEach(function(e){e.isIntersecting&&(f(e.target),t.unobserve(e.target))})},{rootMargin:"0px 0px 800px 0px"});t.observe(e)}else window.addEventListener("scroll",function(){!function e(t){window.innerHeight+document.documentElement.scrollTop>=t.offsetTop-800&&window.removeEventListener("scroll",function(){e(t)}),f(t)}(e)})};w(o),l(0)})});`
    .replace('<<arcSite>>', arcSite)
    .replace(
      '"<<recentStoriesrecentStoriesrecentStories>>"',
      JSON.stringify({
        section: removeLastSlash(path),
        data: filteredStories,
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
      <div id="st-continue-0" style={{ height: '10px' }} />
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
