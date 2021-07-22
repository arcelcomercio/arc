import { useAppContext } from 'fusion:context'
import React from 'react'

import { socialMediaUrlShareList } from '../../../../../utilities/social-media'

export default function HeaderInvertedSocialIcons() {
  const {
    globalContent,
    siteProperties: {
      siteUrl,
      social: { twitter: { user: siteNameRedSocial } = {} } = {},
    } = {},
  } = useAppContext()

  const { website_url: postPermaLink, headlines: { basic: postTitle } = {} } =
    globalContent || {}

  const urlsShareList = socialMediaUrlShareList(
    siteUrl,
    postPermaLink,
    postTitle,
    siteNameRedSocial
  )

  const shareButtons = [
    {
      name: 'facebook',
      link: urlsShareList.facebook,
    },

    {
      name: 'twitter',
      link: urlsShareList.twitter,
    },
    {
      name: 'linkedin',
      link: urlsShareList.linkedin,
    },
    {
      name: 'whatsapp',
      link: urlsShareList.whatsapp,
    },
  ]

  return (
    <>
      <div className="h-basic__item h-basic__item-mob">
        <button type="button" className="h-basic__show-more f alg-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            viewBox="0 0 23 23">
            <path
              d="M13.493,2.737,2.67,8.15,2.026,6.862,12.849,1.452Zm-.644,13.376L2.026,10.7l.646-1.287,10.823,5.412-.644,1.286Z"
              transform="translate(3.801 2.724)"
              fillRule="evenodd"
            />
            <path
              d="M19.417,7.191a3.6,3.6,0,1,0-2.543-1.053A3.6,3.6,0,0,0,19.417,7.191Zm0,15.821a3.6,3.6,0,1,0-2.543-1.053A3.6,3.6,0,0,0,19.417,23.013ZM3.6,15.1a3.6,3.6,0,1,0-2.543-1.053A3.6,3.6,0,0,0,3.6,15.1Z"
              transform="translate(0)"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <ul className="h-basic__list f just-between">
        {shareButtons.map((item) => (
          <li key={item.icon} className="h-basic__item">
            <a
              itemProp="url"
              title={`Compartir en ${item.name}`}
              className="h-basic__item-link f alg-center just-center"
              href={item.link}
              id={`icon-${item.name}`}>
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: '"use strict";document.getElementById("icon-<<name>>").addEventListener("click",function(e){e.preventDefault(),3===<<item>>?navbarMoreList():navbarPopUpWindow(document.getElementById("icon-<<name>>").href,"",600,400)});'
                    .replace(/<<name>>/g, item.name)
                    .replace('<<item>>', 0),
                }}
              />
              {(() => {
                if (item.name === 'facebook') {
                  return (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="11"
                      viewBox="0 0 10 21">
                      <title>Compartir en facebook</title>
                      <path d="M2.6 21V11.1H0V7.6H2.6V4.6C2.6 2.2 4.1 0 7.5 0 8.9 0 10 0.1 10 0.1L9.9 3.5C9.9 3.5 8.8 3.4 7.7 3.4 6.4 3.4 6.2 4 6.2 5V7.6H10L9.8 11.1H6.2V21H2.6Z" />
                    </svg>
                  )
                }
                if (item.name === 'twitter') {
                  return (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="11"
                      viewBox="0 0 14 12">
                      <title>Compartir en twitter</title>
                      <path d="M13.5 2C13 2.2 12.5 2.3 12 2.4 12.5 2.1 12.9 1.5 13.1 0.9 12.6 1.2 12 1.4 11.4 1.6 11.2 1.3 10.9 1.1 10.6 0.9 10.2 0.8 9.9 0.7 9.5 0.7 8 0.7 6.8 1.9 6.8 3.4 6.8 3.6 6.9 3.8 6.9 4 4.7 3.9 2.7 2.8 1.4 1.2 1.2 1.6 1 2.1 1 2.6 1 3.5 1.5 4.3 2.2 4.8 1.8 4.8 1.4 4.6 1 4.4V4.5C1 5.8 1.9 6.8 3.2 7.1 2.9 7.1 2.7 7.2 2.5 7.2 2.3 7.2 2.1 7.2 2 7.1 2.3 8.2 3.3 9 4.5 9 3.5 9.7 2.4 10.1 1.1 10.1 0.9 10.1 0.7 10.1 0.5 10.1 1.7 10.8 3.1 11.3 4.6 11.3 9.5 11.3 12.2 7.2 12.2 3.7 12.2 3.6 12.2 3.5 12.2 3.4 12.7 3 13.1 2.5 13.5 2Z" />
                    </svg>
                  )
                }
                if (item.name === 'linkedin') {
                  return (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="15"
                      viewBox="0 0 24 24">
                      <title>Compartir en LinkedIn</title>
                      <path d="M5 7.2C6.2 7.2 7.2 6.2 7.2 5 7.2 3.8 6.2 2.8 5 2.8 3.8 2.8 2.8 3.8 2.8 5 2.8 6.2 3.8 7.2 5 7.2Z" />
                      <path d="M9.2 8.9V21H13V15C13 13.4 13.3 11.9 15.3 11.9 17.2 11.9 17.2 13.7 17.2 15.1V21H21V14.3C21 11.1 20.3 8.6 16.5 8.6 14.6 8.6 13.4 9.6 12.9 10.5H12.9V8.9H9.2V8.9ZM3.1 8.9H6.9V21H3.1V8.9Z" />
                    </svg>
                  )
                }
                if (item.name === 'whatsapp') {
                  return (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="30"
                      viewBox="0 0 31 32">
                      <title>Compartir en WhatsApp</title>
                      <path
                        fill="transparent"
                        d="M8 28.4L3.3 30.5 4.5 25.4C2.3 22.9 1 19.6 1 16 1 8 7.5 1.5 15.5 1.5 23.5 1.5 30 8 30 16 30 24 23.5 30.5 15.5 30.5 12.8 30.5 10.2 29.7 8 28.4Z"
                      />
                      <path d="M8.5 10.7C8.5 10.7 9.3 9.1 10.1 9.1 10.8 9 11.7 9 12 9.4 12.2 9.9 13.3 12.7 13.3 12.7 13.3 12.7 13.5 13.2 13.2 13.6 12.9 14.1 12.3 14.8 12.3 14.8 12.3 14.8 11.9 15.3 12.3 15.8 12.6 16.3 13.2 17.2 14.4 18.4 15.5 19.6 17.8 20.5 17.8 20.5 17.8 20.5 18.1 20.5 18.3 20.3 18.5 20.1 19.7 18.7 19.7 18.7 19.7 18.7 20 18.2 20.6 18.5 21.2 18.7 23.8 20.1 23.8 20.1 23.8 20.1 24.1 20.2 24.1 20.6 24.1 21.1 23.9 22.2 23.5 22.6 23.1 23 22 24.2 20.4 24.2 18.7 24.2 14.8 22.8 12.7 20.7 10.6 18.5 8.7 16.4 8.3 14.4 7.9 12.4 7.9 11.5 8.5 10.7Z" />
                    </svg>
                  )
                }
                return ''
              })()}
            </a>
          </li>
        ))}
      </ul>
      {/* window.navbarPopUpWindow = (url, title, w, h) => {
        const left = window.screen.width / 2 - w / 2
        const top = window.screen.height / 2 - h / 2
        return window.open(
        url,
        title,
        `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
        )
      }

      document.addEventListener("DOMContentLoaded", () => {
        const button = document.querySelector('.h-basic__show-more')
        const list = document.querySelector('.h-basic__list')
        if (button && list) {
          button.addEventListener("click", () => {
            list.classList.toggle('active')
          })
        }
      })  */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            '"use strict";window.navbarPopUpWindow=function(o,e,n,t){var i=window.screen.width/2-n/2,r=window.screen.height/2-t/2;return window.open(o,e,"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+n+", height="+t+", top="+r+", left="+i)},document.addEventListener("DOMContentLoaded",function(){var o=document.querySelector(".h-basic__show-more"),e=document.querySelector(".h-basic__list");o&&e&&o.addEventListener("click",function(){e.classList.toggle("active")})});',
        }}
      />
    </>
  )
}
