import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import AmpSocial from '../../../story/social/_children/amp-social'

const classes = {
  nav:
    'amp-nav top-0 text-sm w-full flex flex items-center font-bold text-white',
  wrapper:
    ' amp-nav__wrapper flex items-center justify-between pr-15 pl-15 bg-white w-full h-inherit border-b-1 border-solid border-gray mx-auto',
  iconMenu: 'amp-nav__hamburger bg-gray-300 position-relative',
  navBtnContainer:
    'amp-nav__container-menu mt-10 flex items-center justify-start ',
  btnContainer: 'flex items-center justify-end header__btn-container',
}

@Consumer
class NavBarDefault extends PureComponent {
  render() {
    const tapSidebar = 'tap:sidebar.toggle'
    return (
      <>
        <nav className={classes.nav}>
          <div className={classes.wrapper}>
            {/** ************* LEFT *************** */}

            <div className={classes.navBtnContainer}>
              <button
                type="button"
                // eslint-disable-next-line react/no-unknown-property
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
