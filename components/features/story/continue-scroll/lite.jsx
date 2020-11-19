import React from 'react'
import { useAppContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import { removeLastSlash } from '../../../utilities/parse/strings'
import { deleteQueryString } from '../../../utilities/parse/queries'
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
  window.dataLayer = window.dataLayer || [];

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

  window.addEventListener( "message", function (event) {  
    const { origin, source, data = {} } = event
    // Solo entra si es el mismo origen
    if(origin === window.location.origin) {
      if(data.id === "story_iframe") {
        requestIdle(() => {
          const iframeSearchMatch = source.location.search.match(/story=([0-9]{1,2})/) || {}
          const storyNumber = iframeSearchMatch && iframeSearchMatch[1]
          if(storyNumber) {
            const resizedIframe = document.getElementById("st-iframe-" + storyNumber) || {}
            if(resizedIframe.height !== data.storyHeight) {
              resizedIframe.height = data.storyHeight || resizedIframe.height
            }
          }
        })
      } else if(data.id === "iframe_signwall" || data.id === "iframe_relogin") {
        window.location.href = data.redirectUrl
      } else if(data.id === "iframe_paywall") {
        const signwall = document.getElementById("signwall-app")
        signwall.className = "active-signwall"
        const bodyTags = document.getElementsByTagName("body")
        bodyTags[0].style.overflow = "hidden"
      } else if(data.id === "anchor-top") {
        window.scrollTo(0,0)
      }
    }
  }, false);

  if (sessionStories.section) {
    window.sessionStorage.removeItem(URLS_STORAGE)
  } 
  setSessionStorageData(recentStories)

  let currentStoryIndex = 0
  let currentStoryIntersectionRatio = 1.0
  let storyCounter = 0

  const isPremiumUser = () => {
    let isPremium = false
    if(window.localStorage && window.localStorage.hasOwnProperty('ArcId.USER_INFO') && window.localStorage.getItem('ArcId.USER_INFO') !== '{}'){
      const UUID_USER = JSON.parse(window.localStorage.getItem('ArcId.USER_INFO')).uuid;
      const COUNT_USER = JSON.parse(window.localStorage.getItem('ArcP') || '{}')[UUID_USER]
      if(COUNT_USER && COUNT_USER.sub.p.length) { isPremium = true }
    }
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
              // setTimeout en lugar de requestIdle para asegurar orden de ejecucion
              setTimeout(() => {
                const intersectingStoryIndex = parseInt(entry.target.dataset.index)

                if(currentStoryIndex === intersectingStoryIndex) {
                  currentStoryIntersectionRatio = entry.intersectionRatio
                  if(entry.target.contentWindow) {
                    const iframeInnerHeight = entry.target.contentWindow.document.documentElement.offsetHeight + "px"
                    if(entry.target.height !== iframeInnerHeight) {
                      entry.target.height = iframeInnerHeight
                    }
                  }
                } else if(entry.intersectionRatio > currentStoryIntersectionRatio) {
                  currentStoryIndex = intersectingStoryIndex
                  currentStoryIntersectionRatio = entry.intersectionRatio
                  pushState(nextStoriesArray[currentStoryIndex] , currentStoryIndex)
                }
              }, 1)
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
        let nextUrl = location.origin + "/carga-continua" + nextStory.link + "?ref=nota&ft=cargacontinua&outputType=lite&story=" + storyCounter
        nextUrl = context()
          ? nextUrl + "&_website=" + arcSite 
          : nextUrl

        const next = document.createElement('iframe')
        next.src = nextUrl
        next.width = "100%"
        next.height = "6000"
        next.id = "st-iframe-" + storyCounter
        next.className = "st-iframe"
        next.frameborder = "0"
        next.scrolling = "no"
        next.setAttribute("data-index", storyCounter)

        observedElement.insertAdjacentElement('afterEnd', next)

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
      })
    }
  }

  const iframeObserver = (elementToObserve) => {
    // Soporte para Legacy Browsers
    const legacyBrowserTrigger = (observedElement) => {
        if (
          window.innerHeight + document.documentElement.scrollTop >=
          observedElement.offsetTop - 1000
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
      }, {rootMargin: '0px 0px 1000px 0px'})
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
  const { slug: tag = '' } = tags[0] || {}
  const cleanRequestUri = deleteQueryString(requestUri)

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
      !/^\/(somos|archivo-elcomercio)\//.test(websiteUrl) &&
      cleanRequestUri !== websiteUrl &&
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

  const existTagStories = tag && tagElements && tagElements[0]
  const filteredStories = {
    storiesByTag: tag ? filterStories(tagElements).slice(0, 5) : [],
    // storiesByTag: [{link:'/tecnologia/ciencias/un-entierro-en-los-andes-peruanos-muestra-que-las-mujeres-prehistoricas-tambien-cazaban-noticia/',title:'TECNOLOGIA'},
    // {link:'/politica/congreso/martin-vizcarra-manuel-merino-de-lama-congreso-no-adelanta-sesion-y-vacancia-se-vera-el-lunes-noticia/',title:'TITLO1'},
    // {link:'/economia/peru/ejecutivo-aprueba-norma-para-dar-garantias-a-majes-siguas-ii-cuando-podria-destrabarse-el-proyecto-en-el-sur-minagri-jorge-montenegro-noticia/',title:'TITLO2'}],
    storiesBySection: filterStories(sectionElements).slice(
      0,
      existTagStories ? 5 : 10
    ),
    storiesBySectionPremium: filterStories(sectionElementsPremium).slice(
      0,
      existTagStories ? 5 : 10
    ),
  }

  const stContinueScript = `"use strict";window.addEventListener("load",function(){requestIdle(function(){var n="_recent_articles_",i="<<recentStoriesrecentStoriesrecentStories>>",e=JSON.parse(window.sessionStorage.getItem(n))||{},t=document.getElementById("st-continue-0");window.dataLayer=window.dataLayer||[];window.addEventListener("message",function(e){var t=e.origin,i=e.source,n=e.data,o=void 0===n?{}:n;t===window.location.origin&&("story_iframe"===o.id?requestIdle(function(){var e,t=i.location.search.match(/story=([0-9]{1,2})/)||{},n=t&&t[1];!n||(e=document.getElementById("st-iframe-"+n)||{}).height!==o.storyHeight&&(e.height=o.storyHeight||e.height)}):"iframe_signwall"===o.id||"iframe_relogin"===o.id?window.location.href=o.redirectUrl:"iframe_paywall"===o.id?(document.getElementById("signwall-app").className="active-signwall",document.getElementsByTagName("body")[0].style.overflow="hidden"):"anchor-top"===o.id&&window.scrollTo(0,0))},!1),e.section&&window.sessionStorage.removeItem(n),function(e){void 0===e&&(e={});var t=e.section;e.data;window.sessionStorage.setItem(n,JSON.stringify({section:t,data:i.data}))}(i);var o,r,a,s=0,c=1,d=0,l=(JSON.parse(window.sessionStorage.getItem(n))||{}).data||{storiesByTag:[],storiesBySection:[],storiesBySectionPremium:[]},u=(a=!1,window.localStorage&&window.localStorage.hasOwnProperty("ArcId.USER_INFO")&&"{}"!==window.localStorage.getItem("ArcId.USER_INFO")&&(o=JSON.parse(window.localStorage.getItem("ArcId.USER_INFO")).uuid,(r=JSON.parse(window.localStorage.getItem("ArcP")||"{}")[o])&&r.sub.p.length&&(a=!0)),a?[].concat(l.storiesBySectionPremium,l.storiesByTag):[].concat(l.storiesByTag,l.storiesBySection));u.unshift({title:document.title,link:location.pathname});function g(){return location.href.includes("/pf")}function w(n){void 0===n&&(n=0),requestIdle(function(){var e,t;"IntersectionObserver"in window&&(e=null,n<=0?(e=document.getElementById("contenedor")).setAttribute("data-index",0):0<n&&(e=document.getElementById("st-iframe-"+n)),t=new IntersectionObserver(function(e){e.forEach(function(o){o.isIntersecting&&setTimeout(function(){var e,t,n,i=parseInt(o.target.dataset.index);s===i?(c=o.intersectionRatio,o.target.contentWindow&&(e=o.target.contentWindow.document.documentElement.offsetHeight+"px",o.target.height!==e&&(o.target.height=e))):o.intersectionRatio>c&&(s=i,c=o.intersectionRatio,t=u[s],n=s,document.title=t.title,history.pushState({story:n},t.title,g()?"/pf"+t.link:t.link))},1)})},{rootMargin:"0px",threshold:function(){for(var e=[],t=1;t<=50;t++){var n=t/50;e.push(n)}return e.push(0),e}()}),e&&t.observe(e))})}function m(n){var i=u[d+=1]||{};i.link&&(requestIdle(function(){var e=location.origin+"/carga-continua"+i.link+"?ref=nota&ft=cargacontinua&outputType=lite&story="+d,e=g()?e+"&_website=<<arcSite>>":e,t=document.createElement("iframe");t.src=e,t.width="100%",t.height="6000",t.id="st-iframe-"+d,t.className="st-iframe",t.frameborder="0",t.scrolling="no",t.setAttribute("data-index",d),n.insertAdjacentElement("afterEnd",t),w(d)}),requestIdle(function(){var e=document.createElement("div");e.id="st-continue-"+d,e.style.height="10px",document.getElementById("st-iframe-"+d).insertAdjacentElement("afterEnd",e),f(e)}))}/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test("undefined"!=typeof window?window.navigator.userAgent:"");var f=function(e){var t;"IntersectionObserver"in window?(t=new IntersectionObserver(function(e){e.forEach(function(e){e.isIntersecting&&(m(e.target),t.unobserve(e.target))})},{rootMargin:"0px 0px 1000px 0px"})).observe(e):window.addEventListener("scroll",function(){!function e(t){window.innerHeight+document.documentElement.scrollTop>=t.offsetTop-1e3&&window.removeEventListener("scroll",function(){e(t)}),m(t)}(e)})};f(t),w(0)})});`
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

      // No se usa { passive: true } por soporte de IE11
      window.addEventListener('scroll', setScrollLoaderPage)
      $anchor.addEventListener("click", () => {
        $anchor.className = $anchor.className.replace(" active", "")
        window.scrollTo(0,0)
      })
    })})
  */
  const anchorScript = `"use strict";window.addEventListener("load",function(){requestIdle(function(){var e=document.getElementById("anchor"),c=document.getElementById("st-continue-0").offsetTop,n=(document.documentElement.scrollHeight,window.innerHeight);window.addEventListener("scroll",function(){n+window.scrollY>=c?e.className.includes("active")||(e.className=e.className.concat(" active")):e.className.includes("active")&&n+window.scrollY<c&&(e.className=e.className.replace(" active",""))}),e.addEventListener("click",function(){e.className=e.className.replace(" active",""),window.scrollTo(0,0)})})});`

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
