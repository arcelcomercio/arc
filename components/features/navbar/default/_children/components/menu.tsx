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
                width="16"
                fill="none"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m15.755 14.394-3.6271-3.6271c0.8732-1.1626 1.3446-2.5776 1.343-4.0315 0-3.7138-3.0215-6.7354-6.7353-6.7354-3.7138 0-6.7354 3.0215-6.7354 6.7354 0 3.7138 3.0215 6.7353 6.7354 6.7353 1.454 0.0016 2.869-0.4698 4.0315-1.343l3.6271 3.6271c0.1836 0.1641 0.4231 0.2517 0.6692 0.2448 0.2462-0.0069 0.4804-0.1077 0.6545-0.2819 0.1742-0.1741 0.275-0.4083 0.2819-0.6545 0.0069-0.2461-0.0807-0.4856-0.2448-0.6692zm-13.83-7.6586c0-0.95152 0.28216-1.8817 0.81079-2.6728 0.52864-0.79116 1.28-1.4078 2.1591-1.7719s1.8464-0.4594 2.7796-0.27377c0.93324 0.18563 1.7905 0.64383 2.4633 1.3167 0.6729 0.67283 1.1311 1.5301 1.3167 2.4633 0.1856 0.93323 0.0903 1.9006-0.2738 2.7796s-0.9807 1.6305-1.7719 2.1591c-0.79116 0.5287-1.7213 0.8108-2.6728 0.8108-1.2755-0.0015-2.4983-0.5089-3.4002-1.4108-0.9019-0.90186-1.4093-2.1247-1.4108-3.4001z"
                  fill="#000"
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
