import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import AmpSocial from '../../../story/header/_children/amp-social'
import Menu from './amp-menu'

const classes = {
  nav:
    'amp-nav top-0 text-sm w-full flex flex items-center font-bold secondary-font text-white',
  wrapper:
    ' amp-nav__wrapper flex items-center justify-between pr-15 pl-15 bg-white w-full h-inherit border-b-1 border-solid border-gray',
  iconMenu: 'amp-nav__hamburger bg-gray-300 position-absolute',
  navBtnContainer:
    'flex items-center justify-start amp-nav__container-menu lg:pr-10',
  btnContainer: 'flex items-center justify-end header__btn-container',
}

@Consumer
class NavBarDefault extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      statusSidebar: false,
    }
    // Resizer.setResizeListener()
    this.inputSearch = React.createRef()
  }

  render() {
    const { statusSidebar } = this.state
    const {
      contextPath,
      data: { children: sections = [] } = {},
      siteProperties: { footer },
      deployment,
    } = this.props

    const tapSidebar = 'tap:sidebar.toggle'
    return (
      <>
        <Menu
          sections={sections}
          showSidebar={statusSidebar}
          contextPath={contextPath}
          footer={footer}
          deployment={deployment}
        />
        <nav className={classes.nav}>
          <div className={classes.wrapper}>
            {/** ************* LEFT *************** */}

            <div className={classes.navBtnContainer}>
              <button
                type="button"
                tabindex="0"
                on={tapSidebar}
                className={classes.iconMenu}
              />
            </div>

            {/** ************* RIGHT *************** */}

            <div className={classes.btnContainer}>
              <AmpSocial />
            </div>
          </div>
        </nav>
      </>
    )
  }
}

export default NavBarDefault
