import { useContent } from 'fusion:content'
import Static from 'fusion:static'
import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

import { NavigationByHierarchyQuery } from '../../../../content/sources/navigation-by-hierarchy'
import PollaNavbarMenu from './_children/menu'

interface Props {
  customFields?: any
}

const PollaNavbar: FC<Props> = () => {
  const { children: menuList = [] } = useContent<NavigationByHierarchyQuery>({
    source: 'navigation-by-hierarchy',
    query: {
      hierarchy: 'la-polla',
    },
  })

  return (
    <Static id="PollaNavbar">
      <div className="polla-nav">
        <PollaNavbarMenu menuList={menuList} />
        <button
          id="polla-nav__btn-menu"
          type="button"
          className="polla-nav__btn-menu"
          aria-haspopup="true"
          aria-controls="menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="23"
            viewBox="0 0 24 24">
            <title>Menú</title>
            <path d="M4 6h16c0.6 0 1 0.5 1 1l0 0c0 0.6-0.4 1-1 1H4C3.5 8 3 7.6 3 7l0 0C3 6.5 3.5 6 4 6z" />
            <path d="M4 11h16c0.6 0 1 0.5 1 1l0 0c0 0.6-0.4 1-1 1H4c-0.5 0-1-0.4-1-1l0 0C3 11.5 3.5 11 4 11z" />
            <path d="M4 16h16c0.6 0 1 0.5 1 1l0 0c0 0.6-0.4 1-1 1H4c-0.5 0-1-0.4-1-1l0 0C3 16.5 3.5 16 4 16z" />
          </svg>
        </button>
        <h1 className="polla-nav__logo">
          <a href="/">
            LA POLLA <span>DEPOR</span>
          </a>
        </h1>
        <div className="polla-nav__middle">
          <h2 className="polla-nav__tournament">Copa América 2021</h2>
          <ul className="polla-nav__list">
            {menuList.map(
              ({
                name = '',
                _id: id = '',
                display_name: displayName = '',
                url = '',
              }) => (
                <li className="polla-nav__item">
                  <a href={url || id || '/'}>{name || displayName}</a>
                </li>
              )
            )}
          </ul>
        </div>
        <a href="/" className="polla-nav__play-link">
          ¡JUEGA!
        </a>
        <button id="signwall-nav-btn" type="button" className="polla-nav__sign">
          <span>Ingresar</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 0C4.579 0 0 4.579 0 10C0 13.189 1.592 16.078 4 17.924V18H4.102C5.77 19.245 7.813 20 10 20C12.187 20 14.23 19.245 15.898 18H16V17.924C18.408 16.078 20 13.19 20 10C20 4.579 15.421 0 10 0ZM6.074 16.927C6.22136 16.2604 6.59154 15.6639 7.12347 15.236C7.65539 14.808 8.3173 14.5742 9 14.573H11C11.6827 14.5744 12.3445 14.8083 12.8764 15.2362C13.4082 15.6641 13.7785 16.2605 13.926 16.927C12.758 17.604 11.416 18 10 18C8.584 18 7.242 17.604 6.074 16.927ZM15.61 15.641C15.2286 14.7329 14.5877 13.9574 13.7677 13.4117C12.9477 12.866 11.985 12.5742 11 12.573H9C8.01501 12.5742 7.05227 12.866 6.23227 13.4117C5.41227 13.9574 4.77144 14.7329 4.39 15.641C2.923 14.182 2 12.176 2 10C2 5.663 5.663 2 10 2C14.337 2 18 5.663 18 10C18 12.176 17.077 14.182 15.61 15.641Z"
              fill="#D2D900"
            />
            <path
              d="M10 4C7.72 4 6 5.72 6 8C6 10.28 7.72 12 10 12C12.28 12 14 10.28 14 8C14 5.72 12.28 4 10 4ZM10 10C8.822 10 8 9.178 8 8C8 6.822 8.822 6 10 6C11.178 6 12 6.822 12 8C12 9.178 11.178 10 10 10Z"
              fill="#D2D900"
            />
          </svg>
        </button>
      </div>
    </Static>
  )
}

PollaNavbar.label = 'La polla - Navbar'
PollaNavbar.static = true

PollaNavbar.propTypes = {
  customFields: PropTypes.shape({
    customNav: PropTypes.string.tag({
      name: 'Jerarquía',
    }),
  }),
}

export default PollaNavbar
