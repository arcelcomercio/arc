import React from 'react'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import { removeLastSlash } from '../../../utilities/parse/strings'

// Script

/* 
window.addEventListener('load', () => {requestIdle(() => {
  const URLS_STORAGE = '_recents_articles_'

  const localStories =
    JSON.parse(window.sessionStorage.getItem(URLS_STORAGE)) || {}
  const recentStories = '<<recentStoriesrecentStoriesrecentStories>>' || {}

  const setDataOnStorage = (dataTo = {}) => {
    const { section, data = [] } = dataTo
    window.sessionStorage.setItem(
      URLS_STORAGE,
      JSON.stringify({
        section,
        data: data.filter(({ link }) => link !== window.location.pathname),
      })
    )
  }

  if (localStories.section) {
    if (localStories.section !== recentStories.section) {
      window.sessionStorage.removeItem(URLS_STORAGE)
      setDataOnStorage(recentStories)
    } else {
      const currentLocal = JSON.parse(
        window.sessionStorage.getItem(URLS_STORAGE)
      )
      window.sessionStorage.removeItem(URLS_STORAGE)
      setDataOnStorage(currentLocal)
    }
  } else {
    setDataOnStorage(recentStories)
  }

  const nextStoryObject =
    ((JSON.parse(window.sessionStorage.getItem(URLS_STORAGE)) || {}).data ||
      [])[0] || {}
  document.querySelector('.st-continue__title').innerHTML =
    nextStoryObject.title || 'Portada'
  document.querySelector('.st-continue').href = nextStoryObject.link

  let requestStory;

  const loadNextUrlStorage = () => {
    requestStory = setTimeout(() => {
      window.location.href = nextStoryObject.link || '/'
    }, 1500)
    
  }

  const stContinueFunc = () => {
    const progressBar = document.querySelector('.st-continue__progress')
      if(progressBar.className.indexOf('loading') <= 0)
        progressBar.className = progressBar.className.concat(' loading')

      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      )
        loadNextUrlStorage()
  }

  if ('IntersectionObserver' in window) {
    const sectionOneObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        const $close = document.querySelector('.st-continue__close')
        if (entry.isIntersecting) {
          window.addEventListener('scroll', stContinueFunc)
          $close.addEventListener('click', () => {
            clearTimeout(requestStory)
            const progressBar = document.querySelector('.st-continue__progress')
            if(progressBar.className.indexOf('loading') > 0)
              progressBar.className = progressBar.className.replace(' loading', '')
          })
          sectionOneObserver.unobserve(entry.target)
        }
      })
    })
    sectionOneObserver.observe(document.querySelector('.st-continue'))
  } else {
    window.addEventListener('scroll', stContinueFunc)
  }
})}) 
*/

const StoryContinueLite = () => {
  const { globalContent, arcSite } = useFusionContext()
  const { taxonomy: { primary_section: { path = '' } = {} } = {} } =
    globalContent || {}

  const recentStories =
    useContent({
      source: 'story-feed-by-section',
      query: {
        section: removeLastSlash(path),
        stories_qty: 6,
        includedFields: `websites.${arcSite}.website_url,headlines.basic`,
      },
    }) || {}

  const { content_elements: contentElements = [] } = recentStories

  const stContinueScript = '"use strict";window.addEventListener("load",function(){requestIdle(function(){var e="_recents_articles_",t=JSON.parse(window.sessionStorage.getItem(e))||{},n="<<recentStoriesrecentStoriesrecentStories>>",o=function(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=t.section,o=t.data,i=void 0===o?[]:o;window.sessionStorage.setItem(e,JSON.stringify({section:n,data:i.filter(function(e){return e.link!==window.location.pathname})}))};if(t.section)if(t.section!==n.section)window.sessionStorage.removeItem(e),o(n);else{var i=JSON.parse(window.sessionStorage.getItem(e));window.sessionStorage.removeItem(e),o(i)}else o(n);var s=((JSON.parse(window.sessionStorage.getItem(e))||{}).data||[])[0]||{};document.querySelector(".st-continue__title").innerHTML=s.title||"Portada",document.querySelector(".st-continue").href=s.link;var r,c=void 0,a=function(){var e=document.querySelector(".st-continue__progress");e.className.indexOf("loading")<=0&&(e.className=e.className.concat(" loading")),window.innerHeight+document.documentElement.scrollTop>=document.documentElement.offsetHeight&&(c=setTimeout(function(){window.location.href=s.link||"/"},1500))};"IntersectionObserver"in window?(r=new IntersectionObserver(function(e){e.forEach(function(e){var t=document.querySelector(".st-continue__close");e.isIntersecting&&(window.addEventListener("scroll",a),t.addEventListener("click",function(){clearTimeout(c);var e=document.querySelector(".st-continue__progress");e.className.indexOf("loading")>0&&(e.className=e.className.replace(" loading",""))}),r.unobserve(e.target))})})).observe(document.querySelector(".st-continue")):window.addEventListener("scroll",a)})});'.replace(
    '"<<recentStoriesrecentStoriesrecentStories>>"',
    JSON.stringify({
      section: removeLastSlash(path),
      data: contentElements.map(
        ({
          websites: { [arcSite]: { website_url: websiteUrl = '' } = {} } = {},
          headlines: { basic = '' } = {},
        }) => ({ link: websiteUrl, title: basic })
      ),
    })
  )

  return (
    <>
      <div className="st-continue__progress-box f pos-rel">
        <div className="st-continue__progress"></div>
        <span className="st-continue__subtitle pos-abs">
          CARGANDO SIGUIENTE...
        </span>
        <svg
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          className="st-continue__close pos-abs"
          width="20"
          height="20"
          viewBox="0 0 46 46">
          <title>Cancelar carga de siguiente noticia</title>
          <path d="M23 3C11.9 3 2.9 12 2.9 23.1 2.9 34.2 11.9 43.2 23 43.2 34.1 43.2 43.1 34.2 43.1 23.1 43.1 12 34.1 3 23 3ZM32.7 29.9C32.9 30 32.9 30.2 32.9 30.4 32.9 30.6 32.9 30.8 32.7 30.9L30.8 32.8C30.6 33 30.5 33 30.3 33 30.1 33 29.9 33 29.8 32.8L23 26 16.2 32.8C16.1 33 15.9 33 15.7 33 15.5 33 15.4 33 15.2 32.8L13.3 30.9C13.1 30.8 13.1 30.6 13.1 30.4 13.1 30.2 13.1 30 13.3 29.9L20.1 23.1 13.3 16.3C13 16 13 15.6 13.3 15.3L15.2 13.4C15.3 13.2 15.5 13.1 15.7 13.1 15.9 13.1 16.1 13.2 16.2 13.4L23 20.1 29.8 13.4C29.9 13.2 30.1 13.1 30.3 13.1 30.5 13.1 30.7 13.2 30.8 13.4L32.8 15.3C33 15.6 33 16 32.8 16.3L25.9 23.1ZM32.7 29.9"></path>
        </svg>
      </div>
      <a href="/" className="st-continue">
        <h3 itemProp="name" className="st-continue__title oflow-h">
          Siguiente noticia
        </h3>
      </a>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: stContinueScript,
        }}
      />
    </>
  )
}
StoryContinueLite.static = true
export default StoryContinueLite
