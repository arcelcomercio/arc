import React, { useState, useEffect } from 'react'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import getProperties from 'fusion:properties'

import MenuTV from './_children/menu'
import { getAssetsPath } from '../../../utilities/assets'

const TvHeader = () => {
  const { contextPath, arcSite } = useFusionContext()
  const [statusMenu, changeStatus] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
    window.navigator.userAgent
  )

  const { tv: { logoUrl, logoAlt } = {} } = getProperties(arcSite)

  const menuSections =
    useContent({
      source: 'navigation-by-hierarchy',
      query: { hierarchy: 'tv-menu-default' },
      filter: `{ 
        children {
          name
          _id
          display_name
          url
          node_type
        }
      }`,
    }) || {}

  const toggleMenu = () => {
    if (statusMenu) {
      document.body.classList.remove('overflow-hidden')
    }
    changeStatus(!statusMenu)
  }

  const formatMenuSections = res => {
    const { children = [] } = res || {}
    const auxList = children.map(el => {
      if (el.node_type === 'link') {
        return {
          name: el.display_name,
          url: `${el.url}/`,
          node_type: el.node_type,
        }
      }
      return {
        name: el.name,
        url: `${el._id}/`,
        node_type: el.node_type,
      }
    })
    return auxList
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const _handleScroll = () => {
    const { body = {}, documentElement = {} } = document
    const { scrollTop: scrollBody = 0 } = body
    const { scrollTop: scrollElement = 0 } = documentElement
    const scroll = scrollBody || scrollElement

    const headerTop = 10
    if (!scrolled && scroll > headerTop) setScrolled(true)
    else if (scrolled && scroll <= headerTop) setScrolled(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', _handleScroll)
    return () => {
      window.removeEventListener('scroll', _handleScroll)
    }
  }, [_handleScroll])

  return (
    <header
      className={`tv-header flex justify-center ${scrolled ? 'active' : ''}`}>
      <div className="tv-header__content position-relative">
        {statusMenu && (
          <MenuTV {...{ menuSections: formatMenuSections(menuSections) }} />
        )}
        <div className="tv-header__logo-container  position-absolute flex mt-10 pl-15 pr-15">
          <button
            type="button"
            className="mr-15 p-0"
            onClick={() => toggleMenu()}>
            <i className="tv-header__icon icon-hamburguer text-primary-color" />
          </button>
          <button
            type="button"
            className="tv-header__programas block"
            onClick={() => toggleMenu()}>
            PROGRAMAS
          </button>
        </div>
        <a
          href={logoUrl}
          className="tv-header__section-logo block position-absolute mt-5">
          <img
            className="w-full"
            src={`${getAssetsPath(
              arcSite,
              contextPath
            )}/resources/assets/extraordinary-story/grid/logo.png?d=1`}
            alt={logoAlt}
          />
        </a>
        <a
          href="https://peru21.pe/"
          className="tv-header__go-portada position-absolute">
          {isMobile ? `Perú21 ` : `Portada Perú21 `}
          <i className="tv-header__go-arrow icon-arrow-r"></i>
        </a>
      </div>
    </header>
  )
}

TvHeader.label = 'Tv - cabecera'

export default TvHeader
