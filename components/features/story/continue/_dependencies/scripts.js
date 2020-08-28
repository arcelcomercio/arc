/* requestIdle(() => {
  const getAssetsPath = (arcSite, contextPath) => {
    if (!contextPath) return '/pf'
    if (!arcSite) return contextPath

    let site = `${arcSite}.pe`
    if (arcSite === 'depor') site = `${arcSite}.com`
    if (arcSite === 'elcomerciomag') site = 'elcomercio.pe'
    if (arcSite === 'peru21g21') site = 'peru21.pe'

    return `https://cdna.${site}`
  }

  const arcSite = arcSiteToReplace
  const contextPath = '<<contextPath>>'
  const IS_BLOG =  isBlogToReplace
  const MAX_PROGRESS = 350
  const MIN_PROGRESS = 180
  const SITE_OJO = 'ojo'
  const SITE_ELCOMERCIO = 'elcomercio'
  const PATH_BLOG = '/blogs'

  const setAttributeProgress = (progress, value) => {
    progress.setAttribute('style', `transform: rotate(${value}deg)`)
    progress.setAttribute('size', value)
  }

  const setTimeoutLoadPage = (linker, html = '', isBlog) => {
    const timeLoad = SITE_OJO === arcSite ? 5000 : 250
    setTimeout(() => {
      const link = linker.getAttribute('href')
      if (
        link !== '' &&
        window.innerHeight + window.scrollY + 10 >= html.scrollHeight
      ) {
        const linkRedirect = isBlog ? PATH_BLOG : link
        window.location = linkRedirect
      }
    }, timeLoad)
  }

  const setUpdateLoaderPage = (progress, concurrentProgress) => {
    let preview = 0
    const { scrollHeight } = document.documentElement
    const { innerHeight, scrollY, screen } = window
    let direction = 'down'
    if (innerHeight + scrollY + 50 <= scrollHeight) {
      setAttributeProgress(progress, concurrentProgress - 10)
      direction = 'up'
    }

    if (
      MAX_PROGRESS >= concurrentProgress &&
      concurrentProgress >= MIN_PROGRESS
    ) {
      let newerProgress = concurrentProgress
      if (direction === 'up') {
        const less = concurrentProgress - 10
        if (less >= MIN_PROGRESS) {
          newerProgress = less
        }
      } else {
        newerProgress = concurrentProgress + 10
      }
      setAttributeProgress(progress, newerProgress)
    }

    if (screen.width < 630) {
      const storyHeader = document.querySelector('.story-header__list')
      if (storyHeader) storyHeader.classList.add('hidden')
      if (
        arcSite !== 'elcomercio' &&
        arcSite !== 'depor' &&
        arcSite !== 'elbocon'
      ) {
        const navSidebar = document.querySelector('.nav-sidebar')
        const nav = document.querySelector('.nav')
        const navWrapper = document.querySelector('.nav__wrapper')

        if (window.scrollY < preview) {
          nav.classList.remove('active')
          navWrapper.classList.add('section-menu--active')
          navSidebar.classList.add('section-menu--active')
        } else {
          if (window.scrollY < 50) nav.classList.remove('active')
          else nav.classList.add('active')

          navWrapper.classList.remove('section-menu--active')
        }
      }
      preview = scrollY
    }
  }

  const setTitleHead = () => {
    const titleNew = document.querySelector('.story-header__news-title')
      ? document.querySelector('.story-header__news-title').textContent
      : ''
    document.querySelector('.nav__story-title').textContent = titleNew
  }

  const setInitiateHeights = ([e] = []) => {
    const progressBar = e
    const {
      clientHeight,
      scrollHeight,
      offsetHeight,
      scrollTop,
    } = document.documentElement
    const {
      clientHeight: bodyClientHeight,
      scrollTop: bodyScrollTop,
    } = document.body
    const [loader] = document.getElementsByClassName('nav__loader')
    const height = Math.max(clientHeight, scrollHeight, offsetHeight)
    const h = window.innerHeight || clientHeight || bodyClientHeight
    const scrolled = Math.max(bodyScrollTop, scrollTop)

    if (height > 0 && progressBar) {
      const scale = Math.round((scrolled / (height - h)) * 100) / 100
      if (SITE_ELCOMERCIO !== arcSite) {
        progressBar.style.transform = `scaleX(${scale})`
      }

      if (loader) loader.style.display = scale > 0.02 ? 'block' : 'none'
    }
  }

  const setInitialLoaderPage = () => {
    requestIdle(() => {
      const storyLoader = document.querySelector(`.story-continue__story-load`)
      const progress = storyLoader.querySelector(`.story-continue__progress`)
      storyLoader.setAttribute('data-state', 'outviewport')

      const navLogo = document.querySelector('.nav__logo')
      if (window.screen.width > 1023 && navLogo) {
        if (arcSite !== 'gestion') {
          navLogo.src = `${getAssetsPath(
                  arcSite,
                  contextPath
                )}/resources/dist/${arcSite}/images/logo.png?d=1`
        }
      }

      setAttributeProgress(progress, MIN_PROGRESS)
    })
  }

  const setScrollLoaderPage = () => {
    const storyLoader = document.querySelector(`.story-continue__story-load`)
    const progress = storyLoader.querySelector(`.story-continue__progress`)
    const linker = storyLoader.querySelector(`.story-continue__story-load-link`)
    const signwall = document.querySelector('#signwall-app')
    const html = document.documentElement
    const concurrentProgress = parseInt(progress.getAttribute('size'), 10)
    const { innerHeight, scrollY } = window

    if (!signwall) {
      if (innerHeight + scrollY + 10 >= html.scrollHeight) {
        const totalProgress = (MAX_PROGRESS - concurrentProgress) / 10 + 1
        for (let i = 0; i < totalProgress; i++) {
          const newerProgress = concurrentProgress + 10 * i + 10
          setAttributeProgress(progress, newerProgress)
          if (newerProgress >= MAX_PROGRESS) {
            setTimeoutLoadPage(linker, html, IS_BLOG)
          }
        }
      } else {
        setUpdateLoaderPage(progress, concurrentProgress)
      }
      setTitleHead()
      setInitiateHeights(document.getElementsByClassName('nav__loader-bar'))
    }
  }

  window.addEventListener('scroll', setScrollLoaderPage)
  window.addEventListener('DOMContentLoaded', setInitialLoaderPage)
}) */

// ////////////////////////////////////////////////////////////////////////////

export const storyContinueScript = (arcSite, contextPath, isBlog) =>
  '"use strict";equestIdle(function(){var e=arcSiteToReplace,t=isBlogToReplace,o=function(e,t){e.setAttribute("style","transform: rotate("+t+"deg)"),e.setAttribute("size",t)},r=function(t,o,r){void 0===o&&(o=""),setTimeout(function(){var e=t.getAttribute("href");if(""!==e&&window.innerHeight+window.scrollY+10>=o.scrollHeight){var n=r?"/blogs":e;window.location=n}},"ojo"===e?5e3:250)};window.addEventListener("scroll",function(){var n,i=document.querySelector(".story-continue__story-load"),c=i.querySelector(".story-continue__progress"),s=i.querySelector(".story-continue__story-load-link"),l=document.querySelector("#signwall-app"),a=document.documentElement,d=parseInt(c.getAttribute("size"),10),u=window,m=u.innerHeight,v=u.scrollY;if(!l){if(m+v+10>=a.scrollHeight)for(var y=(350-d)/10+1,w=0;w<y;w++){var g=d+10*w+10;o(c,g),g>=350&&r(s,a,t)}else!function(t,r){var n=0,i=document.documentElement.scrollHeight,c=window,s=c.innerHeight,l=c.scrollY,a=c.screen,d="down";if(s+l+50<=i&&(o(t,r-10),d="up"),350>=r&&r>=180){var u=r;if("up"===d){var m=r-10;m>=180&&(u=m)}else u=r+10;o(t,u)}if(a.width<630){var v=document.querySelector(".story-header__list");if(v&&v.classList.add("hidden"),"elcomercio"!==e&&"depor"!==e&&"elbocon"!==e){var y=document.querySelector(".nav-sidebar"),w=document.querySelector(".nav"),g=document.querySelector(".nav__wrapper");window.scrollY<n?(w.classList.remove("active"),g.classList.add("section-menu--active"),y.classList.add("section-menu--active")):(window.scrollY<50?w.classList.remove("active"):w.classList.add("active"),g.classList.remove("section-menu--active"))}n=l}}(c,d);n=document.querySelector(".story-header__news-title")?document.querySelector(".story-header__news-title").textContent:"",document.querySelector(".nav__story-title").textContent=n,function(t){var o=(void 0===t?[]:t)[0],r=document.documentElement,n=r.clientHeight,i=r.scrollHeight,c=r.offsetHeight,s=r.scrollTop,l=document.body,a=l.clientHeight,d=l.scrollTop,u=document.getElementsByClassName("nav__loader")[0],m=Math.max(n,i,c),v=window.innerHeight||n||a,y=Math.max(d,s);if(m>0&&o){var w=Math.round(y/(m-v)*100)/100;"elcomercio"!==e&&(o.style.transform="scaleX("+w+")"),u&&(u.style.display=w>.02?"block":"none")}}(document.getElementsByClassName("nav__loader-bar"))}}),window.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var t=document.querySelector(".story-continue__story-load"),r=t.querySelector(".story-continue__progress");t.setAttribute("data-state","outviewport");var n=document.querySelector(".nav__logo");window.screen.width>1023&&n&&"gestion"!==e&&(n.src=function(e,t){if(!t)return"/pf";if(!e)return t;var o=e+".pe";return"depor"===e&&(o=e+".com"),"elcomerciomag"===e&&(o="elcomercio.pe"),"peru21g21"===e&&(o="peru21.pe"),"https://cdna."+o}(e,"<<contextPath>>")+"/resources/dist/"+e+"/images/logo.png?d=1"),o(r,180)})})});'
    .replace('arcSiteToReplace', `"${arcSite}"`)
    .replace('<<contextPath>>', contextPath)
    .replace('isBlogToReplace', isBlog)

// ////////////////////////////////////////////////////////////////////////////

/* 
document.addEventListener('DOMContentLoaded', () => {
  requestIdle(() => {
    const IS_BLOG = isBLog
    const URLS_STORAGE = '_recents_articles_'
    const PATH_BLOG = '/blogs'

    const saveUrlSessionStorage = url => {
      let isUrlSaved = false
      if (typeof Storage !== 'undefined') {
        let arrUrls = [url]
        const existArrUrls = window.sessionStorage.getItem(URLS_STORAGE)
        if (existArrUrls) {
          arrUrls = JSON.parse(existArrUrls)
          if (arrUrls.indexOf(url) === -1) {
            arrUrls.push(url)
            isUrlSaved = true
          }
        }
        window.sessionStorage.setItem(URLS_STORAGE, JSON.stringify(arrUrls))
      }
      return isUrlSaved
    }

    const getNextArticle = (recentStoryContinue, siteUrl = '') => {
      let title = ''
      let websiteUrl = ''
      for (let i = 0; i < recentStoryContinue.length; i++) {
        title = recentStoryContinue[i].basic || ''
        websiteUrl = recentStoryContinue[i].websiteUrl || ''
        if (
          recentStoryContinue.length - 1 === i &&
          typeof window !== 'undefined'
        ) {
          window.sessionStorage.removeItem(URLS_STORAGE)
        }
        if (saveUrlSessionStorage(`${siteUrl}${websiteUrl}`)) {
          break
        }
      }
      return { title, websiteUrl }
    }

    const { title, websiteUrl } = getNextArticle(
      '<<recentStoryContinue>>',
      '<<siteUrl>>'
    )

    const isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
      typeof window !== 'undefined' ? window.navigator.userAgent : ''
    )

    const storyLoadAmp = arcSite =>
      arcSite === 'elcomercio' && isMobile
        ? '?ref=nota&ft=autoload&outputType=amp'
        : '?ref=nota&ft=autoload'

    const titleRedirect = IS_BLOG ? 'Cargando a la sección de Blogs' : title
    const websiteUrlRedirect = IS_BLOG
      ? PATH_BLOG
      : `${websiteUrl}${storyLoadAmp('<<arcSite>>')}`

    document.querySelector(
      '.story-continue__story-load-link'
    ).href = websiteUrlRedirect
    document.querySelector('.story-continue__story-load-title').innerHTML = titleRedirect
  })
}) */

// ////////////////////////////////////////////////////////////////////////////////7

export const sessionStorageScript = (
  recentStoryContinue,
  siteUrl,
  arcSite,
  isBlog
) =>
  '"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=isBLog,t=function(e){var t=!1;if("undefined"!=typeof Storage){var n=[e],o=window.sessionStorage.getItem("_recents_articles_");o&&-1===(n=JSON.parse(o)).indexOf(e)&&(n.push(e),t=!0),window.sessionStorage.setItem("_recents_articles_",JSON.stringify(n))}return t},n=function(e,n){void 0===n&&(n="");for(var o="",i="",r=0;r<e.length&&(o=e[r].basic||"",i=e[r].websiteUrl||"",e.length-1===r&&"undefined"!=typeof window&&window.sessionStorage.removeItem("_recents_articles_"),!t(""+n+i));r++);return{title:o,websiteUrl:i}}("<<recentStoryContinue>>","<<siteUrl>>"),o=n.title,i=n.websiteUrl,r=/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test("undefined"!=typeof window?window.navigator.userAgent:""),s=e?"Cargando a la sección de Blogs":o,a=e?"/blogs":i+("elcomercio"==="<<arcSite>>"&&r?"?ref=nota&ft=autoload&outputType=amp":"?ref=nota&ft=autoload");document.querySelector(".story-continue__story-load-link").href=a,document.querySelector(".story-continue__story-load-title").innerHTML=s})});'
    .replace('"<<recentStoryContinue>>"', JSON.stringify(recentStoryContinue))
    .replace('<<siteUrl>>', siteUrl)
    .replace('<<arcSite>>', arcSite)
    .replace('isBLog', isBlog)
