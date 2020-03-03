import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import StoryData from '../../../utilities/story-data'
import ConfigParams from '../../../utilities/config-params'
import schemaFilter from '../../stories-lists/card/_dependencies/schema-filter'
import { getAssetsPath } from '../../../utilities/constants'

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
    const {
      globalContent: {
        taxonomy: { primary_section: { path = '' } = {} },
      },
      arcSite,
    } = this.props

    this.fetchContent({
      dataList: {
        source: 'story-feed-by-section',
        query: {
          section: path,
          stories_qty: 6,
          presets: 'no-presets',
          includedFields: `_id,headlines.basic,websites.${arcSite}.website_url,display_date,publish_date`,
        },
        filter: schemaFilter(arcSite),
      },
    })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.setScrollLoaderPage)
    window.addEventListener('DOMContentLoaded', this.setInitialLoaderPage)
  }

  setScrollLoaderPage = () => {
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
          this.setAttributeProgress(progress, newerProgress)
          if (newerProgress >= MAX_PROGRESS) {
            this.setTimeoutLoadPage(linker, html)
          }
          // newerProgress = +1
        }
      } else {
        this.setUpdateLoaderPage(progress, concurrentProgress)

        this.position = +1
      }
      this.setTitleHead()
      this.setInitiateHeights(
        document.getElementsByClassName('nav__loader-bar')
      )
    }
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
    const { arcSite } = this.props || {}
    const [loader] = document.getElementsByClassName('nav__loader')
    const height = Math.max(clientHeight, scrollHeight, offsetHeight)
    const h = window.innerHeight || clientHeight || bodyClientHeight
    const scrolled = Math.max(bodyScrollTop, scrollTop)

    if (height > 0 && progressBar) {
      const scale = Math.round((scrolled / (height - h)) * 100) / 100
      if (ConfigParams.SITE_ELCOMERCIO !== arcSite) {
        progressBar.style.transform = `scaleX(${scale})`
      }

      if (loader) loader.style.display = scale > 0.02 ? 'block' : 'none'
    }
  }

  setTitleHead = () => {
    const titleNew = document.querySelector('.story-header__news-title')
      .textContent
    document.querySelector('.nav__story-title').textContent = titleNew
  }

  setTimeoutLoadPage = (linker, html = '') => {
    const { arcSite } = this.props || {}
    const timeLoad = ConfigParams.SITE_OJO === arcSite ? 5000 : 250
    setTimeout(() => {
      const link = linker.getAttribute('href')
      if (
        link !== '' &&
        window.innerHeight + window.scrollY + 10 >= html.scrollHeight
      ) {
        window.location = link
      }
    }, timeLoad)
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
    const { arcSite } = this.props || {}

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

        if (window.scrollY < this.preview) {
          nav.classList.remove('active')
          navWrapper.classList.add('section-menu--active')
          navSidebar.classList.add('section-menu--active')
        } else {
          if (window.scrollY < 50) nav.classList.remove('active')
          else nav.classList.add('active')

          navWrapper.classList.remove('section-menu--active')
        }
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
      if (arcSite !== 'gestion') {
        navLogo.src = deployment(
          arcSite === 'publimetro'
            ? `${getAssetsPath(
                arcSite,
                contextPath
              )}/resources/dist/publimetro/images/green-logo.png`
            : `${getAssetsPath(
                arcSite,
                contextPath
              )}/resources/dist/${arcSite}/images/logo.png`
        )
      }
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
    const { siteProperties, deployment, contextPath, arcSite } =
      this.props || {}
    const { siteUrl } = siteProperties
    const { dataList: { content_elements: dataStorys = [] } = {} } = this.state

    const instance =
      dataStorys &&
      new StoryData({
        deployment,
        contextPath,
        arcSite,
        defaultImgSize: 'sm',
      })
    const recentStoryContinue = dataStorys.map(story => {
      instance.__data = story
      return {
        basic: instance.title,
        websiteUrl: instance.websiteLink,
      }
    })
    const { title, websiteUrl } = this.getNextArticle(
      recentStoryContinue,
      siteUrl
    )
    const isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
      // eslint-disable-next-line no-undef
      navigator && navigator.userAgent
    )

    const storyLoadAmp =
      arcSite === ConfigParams.SITE_ELCOMERCIO && isMobile
        ? '?ref=nota&ft=autoload&outputType=amp'
        : '?ref=nota&ft=autoload'

    return (
      <>
        <div className={classes.storyContinue}>
          <div className={classes.storyLoad} data-state="outviewport">
            <a
              href={`${websiteUrl}${storyLoadAmp}`}
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
