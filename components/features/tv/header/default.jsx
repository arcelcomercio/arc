import React, { useState } from 'react'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'

import MenuTV from './_children/menu'

const TvHeader = () => {
  const { contextPath, deployment } = useFusionContext()
  const [statusMenu, changeStatus] = useState(false)

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

  return (
    <header className="tv-header">
      <a
        href="/asdf" // TODO
        className="tv-header__section-logo block position-absolute mt-25">
        <img
          className="w-full"
          src={deployment(
            `${contextPath}/resources/assets/extraordinary-story/grid/logo.png`
          )}
          alt="Perú21TV"
        />
      </a>
      <div className="tv-header__logo-container  position-absolute flex mt-25 bg-white p-5 pl-10 pr-10 rounded-md">
        <button
          type="button"
          className="mr-15 p-0"
          onClick={() => toggleMenu()}>
          <i className="tv-header__icon icon-hamburguer text-primary-color" />
        </button>
        <a href="/" className="tv-header__logo block">
          <img
            className="w-full"
            src="https://assets.peru21.pe/img/p21tv/logo_peru21_m.png" // TODO: Cambiar cuando se tenga el logo
            alt="Perú21"
          />
        </a>
      </div>
      {statusMenu && (
        <MenuTV
          toggleMenu={toggleMenu}
          {...{ menuSections: formatMenuSections(menuSections) }}
        />
      )}
    </header>
  )
}

export default TvHeader
