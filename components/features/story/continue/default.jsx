import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import StoryData from '../../../utilities/story-data'

const classes = {
  storyContinue:
    'story-continue position-relative flex items-center justify-center pt-30 pb-30',
  storyLoad:
    'story-continue__story-load position-absolute flex items-center justify-center h-full',
  storyLoadLink:
    'story-continue__story-load-link flex items-center justify-center',
  storyLoadImage: 'story-continue__story-load-image position-absolute ',
  storyCircle: 'story-continue__circle position-relative rounded',
  storycounter: 'story-continue__counter position-absolute rounded',
  storyProgres: 'story-continue__progress',
  storyLoadNews: 'story-continue__story-load-news pl-30',
  storyLoadText: 'story-continue__story-load-text block text-gray-200',
  storyLoadTitle:
    'story-continue__story-load-title font-bold text-gray-200 overflow-hidden',
}

@Consumer
class StoryContinue extends PureComponent {
  componentDidMount() {
    window.addEventListener('scroll', this.setScrollLoaderPage)
    window.addEventListener('load', this.setInitialLoaderPage)
  }

  setScrollLoaderPage = () => {
    const max = 350
    const el = document.querySelector(`.story-continue__story-load`)
    const progress = el.querySelector(`.story-continue__progress`)
    const linker = el.querySelector(`.story-continue__story-load-link`)
    const html = document.documentElement

    if (window.innerHeight + window.scrollY >= html.scrollHeight) {
      // eslint-disable-next-line radix
      const cur = parseInt(progress.getAttribute('size'))

      const r = max - cur
      const t = r / 10
      for (let g = 0; g < t; g++) {
        let newer = cur + 10 * g + 10
        progress.setAttribute('style', `transform: rotate(${newer}deg)`)
        progress.setAttribute('size', newer)
        if (newer >= max) {
          this.setTimeoutLoadPage(linker)
        }
        newer = +1
      }
    } else {
      this.setUpdateLoaderPage(progress, el, linker)
    }
    this.setInitiateHeights(document.getElementsByClassName('nav__loader-bar'))
  }

  setInitiateHeights = e => {
    const html = document.documentElement

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

    if (height > 0) {
      e[0].style.width = `${(scrolled / (height - h)) * 100}%`
    } else e.style.width = '0%'
  }

  setTimeoutLoadPage = linker => {
    setTimeout(() => {
      const link = linker.getAttribute('href')
      if (link !== '') {
        window.location = link
      }
    }, 500)
  }

  setUpdateLoaderPage = progress => {
    const min = 180
    const max = 350

    let direction = 'down'
    const html = document.documentElement
    // eslint-disable-next-line radix
    const cur = parseInt(progress.getAttribute('size'))

    if (window.innerHeight + window.scrollY + 50 >= html.scrollHeight) {
      direction = 'down'
    } else {
      progress.setAttribute('style', `transform: rotate(${cur - 10}deg)`)
      progress.setAttribute('size', cur - 10)
      direction = 'up'
    }

    if (max >= cur && cur >= min) {
      let newer = 0
      if (direction === 'up') {
        const less = cur - 10
        if (less >= min) {
          newer = less
        } else {
          newer = cur
        }
      } else {
        newer = cur + 10
      }
      progress.setAttribute('style', `transform: rotate(${newer}deg)`)
      progress.setAttribute('size', newer)
    }
  }

  setInitialLoaderPage = () => {
    const min = 180
    const el = document.querySelector(`.${classes.storyLoad}`)
    const progress = el.querySelector(`.${classes.storyProgres}`)
    el.setAttribute('data-state', 'outviewport')
    progress.setAttribute('style', `transform: rotate(${min}deg)`)
    progress.setAttribute('size', min)
  }

  render() {
    const { contextPath, globalContent: data } = this.props
    const {
      recentList: [{ basic: title = '', websiteUrl = '' }],
    } = new StoryData({
      data,
      contextPath,
    })
    return (
      <>
        <div className={classes.storyContinue}>
          <div className={classes.storyLoad} data-state="outviewport">
            <a href={websiteUrl} className={classes.storyLoadLink}>
              <div className={classes.storyCircle}>
                <span className={classes.storyLoadImage} />
                <div className={classes.storycounter}> </div>
                <div className={classes.storyProgres} size="180" />
                <div className={classes.storyProgresEnd} />
              </div>
              <div className={classes.storyLoadNews}>
                <span className={classes.storyLoadText}>
                  Cargando siguiente
                </span>
                <span className={classes.storyLoadTitle}>{title}</span>
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
