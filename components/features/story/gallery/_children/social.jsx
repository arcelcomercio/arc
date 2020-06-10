import React from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

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
    // linkedin: `http://www.linkedin.com/shareArticle?url=${siteUrl}${postPermaLink}`,
    // pinterest: `https://pinterest.com/pin/create/button/?url=${siteUrl}${postPermaLink}`,
    // whatsapp: `whatsapp://send?text=${siteUrl}${postPermaLink}`,
    // fbmsg: `fb-messenger://share/?link=${siteUrl}${postPermaLink}`,
  }
}

const StoryGalleryChildSocial = () => {
  const { globalContent, arcSite } = useFusionContext()
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
  ]

  return (
    <>
      <ul className={classes.list}>
        {shareButtons.map((item, i) => (
          <li
            key={UtilListKey(i)}
            className={` ${classes.item} ${item.mobileClass}`}>
            <a
              itemProp="url"
              className={classes.link}
              href={item.link}
              data-gallery-share="">
              <i className={`${item.icon} ${classes.icon}`} />
            </a>
          </li>
        ))}
      </ul>
      <script dangerouslySetInnerHTML={{ __html: popup }}></script>
    </>
  )
}

export default StoryGalleryChildSocial
