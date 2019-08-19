import React from 'react'

import { useFusionContext } from 'fusion:context'

const TvSection = () => {
  const {
    globalContent: {
      name: sectionName,
      site_topper: { site_logo_image: sectionImg } = {},
    } = {},
  } = useFusionContext()

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
          <h3 className="text-white title-sm">{sectionName}</h3>
        </div>
        <div className="flex">
          <a
            href="/asd"
            className="tv-section__icon-link block border-1 border-white rounded border-solid flex justify-center items-center">
            <i className="icon-facebook text-white" />
          </a>
          <a
            href="/asd"
            className="tv-section__icon-link block border-1 border-white rounded border-solid ml-10 md:ml-15 flex justify-center items-center">
            <i className="icon-twitter text-white" />
          </a>
          <a
            href="/asd"
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
