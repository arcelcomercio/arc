import React from 'react'

import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import { socialMediaUrlShareList } from '../../../utilities/social-media'

const popUpWindow = (url, title, w, h) => {
  const left = window.screen.width / 2 - w / 2
  const top = window.screen.height / 2 - h / 2
  return window.open(
    url,
    title,
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
  )
}

const TvSection = () => {
  const {
    globalContent: {
      _id,
      name: sectionName,
      site_topper: { site_logo_image: sectionImg } = {},
    } = {},
    arcSite,
  } = useFusionContext()

  const { siteUrl = '' } = getProperties(arcSite)

  const urlsShareList = socialMediaUrlShareList(
    siteUrl,
    _id,
    sectionName,
    'peru21noticias' // TODO: Agregar esto a site properties si es que se va a usar en otros sitios
  )

  const openLink = (event, link) => {
    event.preventDefault()
    popUpWindow(link, '', 600, 400)
  }

  return (
    <>
      <div className="flex justify-center bg-black mb-40">
        <picture className="tv-section__picture">
          <img
            className="w-full h-full object-cover"
            src={sectionImg}
            alt={sectionName}
          />
        </picture>
      </div>
      <div className="flex justify-between ml-10 mr-10 lg:ml-30 lg:mr-30 mb-40">
        <div>
          <span className="text-white title-sm font-bold block mb-5">
            Sobre el programa
          </span>
          <h3 itemProp="name" className="text-white title-sm">
            {sectionName}
          </h3>
        </div>
        <div className="flex">
          <a
            itemProp="url"
            href={urlsShareList.facebook}
            onClick={event => openLink(event, urlsShareList.facebook)}
            className="tv-section__icon-link block border-1 border-white rounded border-solid flex justify-center items-center">
            <i className="icon-facebook text-white" />
          </a>
          <a
            itemProp="url"
            href={urlsShareList.twitter}
            onClick={event => openLink(event, urlsShareList.twitter)}
            className="tv-section__icon-link block border-1 border-white rounded border-solid ml-10 md:ml-15 flex justify-center items-center">
            <i className="icon-twitter text-white" />
          </a>
          <a
            itemProp="url"
            href={urlsShareList.whatsapp}
            onClick={event => openLink(event, urlsShareList.whatsapp)}
            className="tv-section__icon-link block border-1 border-white rounded border-solid ml-10 md:ml-15 flex justify-center items-center md:hidden">
            <i className="icon-whatsapp text-white" />
          </a>
        </div>
      </div>
    </>
  )
}

TvSection.label = 'Tv - destaque de sección'

export default TvSection
