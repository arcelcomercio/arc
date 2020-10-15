import React from 'react'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import UtilListKey from '../../../../utilities/list-keys'
import StoryData from '../../../../utilities/story-data'
import {
  SPECIAL,
  SPECIAL_BASIC,
} from '../../../../utilities/constants/subtypes'
import StorySocialChildAuthor from './author'
import TProLbl from '../../../../global-components/trustprojectlabel'

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

/* window.addEventListener('load', () => {setTimeout(() => {
  if(!window.shareButtons){
    const windowW = 600
    const windowH = 400
    const $shareButtons = document.querySelectorAll('a[data-share]')
    if ($shareButtons && $shareButtons.length > 0) {
      const wLeft = window.screen.width / 2 - windowW / 2
      const wTop = window.screen.height / 2 - windowH / 2
      $shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault()
          window.open(
            button.getAttribute('href'),
            '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${windowW}, height=${windowH}, top=${wTop}, left=${wLeft}`
          )
        })
      })
    }
  }
}, 0)}) */

const popup =
  '"use strict";window.addEventListener("load",function(){setTimeout(function(){var t=document.querySelectorAll("a[data-share]");if(t&&t.length>0){var n=window.screen.width/2-300,o=window.screen.height/2-200;t.forEach(function(t){t.addEventListener("click",function(e){e.preventDefault(),window.open(t.getAttribute("href"),"","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=".concat(600,", height=").concat(400,", top=").concat(o,", left=").concat(n))})})}},0)});'

// Funcion extraida de Helpers
const socialMediaUrlShareList = (
  siteUrl,
  postPermaLink,
  postTitle,
  siteNameRedSocial = 'Gestionpe'
) => {
  return {
    facebook: `http://www.facebook.com/sharer.php?u=${siteUrl}${postPermaLink}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      postTitle
    )}&url=${siteUrl}${postPermaLink}&via=${siteNameRedSocial}`,
    linkedin: `http://www.linkedin.com/shareArticle?url=${siteUrl}${postPermaLink}`,
    // pinterest: `https://pinterest.com/pin/create/button/?url=${siteUrl}${postPermaLink}`,
    whatsapp: `whatsapp://send?text=${siteUrl}${postPermaLink}`,
    // fbmsg: `fb-messenger://share/?link=${siteUrl}${postPermaLink}`,
  }
}

const StoryHeaderChildSocial = () => {
  const { globalContent, arcSite, contextPath } = useAppContext()
  const {
    website_url: postPermaLink,
    headlines: { basic: postTitle } = {},
    label: { trustproject } = {},
  } = globalContent || {}

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
      name: 'facebook',
      icon: classes.iconFacebook,
      link: urlsShareList.facebook,
      mobileClass: classes.mobileClass,
    },

    {
      name: 'twitter',
      icon: classes.iconTwitter,
      link: urlsShareList.twitter,
      mobileClass: classes.mobileClass,
    },
    {
      name: 'linkedin',
      icon: classes.iconLinkedin,
      link: urlsShareList.linkedin,
      mobileClass: classes.mobileClass,
    },
    {
      name: 'whatsapp',
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
                <p
                  itemProp="description"
                  dangerouslySetInnerHTML={{ __html: editorNote }}></p>
              )) ||
                primarySection}
              <StorySocialChildAuthor {...params} />
              {trustproject && (
                <TProLbl trustproject={trustproject} plantilla="default" />
              )}
            </div>
          )}
        <ul className={classes.list}>
          {shareButtons.map((item, i) => (
            <li
              key={UtilListKey(i)}
              className={` ${classes.item} ${item.mobileClass}`}>
              <a
                itemProp="url"
                className={classes.link}
                href={item.link}
                data-share=""
                title={`Compartir en ${item.name}`}>
                <i
                  className={`${item.icon} ${classes.icon}`}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <script dangerouslySetInnerHTML={{ __html: popup }}></script>
    </>
  )
}

export default StoryHeaderChildSocial
