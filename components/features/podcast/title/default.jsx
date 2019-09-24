import React from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'

import {
  socialMediaUrlShareList,
  popUpWindow,
} from '../../../utilities/helpers'

const classes = {}

const PodcastTitle = props => {
  const { customFields: { titleField = '', socialUrl = '' } = {} } = props

  const { siteProperties } = useFusionContext()

  const {
    siteUrl,
    fbAppId,
    social: { twitter: { user: siteNameRedSocial } } = {},
  } = siteProperties

  const urlsShareList = socialMediaUrlShareList(
    siteUrl,
    socialUrl,
    titleField,
    siteNameRedSocial
  )

  const shareButtons = [
    {
      icon:
        'M17.9 14h-3v8H12v-8h-2v-2.9h2V8.7C12 6.8 13.1 5 16 5c1.2 0 2 .1 2 .1v3h-1.8c-1 0-1.2.5-1.2 1.3v1.8h3l-.1 2.8z',
      link: urlsShareList.facebook,
    },
    {
      icon:
        'M18.555,20.889l-3.997-4.26l-7.797,4.26l8.576-9.1l4.094,4.26l7.702-4.26L18.555,20.889z',
      link: urlsShareList.fbmsg.concat('&app_id=').concat(fbAppId),
    },

    {
      icon:
        'M21.3 10.5v.5c0 4.7-3.5 10.1-9.9 10.1-2 0-3.8-.6-5.3-1.6.3 0 .6.1.8.1 1.6 0 3.1-.6 4.3-1.5-1.5 0-2.8-1-3.3-2.4.2 0 .4.1.7.1l.9-.1c-1.6-.3-2.8-1.8-2.8-3.5.5.3 1 .4 1.6.4-.9-.6-1.6-1.7-1.6-2.9 0-.6.2-1.3.5-1.8 1.7 2.1 4.3 3.6 7.2 3.7-.1-.3-.1-.5-.1-.8 0-2 1.6-3.5 3.5-3.5 1 0 1.9.4 2.5 1.1.8-.1 1.5-.4 2.2-.8-.3.8-.8 1.5-1.5 1.9.7-.1 1.4-.3 2-.5-.4.4-1 1-1.7 1.5z',
      link: urlsShareList.twitter,
    },
    {
      icon:
        'M22.09 7.87c-1.88-1.88-4.38-2.92-7.05-2.92-5.49 0-9.96 4.47-9.96 9.96 0 1.75.46 3.47 1.33 4.98L5 25.04l5.28-1.38c1.45.79 3.09 1.21 4.76 1.21 5.49 0 9.96-4.47 9.96-9.96 0-2.65-1.03-5.15-2.91-7.04m-7.05 15.32c-1.49 0-2.95-.4-4.22-1.15l-.3-.18-3.13.82.84-3.05-.2-.31C7.2 18 6.76 16.47 6.77 14.91c0-4.56 3.71-8.27 8.28-8.27 2.21 0 4.29.86 5.85 2.43 1.56 1.56 2.42 3.64 2.42 5.85 0 4.56-3.72 8.27-8.28 8.27m4.54-6.2c-.25-.12-1.47-.73-1.7-.81s-.39-.12-.56.12c-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.44.06-.66.31-.22.25-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.57.12.17 1.75 2.68 4.25 3.76.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18s.21-1.08.14-1.18c-.06-.08-.23-.14-.48-.27',
      link: urlsShareList.whatsapp,
    },
  ]

  return (
    <div className="podcast-title p-20 md:p-0 position-relative">
      <ul className="podcast-title__social-media flex md:position-absolute md:right-0">
        {shareButtons.map(({ icon, link }, i) => (
          <li
            className={`mr-10 md:mr-0 ml-0 md:ml-10${
              i === 3 || i === 1 ? ' md:hidden' : ''
            }`}>
            <a
              className="block"
              href={link}
              onClick={event => {
                event.preventDefault()
                popUpWindow(link, '', 600, 400)
              }}>
              <svg
                width="32"
                height="32"
                viewBox={i === 1 ? '0 0 32.037 32.044' : '-2 -2 32 32'}>
                <circle
                  cx={i === 1 ? '16.044' : '15'}
                  cy={i === 1 ? '16.044' : '15'}
                  r="15"
                  fill="#eeeeee"
                />
                <path className={classes.share} d={icon} />
              </svg>
            </a>
          </li>
        ))}
      </ul>

      <h1 className="podcast-title__text font-bold text-black title-lg pt-20 pb-20 mt-10 md:mt-30 border-t-1 border-b-1 border-solid border-gray">
        {titleField || 'Podcast'}
      </h1>
    </div>
  )
}

PodcastTitle.label = 'Podcast - Título'
// PodcastTitle.static = true

PodcastTitle.propTypes = {
  customFields: PropTypes.shape({
    titleField: PropTypes.string.tag({
      name: 'Título',
      description: 'El valor por defecto del campo "Título" es "Podcast"',
    }),
    socialUrl: PropTypes.string.tag({
      name: 'Url para redes sociales',
      description: 'El valor por defecto del campo "Título" es "Podcast"',
    }),
  }),
}

export default PodcastTitle
