import React from 'react'

import {
  /* popUpWindow, */
  socialMediaUrlShareList,
} from '../../../../utilities/helpers'

const classes = {
  news: 'story-header__share hidden justify-center mb-20 lg:flex',
  item: 'story-header__item',
  link: 'story-header__link flex items-center justify-center text-white',
  icon: 'story-header__icon title-xl',
  list: 'story-header__list flex justify-between',
  iconFacebook: 'icon-facebook-circle',
  iconLinkedin: 'icon-linkedin-circle',
  iconTwitter: 'icon-twitter-circle',
  iconWhatsapp: 'icon-whatsapp',
}

const SpecialHeaderChildSocial = ({
  title,
  link,
  siteUrl,
  siteNameRedSocial,
}) => {
  const urlsShareList = socialMediaUrlShareList(
    siteUrl,
    link,
    title,
    siteNameRedSocial
  )

  const shareButtons = [
    {
      icon: classes.iconFacebook,
      link: urlsShareList.facebook,
    },

    {
      icon: classes.iconTwitter,
      link: urlsShareList.twitter,
    },
    {
      icon: classes.iconLinkedin,
      link: urlsShareList.linkedin,
    },
    {
      icon: classes.iconWhatsapp,
      link: urlsShareList.whatsapp,
    },
  ]

  /* const openLink = (event, item, print) => {
    event.preventDefault()
    if (print) window.print()
    else popUpWindow(item.link, '', 600, 400)
  } */

  return (
    <div className={classes.news}>
      <ul className={classes.list}>
        {shareButtons.map((item, i) => (
          <li key={`share-${item.icon}`} className={classes.item}>
            <a
              className={classes.link}
              href={item.link}
              /* onClick={event => {
                const isPrint = i === 2
                openLink(event, item, isPrint)
              }} */
            >
              <i className={`${item.icon} ${classes.icon}`} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SpecialHeaderChildSocial
