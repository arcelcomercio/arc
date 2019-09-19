import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import StoryData from '../../../utilities/story-data'

const classes = {
  storyContinue:
    'story-continue position-relative flex items-center justify-center pt-50 pb-50',
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
  constructor(props) {
    super(props)
    this.preview = 0
    this.position = 0
  }

  componentDidMount() {
    window.addEventListener('scroll', this.setScrollLoaderPage)
    window.addEventListener('DOMContentLoaded', this.setInitialLoaderPage)
  }

  setScrollLoaderPage = () => {
    const storyLoader = document.querySelector(`.story-continue__story-load`)
    const progress = storyLoader.querySelector(`.story-continue__progress`)
    const linker = storyLoader.querySelector(`.story-continue__story-load-link`)
    const html = document.documentElement
    const concurrentProgress = parseInt(progress.getAttribute('size'), 10)
    const { innerHeight, scrollY } = window

    if (innerHeight + scrollY >= html.scrollHeight) {
      const totalProgress = (MAX_PROGRESS - concurrentProgress) / 10
      for (let i = 0; i < totalProgress; i++) {
        let newerProgress = concurrentProgress + 10 * i + 10
        this.setAttributeProgress(progress, newerProgress)
        if (newerProgress >= MAX_PROGRESS) {
          this.setTimeoutLoadPage(linker, html)
        }
        newerProgress = +1
      }
    } else {
      this.setUpdateLoaderPage(progress, concurrentProgress)

      this.position = +1
    }
    this.setTitleHead()
    this.setInitiateHeights(document.getElementsByClassName('nav__loader-bar'))
  }

  setInitiateHeights = ([e] = []) => {
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
      progressBar.style.transform = `scaleX(${scale})`
      if (loader) loader.style.display = scale > 0.02 ? 'block' : 'none'
    }
  }

  setTitleHead = () => {
    const titleNew = document.querySelector('.story-header__news-title')
      .textContent
    document.querySelector('.nav__story-title').textContent = titleNew
  }

  setTimeoutLoadPage = (linker, html = '') => {
    setTimeout(() => {
      const link = linker.getAttribute('href')
      if (
        link !== '' &&
        window.innerHeight + window.scrollY >= html.scrollHeight
      ) {
        window.location = link
      }
    }, 5000)
  }

  setUpdateLoaderPage = (progress, concurrentProgress) => {
    const { scrollHeight } = document.documentElement
    const { innerHeight, scrollY, screen } = window
    let direction = 'down'
    if (innerHeight + scrollY + 50 <= scrollHeight) {
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

    if (screen.width < 630) {
      const storyHeader = document.querySelector('.story-header__list')
      const navSidebar = document.querySelector('.nav-sidebar')
      if (storyHeader) storyHeader.classList.add('hidden')
      const nav = document.querySelector('.nav')
      const navWrapper = document.querySelector('.nav__wrapper')

      if (scrollY < this.preview) {
        if (nav) nav.classList.remove('active')
        if (navWrapper) navWrapper.classList.add('somos-menu--active')
        if (navSidebar) navSidebar.classList.add('somos-menu--active')
      } else {
        if (scrollY < 50 && nav) nav.classList.remove('active')
        else if (nav) nav.classList.add('active')

        if (navWrapper) navWrapper.classList.remove('somos-menu--active')
      }

      this.preview = scrollY
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
    const navLogo = document.querySelector('.nav__logo')
    if (window.screen.width > 1023 && navLogo) {
      const { arcSite, contextPath, deployment } = this.props || {}
      navLogo.src = deployment(
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
      if (
        recentStoryContinue.length - 1 === i &&
        typeof window !== 'undefined'
      ) {
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
