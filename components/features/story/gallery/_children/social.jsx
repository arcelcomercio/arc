import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'

import {
  popUpWindow,
  socialMediaUrlShareList,
} from '../../../../utilities/helpers'
import UtilListKey from '../../../../utilities/list-keys'

const classes = {
  item: 'story-gallery-social__item',
  link:
    'story-gallery-social__link flex items-center justify-center text-gray-200',
  icon: 'story-gallery-social__icon title-xl',
  list: 'story-gallery-social__list flex justify-between',
  mobileClass: 'flex justify-center',
  iconFacebook: 'icon-facebook-circle',
  iconTwitter: 'icon-twitter-circle',
}
@Consumer
class StoryGalleryChildSocial extends PureComponent {
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
      ],
    }
  }

  openLink = (event, item, print) => {
    event.preventDefault()
    if (print) window.print()
    else popUpWindow(item.link, '', 600, 400)
  }

  render() {
    const { currentList } = this.state
    return (
      <>
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
      </>
    )
  }
}

export default StoryGalleryChildSocial
