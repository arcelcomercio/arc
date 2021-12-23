import { useContent } from 'fusion:content'
import * as React from 'react'
import { NavigationItem } from 'types/navigation'

import { schemaFilter } from '../_dependencies/schema-filter'

const filterItemStyes = (text: string | undefined) =>
  (text || '').replace(/\[.*?\]/g, '')

export const NavbarDefaultChildrenSimple: React.FC = () => {
  const navbarData: NavigationItem =
    useContent({
      source: 'navigation-by-hierarchy',
      query: { hierarchy: 'header-default' },
      filter: schemaFilter,
    }) || []

  return (
    <nav className="nav-ds">
      <ul className="nav-ds__list">
        {navbarData?.children?.map((item) => (
          <li
            key={item.node_type === 'link' ? item.url : item._id}
            className="nav-ds__item">
            <a href={item.node_type === 'link' ? item.url : `${item._id}/`}>
              {filterItemStyes(
                item.node_type === 'link' ? item.display_name : item.name
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
