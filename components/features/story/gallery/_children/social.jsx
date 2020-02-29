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

const windowW = 600
const windowH = 400

const popup = `(function(){setTimeout(function() {
  const $shareButtons = document.querySelectorAll('a[data-gallery-share]')
  if ($shareButtons && $shareButtons.length > 0) {
    const windowLeft = window.screen.width / 2 - ${windowW} / 2
    const windowTop = window.screen.height / 2 - ${windowH} / 2
    $shareButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault()
        window.open(
          button.getAttribute('href'),
          '',
          'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${windowW}, height=${windowH}, top='+windowTop+', left='+windowLeft+''
        )
      })
    })
  }
}, 0)})()`

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
            <a className={classes.link} href={item.link} data-gallery-share="">
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
