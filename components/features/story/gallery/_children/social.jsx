import React from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

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

const StoryGalleryChildSocial = () => {
  const firstList = 'firstList'
  const secondList = 'secondList'
  const currentList = firstList

  const {
    globalContent: {
      website_url: postPermaLink,
      headlines: { basic: postTitle } = {},
    },
    arcSite,
  } = useFusionContext()

  const {
    social: { twitter: { user: siteNameRedSocial } = {} } = {},
    siteUrl,
  } = getProperties(arcSite)

  const urlsShareList = socialMediaUrlShareList(
    siteUrl,
    postPermaLink,
    postTitle,
    siteNameRedSocial
  )

  const shareButtons = {
    [firstList]: [
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

  const openLink = (event, item, print) => {
    event.preventDefault()
    if (print) window.print()
    else popUpWindow(item.link, '', 600, 400)
  }

  return (
    <>
      <ul className={classes.list}>
        {shareButtons[currentList].map((item, i) => (
          <li
            key={UtilListKey(i)}
            className={` ${classes.item} ${item.mobileClass}`}>
            <a
              className={classes.link}
              href={item.link}
              onClick={event => {
                const isPrint = i === 2 && currentList === secondList
                openLink(event, item, isPrint)
              }}>
              <i className={`${item.icon} ${classes.icon}`} />
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}

export default StoryGalleryChildSocial
