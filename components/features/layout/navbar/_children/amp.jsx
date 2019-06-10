import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import AmpSocial from '../../../story/header/_children/amp-social'
import Menu from './amp-menu'

const classes = {
  nav: 'amp-nav text-sm full-width flex flex-center-vertical',
  wrapper:
    'flex-center-vertical flex--justify-between amp-nav__wrapper full-width height-inherit',
  iconMenu: 'amp-nav__hamburguer',
  navBtnContainer:
    'flex-center-vertical flex--justify-start nav__container-menu',
  btnContainer: 'flex-center-vertical flex--justify-end header__btn-container',
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
      <nav className={classes.nav}>
        <div className={classes.wrapper}>
          {/** ************* LEFT *************** */}

          <div className={classes.navBtnContainer}>
            <button
              type="button"
              on={tapSidebar}
              className={classes.iconMenu}
            />
          </div>

          {/** ************* RIGHT *************** */}

          <div className={classes.btnContainer}>
            <AmpSocial />
          </div>
        </div>

        <Menu
          sections={sections}
          showSidebar={statusSidebar}
          contextPath={contextPath}
          footer={footer}
          deployment={deployment}
        />
      </nav>
    )
  }
}

export default NavBarDefault
