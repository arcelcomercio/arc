import React from 'react'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import { removeLastSlash } from '../../../utilities/helpers'

import Footer from './_lite/_children/footer'

// Script
/* document.addEventListener('DOMContentLoaded', () => {
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
  if (document.querySelector('.h-basic__next')) {
    document.querySelector('.h-basic__next').addEventListener('click', () => {
      window.location.href = nextStoryObject.link || '/'
    })
  }

  const loadNextUrlStorage = () => {
    window.location.href = nextStoryObject.link || '/'
  }

  const stContinueFunc = () => {
    const progressBar = document.querySelector('.st-continue__progress')

    if (
      document.documentElement.offsetHeight -
        (window.innerHeight + document.documentElement.scrollTop) <=
      251
    ) {
      progressBar.style['stroke-dashoffset'] =
        (document.documentElement.offsetHeight -
          (window.innerHeight + document.documentElement.scrollTop)) *
        -1

      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        loadNextUrlStorage()
      }
    }
  }
  if ('IntersectionObserver' in window) {
    const sectionOneObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', stContinueFunc)
        } else {
          window.removeEventListener('scroll', stContinueFunc)
        }
      })
    })
    sectionOneObserver.observe(document.querySelector('.st-continue'))
  } else {
    window.addEventListener('scroll', stContinueFunc)
  }
}) */

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

  const stContinueScript = '"use strict";document.addEventListener("DOMContentLoaded",function(){var e="_recents_articles_",t=JSON.parse(window.sessionStorage.getItem(e))||{},n="<<recentStoriesrecentStoriesrecentStories>>",o=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.section,o=t.data,i=void 0===o?[]:o;window.sessionStorage.setItem(e,JSON.stringify({section:n,data:i.filter(function(e){return e.link!==window.location.pathname})}))};if(t.section)if(t.section!==n.section)window.sessionStorage.removeItem(e),o(n);else{var i=JSON.parse(window.sessionStorage.getItem(e));window.sessionStorage.removeItem(e),o(i)}else o(n);var r=((JSON.parse(window.sessionStorage.getItem(e))||{}).data||[])[0]||{};document.querySelector(".st-continue__title").innerHTML=r.title||"Portada",document.querySelector(".st-continue").href=r.link,document.querySelector(".h-basic__next")&&document.querySelector(".h-basic__next").addEventListener("click",function(){window.location.href=r.link||"/"});var s=function(){var e=document.querySelector(".st-continue__progress");document.documentElement.offsetHeight-(window.innerHeight+document.documentElement.scrollTop)<=251&&(e.style["stroke-dashoffset"]=-1*(document.documentElement.offsetHeight-(window.innerHeight+document.documentElement.scrollTop)),window.innerHeight+document.documentElement.scrollTop>=document.documentElement.offsetHeight&&(window.location.href=r.link||"/"))};"IntersectionObserver"in window?new IntersectionObserver(function(e){e.forEach(function(e){e.isIntersecting?window.addEventListener("scroll",s):window.removeEventListener("scroll",s)})}).observe(document.querySelector(".st-continue")):window.addEventListener("scroll",s)});'.replace(
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
      <a href="/" className="st-continue f just-center">
        <div className="st-continue__left f pos-rel">
          <svg
            className="st-continue__hourglass"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24">
            <path d="M6,2v6h0.01L6,8.01L10,12l-4,4l0.01,0.01H6V22h12v-5.99h-0.01L18,16l-4-4l4-3.99L17.99,8H18V2H6z M16,16.5V20H8v-3.5l4-4    L16,16.5z M12,11.5l-4-4V4h8v3.5L12,11.5z" />
          </svg>
          <svg
            className="st-continue__progress"
            width="86"
            height="86"
            viewBox="0 0 86 86"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M43 83C65.0914 83 83 65.0914 83 43C83 20.9086 65.0914 3 43 3C20.9086 3 3 20.9086 3 43C3 65.0914 20.9086 83 43 83Z"
              fill="white"
              stroke="#00AAFD"
              strokeWidth="6"
            />
          </svg>
        </div>
        <div className="st-continue__right f f-col just-center">
          <span className="st-continue__subtitle">Cargando siguiente...</span>
          <h3 className="st-continue__title oflow-h">Siguiente noticia</h3>
        </div>
      </a>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: stContinueScript,
        }}
      />
      <Footer />
    </>
  )
}

export default StoryContinueLite
