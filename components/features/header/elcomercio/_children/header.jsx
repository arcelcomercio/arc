import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

import { searchQuery } from '../../../../utilities/helpers'
import Button from '../../../../global-components/button'

const classes = {
  header: `header bg-primary primary-font w-full font-bold flex items-center justify-center pt-0 pb-0 pl-15 pr-15 text-sm text-gray-300 hidden lg:flex position-relative`,
  logo: 'header__logo',
  logoLeft: 'header__logo-secondary',
  logoImage: 'w-full h-full object-cover',
  featured: 'header__featured flex w-full font-normal overflow-hidden mr-20',
  item: 'header__item flex items-center justify-center h-inherit',
  link: 'header__link uppercase text-sm p-10',
  band: 'hidden justify-between md:flex',
  tags: 'header__tags justify-center mr-20 hidden md:flex',
  date: 'header__date justify-center uppercase ml-5 hidden lg:flex',
  searchContainer:
    'nav__search-box hidden lg:flex items-center border-r-1 border-solid',
  form: 'flex position-relative items-center',
  search: `nav__input-search border-0 w-0 text-md pt-5 pb-5 rounded-sm line-h line-h-xs`,
  navBtnContainer: `flex items-center justify-start nav__container-menu lg:pr-10 lg:pl-10 border-r-1 border-solid`,
}

// TODO: Agregar el click afuera del menu
const HeaderChildStandard = ({
  logo,
  bandLinks,
  // menuSections,
  tags,
  date,
  search,
}) => {
  const [statusSearch, setStatusSearch] = useState(false)
  const [statusSidebar, setStatusSidebar] = useState(false)

  const inputSearch = useRef()

  const _handleSearch = () => {
    const { value } = inputSearch.current
    searchQuery(value)
  }

  const _handleKeyDown = e => {
    e.preventDefault()
    const { value } = e.target
    if (value !== '' && e.which === 13) {
      _handleSearch()
    }
  }

  // Open search and automatic focus input
  const focusInputSearch = () => {
    inputSearch.current.focus()
  }

  // Add - Remove Class active input and button search
  const activeSearch = () => {
    return statusSearch ? 'active' : ''
  }

  // If input search is empty, buton close search else buton find search
  const optionButtonClick = () => {
    if (statusSearch) _handleSearch()
    else focusInputSearch()
    setStatusSearch(!statusSearch)
  }

  const toggleBodyOverflow = () => {
    if (typeof window !== 'undefined') {
      if (document.body.classList.contains('overflow-hidden'))
        document.body.classList.remove('overflow-hidden')
      else if (window.innerWidth < 640)
        document.body.classList.add('overflow-hidden')
    }
  }

  const _setPosition = posX => {
    document.querySelector('.nav-sidebar').style.transform = `scaleX(${posX})`
  }

  const _openMenu = () => {
    _setPosition(1)
    document.querySelector('.layer').style.display = 'block'
    setStatusSidebar(true)
  }

  const _closeMenu = () => {
    _setPosition(0)
    document.querySelector('.layer').style.display = 'none'
    setStatusSidebar(false)
  }

  const _handleToggleSectionElements = () => {
    toggleBodyOverflow()
    if (statusSidebar) _closeMenu()
    else _openMenu()
  }

  return (
    <>
      <nav className={classes.band}>
        {tags !== '' && <div className={classes.tags}>{tags}</div>}
        {bandLinks && bandLinks[0] && (
          <ul className={classes.featured}>
            {bandLinks.map(section => (
              <li className={classes.item} key={`band-${section.url}`}>
                <a className={classes.link} href={section.url}>
                  {section.name}
                </a>
              </li>
            ))}
          </ul>
        )}
        {date.active && <div className={classes.date}>{date.value}</div>}
      </nav>
      <header className={classes.header}>
        {/** ************* LEFT *************** */}
        <div className={classes.searchContainer}>
          {/* <Ads
                    adElement="zocaloNav1"
                    isDesktop
                    classes={{ desktop: classes.ads }}
                  />
                    <Ads
                  adElement="zocaloNav2"
                  isDesktop
                  classes={{ desktop: classes.ads }}
                /> */}
          <form className={classes.form} onSubmit={e => e.preventDefault()}>
            <input
              ref={inputSearch}
              type="search"
              defaultValue={search}
              /* onBlur={this._handleCloseSectionsSearch} */
              onKeyUp={_handleKeyDown}
              placeholder="¿Qué Buscas?"
              className={`${classes.search} ${activeSearch()}`}
            />
            <Button
              iconClass={classes.iconSearch}
              btnClass={`${classes.btnSearch} ${activeSearch()}`}
              onClick={optionButtonClick}
            />
          </form>
        </div>
        <div className={classes.navBtnContainer}>
          <Button
            iconClass={classes.iconMenu}
            btnClass={classes.btnSection}
            btnText="Menú"
            onClick={_handleToggleSectionElements}
          />
        </div>
        <a href={logo.link}>
          <img src={logo.src} alt={logo.alt} className={classes.logo} />
        </a>
      </header>
    </>
  )
}

HeaderChildStandard.propTypes = {
  logo: PropTypes.shape({
    src: PropTypes.string,
    link: PropTypes.string,
    alt: PropTypes.string,
  }),
  bandLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
}

export default HeaderChildStandard
