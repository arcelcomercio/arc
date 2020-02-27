import React from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import { socialMediaUrlShareList } from '../../../../utilities/helpers'
import UtilListKey from '../../../../utilities/list-keys'
import StoryData from '../../../../utilities/story-data'
import {
  SPECIAL,
  SPECIAL_BASIC,
} from '../../../../utilities/constants/subtypes'
import StorySocialChildAuthor from './author'

const classes = {
  news:
    'story-header__share flex items-center mb-20 p-20 border-b-1 border-t-1 border-solid border-base',
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
  bbcHead: 'bbc-head',
  premium: 'story-header__premium',
}

const StoryHeaderChildSocial = () => {
  const { globalContent, arcSite, contextPath } = useFusionContext()
  const { website_url: postPermaLink, headlines: { basic: postTitle } = {} } =
    globalContent || {}

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

  const shareButtons = [
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
  ]

  const {
    publishDate: date,
    displayDate: updatedDate,
    editorNote,
    authorImage,
    authorLink,
    author,
    authorEmail,
    primarySection,
    primarySectionLink,
    subtype,
    // tags,
    isPremium,
  } = new StoryData({
    data: globalContent,
    contextPath,
  })

  const params = {
    authorImage,
    author,
    authorLink,
    updatedDate,
    date,
    primarySection,
    primarySectionLink,
    authorEmail,
  }
  return (
    <>
      <div
        className={`${classes.news} ${
          subtype === SPECIAL_BASIC ||
          subtype === SPECIAL ||
          primarySectionLink === '/archivo-elcomercio/'
            ? 'justify-center'
            : 'justify-between'
        }`}>
        {subtype !== SPECIAL_BASIC &&
          subtype !== SPECIAL &&
          primarySectionLink !== '/archivo-elcomercio/' && (
            <div
              className={`${classes.category} ${(isPremium &&
                classes.premium) ||
                ''}`}>
              {(editorNote && (
                <p dangerouslySetInnerHTML={{ __html: editorNote }}></p>
              )) ||
                primarySection}
              <StorySocialChildAuthor {...params} />
            </div>
          )}
        <ul className={classes.list}>
          {shareButtons.map((item, i) => (
            <li
              key={UtilListKey(i)}
              className={` ${classes.item} ${item.mobileClass}`}>
              <a className={classes.link} href={item.link} data-share="">
                <i className={`${item.icon} ${classes.icon}`} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default StoryHeaderChildSocial
