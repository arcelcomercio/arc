/* eslint-disable no-template-curly-in-string */
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import * as React from 'react'
import { NavigationItem } from 'types/navigation'

import { schemaFilter } from '../../_dependencies/schema-filter'
import { menuSearchScript } from '../../_dependencies/scripts'

export const NavbarDefaultChildrenMenu = () => {
  const { arcSite } = useAppContext()
  const { siteDomain, legalLinks } = getProperties(arcSite)

  const manuData: NavigationItem =
    useContent({
      source: 'navigation-by-hierarchy',
      query: { hierarchy: 'menu-default' },
      filter: schemaFilter,
    }) || []

  return (
    <div className="nav-d__menu">
      <div className="nav-d__menu-blur" />
      <div className="nav-d__menu-cont">
        <div className="nav-d__menu-cont-w">
          <form className="nav-d__menu-f" action="">
            <input
              type="text"
              className="nav-d__menu-i"
              placeholder="¿Qué buscas?"
            />
            <button type="submit" className="nav-d__menu-sb">
              <svg
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z"
                  stroke="black"
                  strokeWidth="2"
                />
                <path
                  d="M11 10L15 13"
                  stroke="black"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </form>
          <script dangerouslySetInnerHTML={{ __html: menuSearchScript }} />
          <ul>
            {manuData?.children?.map((item) => (
              <li key={item.node_type === 'link' ? item.url : item._id}>
                <a
                  className="nav-d__menu-link"
                  href={item.node_type === 'link' ? item.url : `${item._id}/`}>
                  {item.node_type === 'link' ? item.display_name : item.name}
                </a>
              </li>
            ))}
          </ul>
          <ul className="nav-d__menu-legal">
            <li>
              <a
                itemProp="url"
                href="/"
                className="nav-d__menu-legal-l c-domain">
                {siteDomain}
              </a>
            </li>
            {legalLinks?.map((link) => (
              <li>
                <a
                  itemProp="url"
                  key={link.url}
                  href={link.url}
                  className="nav-d__menu-legal-l">
                  {link.name.toLowerCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
