import { useContent } from 'fusion:content'
import * as React from 'react'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'

const classes = {
  container: 'provecho-header',
  list: 'provecho-header__list',
  item: 'provecho-header__item',
  itemImage: 'provecho-header__item--image',
  link: 'provecho-header__link',
  logoBox: 'provecho-header__logo-box',
  logo: 'provecho-header__logo',
  // header
  logocontent: `provecho-header--phone header-section bg-white flex justify-between items-center text-center w-full p-10 border-t-1 border-b-1 border-solid border-gray lg:pt-15 lg:pb-15 lg:pr-10 lg:pl-10`,
  iconmenuwrapper: 'header-section__icon-wrapper lg:hidden',
  menuicon: 'icon-menu header-section__icon title-xl',
  // logoWrapper: `header-section__logo-wrapper bg-black right-0 text-center flex justify-center items-center rounded lg:hidden`,
  logoimgwrapper: 'header-section__img-wrapper flex-1',
  logoLink: 'inline-block',
  logoimg: 'header-section__img block',
  // logoIcon: 'icon-marca title-xl text-white',
  menubtn: 'header-section__btn',
  menuClose:
    'section-menu__close text-right w-full pt-15 pr-10 pl-10 lg:hidden',
  menuCloseIcon: 'icon-close section-menu__close-icon text-md text-white',
  menuActive: 'section-menu--active w-full',
  box: 'provecho-header__box',
}

const ProvechoHeader: React.FC = (props) => {
  const {
    customFields: { hierarchyConfig, customLogoLink, customLogo },
  } = props
  const { contentService = '', contentConfigValues = {} } =
    hierarchyConfig || {}
  const data =
    useContent({
      source: contentService,
      query: contentConfigValues,
      filter: schemaFilter,
      transform: (dataT) => dataT?.children || [],
    }) || []
  const [isMenuActive, setIsMenuActive] = React.useState(false)
  const logoHtml = (
    <a href={customLogoLink} className={classes.logoBox}>
      <img className={classes.logo} src={customLogo} alt="Provecho" />
    </a>
  )
  const logoString = '[logo]'
  return (
    <>
      <div className={`${classes.logocontent}`}>
        <div className={classes.iconmenuwrapper}>
          <button
            type="button"
            onClick={() => {
              setIsMenuActive(!isMenuActive)
            }}
            className={classes.menubtn}>
            <i className={classes.menuicon} />
          </button>
        </div>
        <div className={classes.logoimgwrapper}>
          <a itemProp="url" href={customLogoLink} className={classes.logoLink}>
            <img className={classes.logoimg} src={customLogo} alt="Provecho" />
          </a>
        </div>
      </div>
      <div
        className={`${classes.container} ${
          isMenuActive ? classes.menuActive : ''
        }`}>
        <div className={classes.box}>
          <div className={classes.menuClose}>
            <button
              type="button"
              onClick={() => {
                setIsMenuActive(!isMenuActive)
              }}>
              <i className={classes.menuCloseIcon} />
            </button>
          </div>
          <ul className={classes.list}>
            {data &&
              data.map((row: any) => {
                const name = row?.display_name || row?.name
                const item =
                  name === logoString ? (
                    logoHtml
                  ) : (
                    <a href={row.url} className={classes.link}>
                      {name}
                    </a>
                  )
                const itemImageClass =
                  name === logoString ? classes.itemImage : ''
                return (
                  <li
                    key={row?._id}
                    className={`${classes.item} ${itemImageClass}`}>
                    {item}
                  </li>
                )
              })}
          </ul>
        </div>
      </div>
    </>
  )
}

ProvechoHeader.label = 'Header - Provecho'

ProvechoHeader.propTypes = {
  customFields,
}
export default ProvechoHeader
