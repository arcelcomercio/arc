import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import {
  popUpWindow,
  socialMediaUrlShareList,
} from '../../../../utilities/helpers'
import UtilListKey from '../../../../utilities/list-keys'

const classes = {
  news:
    'story-content__icon-list no-mobile non-tablet md:pt-20 md:pb-0 md:pr-20',
  list: 'story-content__list',
  item: 'story-content__item mb-20 position-relative',
  link: 'story-content__link text-gray-200',
  more:
    'story-content__list-more bg-white position-absolute flex hidden top-0 justify-between p-10',
  moreList: 'story-content__list',
  moreItem: 'story-content__item',
  icon: 'title-md',
  moreLink: 'story-content__more-link',
  mobileClass: 'flex justify-center',
  iconPrint: 'icon-print story-content__icon title-xl',
  iconZoom: 'icon-zoom story-content__icon title-xl',
  iconLink: 'icon-link story-content__icon title-xl',
  iconTwitter: 'icon-twitter-circle',
  iconFacebook: 'icon-facebook-circle',
}
@Consumer
class StoryContentChildIcon extends PureComponent {
  constructor(props) {
    super(props)
    this.firstList = 'firstList'
    this.currIncrementIndex = 1
    this.secondList = 'secondList'
    this.state = {
      currentList: this.firstList,
      currIncrementIndex: this.currIncrementIndex,
    }
    const {
      siteProperties: {
        social: {
          twitter: { user: siteNameRedSocial },
        },
        siteUrl,
      },
      globalContent: {
        website_url: postPermaLink,
        headlines: { basic: postTitle } = {},
      },
    } = props

    const urlsShareList = socialMediaUrlShareList(
      siteUrl,
      postPermaLink,
      postTitle,
      siteNameRedSocial
    )

    this.shareButtons = {
      [this.firstList]: [
        {
          icon: classes.iconPrint,
          link: '',
          mobileClass: '',
        },

        /* TODO: se retira por fata de definicion
        {
          icon: 'icon-message story-content__icon title-xl',
          link: '',
          mobileClass: '',
        }, */
        {
          icon: classes.iconLink,
          link: '',
          mobileClass: '',
          more: [
            {
              icon: classes.iconFacebook,
              link: urlsShareList.facebook,
              mobileClass: classes.mobileClass,
            },
            {
              icon: classes.iconTwitter,
              link: urlsShareList.twitter,
              mobileClass: classes.mobileClass,
            },
          ],
        },
        {
          icon: classes.iconZoom,
          link: '',
          mobileClass: '',
        },
      ],
    }
  }

  openLink = (event, item, print) => {
    event.preventDefault()
    if (print === 0) window.print()
    if (print === 2) this.zoomIn(event)
    if (print === 1) this.moreList(event)
    if (print === true) popUpWindow(item.link, '', 600, 400)
  }

  moreList = () => {
    const el = document.querySelector('.story-content__list-more')
    if (el.classList.contains('block')) {
      el.classList.remove('block')
      el.classList.add('hidden')
    } else {
      el.classList.remove('hidden')
      el.classList.add('block')
    }
  }

  zoomIn = () => {
    let { currIncrementIndex = 0 } = this.state
    const resizeableElements = document.querySelectorAll(
      '.story-content__font--secondary'
    )

    if (currIncrementIndex >= 9) {
      currIncrementIndex = 1
      this.setState({
        currIncrementIndex: 1,
      })
    }

    currIncrementIndex += currIncrementIndex
    this.setState({
      currIncrementIndex,
    })
    resizeableElements.forEach(elm => {
      const currSize =
        currIncrementIndex >= 9 ? parseFloat(elm.style.fontSize, 5) || 20 : 20
      // eslint-disable-next-line no-param-reassign
      elm.style = `font-size:${currSize + currIncrementIndex}px`
    })
  }

  render() {
    const { currentList } = this.state

    return (
      <>
        <div className={classes.news}>
          <ul className={classes.list}>
            {this.shareButtons[currentList].map((item, i) => (
              <li
                key={UtilListKey(i)}
                className={` ${classes.item} ${item.mobileClass}`}>
                <a
                  className={classes.link}
                  href={item.link}
                  onClick={event => {
                    this.openLink(event, item, i)
                  }}>
                  <i className={item.icon} />
                </a>
                {item.more && (
                  <ul className={classes.more}>
                    {item.more.map((element, ii) => (
                      <li
                        key={UtilListKey(ii)}
                        className={` ${classes.moreItem} ${element.mobileClass}`}>
                        <a
                          className={classes.moreLink}
                          href={element.link}
                          onClick={event => {
                            const isPrint = true
                            this.openLink(event, element, isPrint)
                          }}>
                          <i className={`${element.icon} ${classes.icon}`} />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default StoryContentChildIcon
