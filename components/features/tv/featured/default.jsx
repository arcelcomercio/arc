import React, { useState } from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import TvHeader from './_children/header'
import Icon from '../../../global-components/multimedia-icon'
import Modal from '../../../global-components/tv-modal'

import StoryData from '../../../utilities/story-data'
import { formatDateLocalTimeZone } from '../../../utilities/helpers'

const TvFeatured = () => {
  const data = useContent({
    source: 'story-by-section',
    query: { section: '/peru21tv' },
    // filter: SchemaFilter(arcSite),
  })

  const { arcSite, contextPath, deployment } = useFusionContext()

  const {
    // websiteLink, // { websites { ${arcsite} { website_url } } }
    // multimediaLandscapeMD,
    // multimediaLazyDefault,
    title, // { headlines { basic } }
    // multimediaType, // { promo_items }
    date, // { publish_date }
    // primarySectionLink, // { taxonomy { primary_section { path } } }
    // primarySection, // { taxonomy { primary_section { name } } }
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="tv-featured position-relative mb-40">
        <TvHeader />

        <div className="tv-featured__body mx-auto">
          <button
            type="button"
            className="block p-0"
            onClick={() => setIsModalOpen(!isModalOpen)}>
            <picture className="tv-featured__picture block position-relative">
              <img
                className="tv-featured__img object-cover w-full h-full"
                src="https://img.peru21.pe/files/listing_p21_p21tv_home_destaque_principal/uploads/2019/08/09/5d4dd028d1489.jpeg"
                alt=""
              />
              <Icon type="basic_video" iconClass="" />
            </picture>
          </button>

          <div className="tv-featured__content p-15 lg:ml-35">
            <div className="tv-featured__new-episode bg-primary text-white inline-block p-5 rounded-sm mb-10">
              NUEVO EPISODIO
            </div>
            <h2 className="mb-15">
              <button
                type="button"
                className="tv-featured__text-button text-white font-bold title-xs p-0 text-left"
                onClick={() => setIsModalOpen(!isModalOpen)}>
                {title}
              </button>
            </h2>
            <time className="block text-white mb-15" dateTime={date}>
              {date && formatDateLocalTimeZone(date)}
            </time>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          close={() => {
            setIsModalOpen(!isModalOpen)
          }}
          // youtubeId="_oQINN93ET4"
          multimediaSource="4dc92932-7143-4776-94b7-798421d06108"
        />
      )}
    </>
  )
}

export default TvFeatured
