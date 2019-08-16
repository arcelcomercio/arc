import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import rawHtml from 'react-render-html'

import {
  popUpWindow,
  socialMediaUrlShareList,
} from '../../../../utilities/helpers'
import UtilListKey from '../../../../utilities/list-keys'

const classes = {
  news:
    'story-header__share flex items-center justify-between mb-20 p-20 border-b-1 border-t-1 border-solid border-base',
  breadcrumb: '',
  item: 'story-header__item',
  category: 'text-gray-300 text-xl uppercase story-header__title-section',
  link: 'story-header__link flex items-center justify-center text-gray-200',
  icon: 'story-header__icon title-xl',
  list: 'story-header__list flex justify-between',
  mobileClass: 'flex justify-center',
  iconFacebook: 'icon-facebook-circle',
  iconLinkedin: 'icon-linkedin-circle',
  iconRibbon: 'icon-ribbon',
  iconTwitter: 'icon-twitter-circle',
  iconWhatsapp: 'icon-whatsapp',
}
@Consumer
class StoryHeaderChildSocial extends PureComponent {
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
      siteUrl,
      postPermaLink,
      postTitle,
      siteNameRedSocial
    )

    this.shareButtons = {
      [this.firstList]: [
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
        {
          icon: classes.iconLinkedin,
          link: urlsShareList.linkedin,
          mobileClass: classes.mobileClass,
        },
        {
          icon: classes.iconWhatsapp,
          link: urlsShareList.whatsapp,
          mobileClass: `block md:hidden ${classes.mobileClass}`,
        },
      ],
    }
  }

  getSeccionPrimary = dataStory => {
    return dataStory.taxonomy
      ? dataStory.taxonomy.primary_section
      : { name: '', section: '' }
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
    const {
      globalContent: {
        taxonomy: { primary_section: { name = '' } = {} } = {},
        editor_note: editorNote,
      } = {},
    } = this.props

    return (
      <>
        <div className={classes.news}>
          <div className={classes.category}>
            {(editorNote && rawHtml(editorNote)) || name}
          </div>
          <ul className={classes.list}>
            {this.shareButtons[currentList].map((item, i) => (
              <li
                key={UtilListKey(i)}
                className={` ${classes.item} ${item.mobileClass}`}>
                <a
                  className={classes.link}
                  href={item.link}
                  onClick={event => {
                    const isPrint = i === 2 && currentList === this.secondList
                    this.openLink(event, item, isPrint)
                  }}>
                  <i className={`${item.icon} ${classes.icon}`} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default StoryHeaderChildSocial
