import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import StoryData from '../../../utilities/story-data'

const classes = {
  storyContinue:
    'story-continue position-relative flex items-center justify-center pt-30 pb-40',
  storyLoad:
    'story-continue__story-load position-absolute flex items-center justify-center h-full',
  storyLoadLink:
    'story-continue__story-load-link flex items-center justify-center',
  storyLoadImage: 'story-continue__story-load-image position-absolute ',
  storyCircle: 'story-continue__circle position-relative rounded',
  storycounter: 'story-continue__counter position-absolute rounded',
  storyProgres: 'story-continue__progress',
  storyLoadNews: 'story-continue__story-load-news pl-30',
  storyLoadText: 'story-continue__story-load-text block text-gray-200 pb-5',
  storyLoadTitle:
    'story-continue__story-load-title font-bold text-gray-300 overflow-hidden',
}

const URLS_STORAGE = '_recents_articles_'
const MAX_PROGRESS = 350
const MIN_PROGRESS = 180
@Consumer
class StoryContinue extends PureComponent {
  componentDidMount() {
    window.addEventListener('scroll', this.setScrollLoaderPage)
    window.addEventListener('load', this.setInitialLoaderPage)
  }

  setScrollLoaderPage = () => {
    const storyLoader = document.querySelector(`.story-continue__story-load`)
    const progress = storyLoader.querySelector(`.story-continue__progress`)
    const linker = storyLoader.querySelector(`.story-continue__story-load-link`)
    const html = document.documentElement
    const concurrentProgress = parseInt(progress.getAttribute('size'), 10)

    if (window.innerHeight + window.scrollY >= html.scrollHeight) {
      const totalProgress = (MAX_PROGRESS - concurrentProgress) / 10
      for (let i = 0; i < totalProgress; i++) {
        let newerProgress = concurrentProgress + 10 * i + 10
        this.setAttributeProgress(progress, newerProgress)
        if (newerProgress >= MAX_PROGRESS) {
          this.setTimeoutLoadPage(linker)
        }
        newerProgress = +1
      }
    } else {
      this.setUpdateLoaderPage(progress, concurrentProgress)
    }
    this.setInitiateHeights(document.getElementsByClassName('nav__loader-bar'))
    this.setTitleHead()
  }

  setInitiateHeights = e => {
    const html = document.documentElement
    const loader = document.getElementsByClassName('nav__loader')
    const height = Math.max(
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    )
    const h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight

    const scrolled = Math.max(
      document.body.scrollTop,
      document.documentElement.scrollTop
    )

    if (height > 0 && e[0]) {
      const width = (scrolled / (height - h)) * 100
      const round = Math.round(width)
      e[0].style.width = `${width}%`
      loader[0].style.display = round > 2 ? 'block' : 'none'
    }
  }

  setTitleHead = () => {
    const titleNew = document.querySelector('.story-header__news-title')
      .textContent
    document.querySelector('.nav__story-title').textContent = titleNew
  }

  setTimeoutLoadPage = linker => {
    setTimeout(() => {
      const link = linker.getAttribute('href')
      if (link !== '') {
        window.location = link
      }
    }, 1000)
  }

  setUpdateLoaderPage = (progress, concurrentProgress) => {
    const html = document.documentElement
    let direction = 'down'
    if (window.innerHeight + window.scrollY + 50 <= html.scrollHeight) {
      this.setAttributeProgress(progress, concurrentProgress - 10)
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
      this.setAttributeProgress(progress, newerProgress)
    }
  }

  setInitialLoaderPage = () => {
    const storyLoader = document.querySelector(`.story-continue__story-load`)
    const progress = storyLoader.querySelector(`.story-continue__progress`)
    storyLoader.setAttribute('data-state', 'outviewport')
    // TODO: retirar despues del 15 de agosto
    /**
     * Esto cambia el logo de la barra de navegación cuando estás viendo una noticia,
     * es necesario porque por ahora el color es distinto.
     */
    if (window.screen.width > 1023) {
      const { arcSite, contextPath, deployment } = this.props || {}
      document.querySelector('.nav__logo').src = deployment(
        arcSite === 'publimetro'
          ? `${contextPath}/resources/dist/publimetro/images/green-logo.png`
          : `${contextPath}/resources/dist/${arcSite}/images/logo.png`
      )
    }
    // TODO: finnnn
    this.setAttributeProgress(progress, MIN_PROGRESS)
  }

  setAttributeProgress = (progress, value) => {
    progress.setAttribute('style', `transform: rotate(${value}deg)`)
    progress.setAttribute('size', value)
  }

  saveUrlSessionStorage = url => {
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

  getNextArticle = (recentStoryContinue, siteUrl = '') => {
    let title = ''
    let websiteUrl = ''
    for (let i = 0; i < recentStoryContinue.length; i++) {
      title = recentStoryContinue[i].basic || ''
      websiteUrl = recentStoryContinue[i].websiteUrl || ''
      if (recentStoryContinue.length - 1 === i) {
        window.sessionStorage.removeItem(URLS_STORAGE)
      }
      if (this.saveUrlSessionStorage(`${siteUrl}${websiteUrl}`)) {
        break
      }
    }
    return { title, websiteUrl }
  }

  render() {
    const { contextPath, globalContent: data, siteProperties } =
      this.props || {}
    const { siteUrl } = siteProperties
    const { recentStoryContinue = [] } = new StoryData({ data, contextPath })
    const { title, websiteUrl } = this.getNextArticle(
      recentStoryContinue,
      siteUrl
    )
    return (
      <>
        <div className={classes.storyContinue}>
          <div className={classes.storyLoad} data-state="outviewport">
            <a
              href={`${websiteUrl}?ref=nota&ft=autoload`}
              className={classes.storyLoadLink}>
              <div className={classes.storyCircle}>
                <span className={classes.storyLoadImage} />
                <div className={classes.storycounter}> </div>
                <div
                  role="progressbar"
                  className={classes.storyProgres}
                  size="180"
                />
                <div className={classes.storyProgresEnd} />
              </div>
              <div className={classes.storyLoadNews}>
                <span className={classes.storyLoadText}>
                  Cargando siguiente...
                </span>
                <h3 className={classes.storyLoadTitle}>{title}</h3>
              </div>
            </a>
          </div>
        </div>
      </>
    )
  }
}

StoryContinue.label = 'Artículo - Siguiente'

export default StoryContinue
