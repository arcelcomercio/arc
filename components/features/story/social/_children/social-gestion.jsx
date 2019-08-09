import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import {
  popUpWindow,
  socialMediaUrlShareList,
  addSlashToEnd,
} from '../../../../utilities/helpers'

const classes = {
  header: 'post-header bg-white p-20 lg:pr-0 lg:pl-0',
  title:
    'post-header__title primary-font font-thin mb-25 title-md text-gray-300 line-h-xs',
  list: 'post-header__list flex',
  link: 'post-header__link flex items-center justify-center w-full h-full',
  item: 'post-header__item bg-base-100 flex-grow',
  share: 'post-header__share hidden ml-10 text-sm md:inline-block',
  more: 'post-header__more bg-base-200',
  button:
    'post-header__button flex items-center justify-center w-full h-full text-white',
}
@Consumer
class StoryHeaderChildSocialGestion extends PureComponent {
  constructor(props) {
    super(props)
    this.firstList = 'firstList'
    this.secondList = 'secondList'
    this.state = {
      currentList: this.firstList,
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
      addSlashToEnd(siteUrl),
      postPermaLink,
      postTitle,
      siteNameRedSocial
    )
    this.shareButtons = {
      [this.firstList]: [
        {
          icon: 'icon-linkedin',
          link: urlsShareList.linkedin,
        },
        {
          icon: 'icon-facebook',
          link: urlsShareList.facebook,
        },
        {
          icon: 'icon-twitter',
          link: urlsShareList.twitter,
          mobileClass: 'no-mobile',
        },
        {
          icon: 'icon-whatsapp',
          link: urlsShareList.whatsapp,
          mobileClass: 'no-desktop',
        },
      ],
      [this.secondList]: [
        {
          icon: 'icon-twitter',
          link: urlsShareList.twitter,
          mobileClass: 'no-desktop',
        },
        {
          icon: 'icon-print',
          link: '',
        },
      ],
    }
  }

  handleMoreButton = () => {
    const { currentList } = this.state
    const newList =
      currentList === this.firstList ? this.secondList : this.firstList
    this.setState({ currentList: newList })
  }

  openLink = (event, item, print) => {
    event.preventDefault()
    if (print) window.print()
    else popUpWindow(item.link, '', 600, 400)
  }

  render() {
    const { currentList } = this.state
    return (
      <div className={classes.header}>
        <ul className={classes.list}>
          {this.shareButtons[currentList].map((item, i) => (
            <li className={`${classes.item} ${item.mobileClass || ''}`}>
              <a
                className={classes.link}
                href={item.link}
                onClick={event => {
                  const isPrint = i === 1 && currentList === this.secondList
                  this.openLink(event, item, isPrint)
                }}>
                <i className={item.icon} />
                <span className={classes.share}>
                  {i === 1 && currentList === this.secondList
                    ? 'Imprimir'
                    : 'Compartir'}
                </span>
              </a>
            </li>
          ))}

          <li className={classes.more}>
            <button
              className={classes.button}
              type="button"
              onClick={e => this.handleMoreButton(e)}>
              <i>{currentList === this.firstList ? '+' : '-'}</i>
            </button>
          </li>
        </ul>
      </div>
    )
  }
}

StoryHeaderChildSocialGestion.label = 'Blog - Cabecera del post'

export default StoryHeaderChildSocialGestion
