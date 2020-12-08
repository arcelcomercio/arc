/* 
window.addEventListener('load', () => {requestIdle(() => {
  const URLS_STORAGE = "_recent_articles_"
  const arcSite = "<<arcSite>>" 
  const recentStories = "<<recentStoriesrecentStoriesrecentStories>>" || {}
  const sessionStories =
    JSON.parse(window.sessionStorage.getItem(URLS_STORAGE)) || {}
  const initialPointer = document.getElementById('st-continue-0')
  const removeTaboola = document.location.search.includes('widgettaboola=none')

  window.dataLayer = window.dataLayer || [];
  window.ga = window.ga || function(){ (ga.q = ga.q || []).push(arguments) };
  ga.l=+new Date;
  ga('create', '${idGoogleAnalitics}', 'auto');

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

  const Taggeo = acc => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      const dataPush = {
        event: 'tag_signwall',
        eventCategory: 'Web_Paywall_Hard',
        eventAction: acc,
      }
      window.dataLayer.push(dataPush)
      if (arcEnv === 'sandbox') {
        window.console.log(dataPush)
      }
    }
  }

  const paywallClickHandlers = () => {
    const btnClosePaywall = document.getElementById('btn-close-paywall')
    const btnPlanesPaywall = document.getElementById('btn-ver-planes')
    if(btnClosePaywall) {
      btnClosePaywall.onclick = () => {
        Taggeo('web_paywall_cerrar')
        window.location.href = `/?signwallPaywall=1&ref=${window.location.pathname}`
      }
    }
    if(btnPlanesPaywall) {
      btnPlanesPaywall.onclick = () => {
        Taggeo('web_paywall_boton_ver_planes')
        window.sessionStorage.setItem('paywall_type_modal', 'paywall')
        window.sessionStorage.setItem(
          'paywall_last_url',
          window.location.pathname
        )
        window.location.href = arcEnv === 'prod'
          ? `/suscripcionesdigitales/`
          : `/pf/suscripcionesdigitales/?_website=${arcSite}&outputType=subscriptions`
      }
    }
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
        const pointer = document.getElementById("st-continue-" + storyCounter)
        if(pointer) pointer.remove()
        const signwall = document.getElementById("signwall-app")
        signwall.className = "active-signwall"
        const bodyTags = document.getElementsByTagName("body")
        bodyTags[0].style.overflow = "hidden"
        paywallClickHandlers()
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
      if(COUNT_USER && COUNT_USER.sub.p.length)  { isPremium = true }
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
        const noTaboola = removeTaboola ? "&widgettaboola=none" : ""
        let nextUrl = location.origin + "/carga-continua" + nextStory.link + "?ref=nota&ft=cargacontinua" + noTaboola + "&outputType=lite&nota=" + storyCounter
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
        ga('set', 'page', nextStory.link + "?ref=nota&ft=cargacontinua&nota=" + storyCounter);
        ga('send', 'pageview');

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

  setTimeout(() => {
    const contentTier = document.head.querySelector('meta[property="article:content_tier"]')
    if(window.showArcP && contentTier && contentTier.getAttribute('content') === "locked") {
      return;
    } else {
      iframeObserver(initialPointer)
      storiesListObserver(0)
    }
  }, 1)
})})
*/
export const stContinueScript = idGoogleAnalitics =>
  `"use strict";window.addEventListener("load",function(){requestIdle(function(){var e="<<recentStoriesrecentStoriesrecentStories>>",t=JSON.parse(window.sessionStorage.getItem("_recent_articles_"))||{},n=document.getElementById("st-continue-0"),o=document.location.search.includes("widgettaboola=none");window.dataLayer=window.dataLayer||[],window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)},ga.l=+new Date,ga("create","${idGoogleAnalitics}","auto");var i=function(e){if("undefined"!=typeof window){window.dataLayer=window.dataLayer||[];var t={event:"tag_signwall",eventCategory:"Web_Paywall_Hard",eventAction:e};window.dataLayer.push(t),"sandbox"===arcEnv&&window.console.log(t)}};window.addEventListener("message",function(e){var t,n,o=e.origin,a=e.source,r=e.data,c=void 0===r?{}:r;if(o===window.location.origin)if("story_iframe"===c.id)requestIdle(function(){var e=a.location.search.match(/story=([0-9]{1,2})/)||{},t=e&&e[1];if(t){var n=document.getElementById("st-iframe-"+t)||{};n.height!==c.storyHeight&&(n.height=c.storyHeight||n.height)}});else if("iframe_signwall"===c.id||"iframe_relogin"===c.id)window.location.href=c.redirectUrl;else if("iframe_paywall"===c.id){var d=document.getElementById("st-continue-"+s);d&&d.remove(),document.getElementById("signwall-app").className="active-signwall",document.getElementsByTagName("body")[0].style.overflow="hidden",t=document.getElementById("btn-close-paywall"),n=document.getElementById("btn-ver-planes"),t&&(t.onclick=function(){i("web_paywall_cerrar"),window.location.href="/?signwallPaywall=1&ref="+window.location.pathname}),n&&(n.onclick=function(){i("web_paywall_boton_ver_planes"),window.sessionStorage.setItem("paywall_type_modal","paywall"),window.sessionStorage.setItem("paywall_last_url",window.location.pathname),window.location.href="prod"===arcEnv?"/suscripcionesdigitales/":"/pf/suscripcionesdigitales/?_website=<<arcSite>>&outputType=subscriptions"})}else"anchor-top"===c.id&&window.scrollTo(0,0)},!1),t.section&&window.sessionStorage.removeItem("_recent_articles_"),function(t){void 0===t&&(t={});var n=t,o=n.section;n.data;window.sessionStorage.setItem("_recent_articles_",JSON.stringify({section:o,data:e.data}))}(e);var a=0,r=1,s=0,c=(JSON.parse(window.sessionStorage.getItem("_recent_articles_"))||{}).data||{storiesByTag:[],storiesBySection:[],storiesBySectionPremium:[]},d=function(){var e=!1;if(window.localStorage&&window.localStorage.hasOwnProperty("ArcId.USER_INFO")&&"{}"!==window.localStorage.getItem("ArcId.USER_INFO")){var t=JSON.parse(window.localStorage.getItem("ArcId.USER_INFO")).uuid,n=JSON.parse(window.localStorage.getItem("ArcP")||"{}")[t];n&&n.sub.p.length&&(e=!0)}return e}()?[].concat(c.storiesBySectionPremium,c.storiesByTag):[].concat(c.storiesByTag,c.storiesBySection);d.unshift({title:document.title,link:location.pathname});var l=function(){return location.href.includes("/pf")},w=function(e){void 0===e&&(e=0),requestIdle(function(){if("IntersectionObserver"in window){var t=null;e<=0?(t=document.getElementById("contenedor")).setAttribute("data-index",0):e>0&&(t=document.getElementById("st-iframe-"+e));var n=new IntersectionObserver(function(e){e.forEach(function(e){e.isIntersecting&&setTimeout(function(){var t,n,o=parseInt(e.target.dataset.index);if(a===o){if(r=e.intersectionRatio,e.target.contentWindow){var i=e.target.contentWindow.document.documentElement.offsetHeight+"px";e.target.height!==i&&(e.target.height=i)}}else e.intersectionRatio>r&&(a=o,r=e.intersectionRatio,t=d[a],n=a,document.title=t.title,history.pushState({story:n},t.title,l()?"/pf"+t.link:t.link))},1)})},{rootMargin:"0px",threshold:function(){for(var e=[],t=1;t<=50;t++){var n=t/50;e.push(n)}return e.push(0),e}()});t&&n.observe(t)}})},u=(/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test("undefined"!=typeof window?window.navigator.userAgent:""),function(e){var t=d[s+=1]||{};t.link&&(requestIdle(function(){var n=o?"&widgettaboola=none":"",i=location.origin+"/carga-continua"+t.link+"?ref=nota&ft=cargacontinua"+n+"&outputType=lite&nota="+s;i=l()?i+"&_website=<<arcSite>>":i;var a=document.createElement("iframe");a.src=i,a.width="100%",a.height="6000",a.id="st-iframe-"+s,a.className="st-iframe",a.frameborder="0",a.scrolling="no",a.setAttribute("data-index",s),e.insertAdjacentElement("afterEnd",a),ga("set","page",t.link+"?ref=nota&ft=cargacontinua&nota="+s),ga("send","pageview"),w(s)}),requestIdle(function(){var e=document.createElement("div");e.id="st-continue-"+s,e.style.height="10px",document.getElementById("st-iframe-"+s).insertAdjacentElement("afterEnd",e),g(e)}))}),g=function(e){if("IntersectionObserver"in window){var t=new IntersectionObserver(function(e){e.forEach(function(e){e.isIntersecting&&(u(e.target),t.unobserve(e.target))})},{rootMargin:"0px 0px 1000px 0px"});t.observe(e)}else window.addEventListener("scroll",function(){!function e(t){window.innerHeight+document.documentElement.scrollTop>=t.offsetTop-1e3&&window.removeEventListener("scroll",function(){e(t)}),u(t)}(e)})};setTimeout(function(){var e=document.head.querySelector('meta[property="article:content_tier"]');window.showArcP&&e&&"locked"===e.getAttribute("content")||(g(n),w(0))},1)})});`

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
export const anchorScript = `"use strict";window.addEventListener("load",function(){requestIdle(function(){var e=document.getElementById("anchor"),c=document.getElementById("st-continue-0").offsetTop,n=(document.documentElement.scrollHeight,window.innerHeight);window.addEventListener("scroll",function(){n+window.scrollY>=c?e.className.includes("active")||(e.className=e.className.concat(" active")):e.className.includes("active")&&n+window.scrollY<c&&(e.className=e.className.replace(" active",""))}),e.addEventListener("click",function(){e.className=e.className.replace(" active",""),window.scrollTo(0,0)})})});`
