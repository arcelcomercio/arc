import React from 'react'

const classes = {
  nav: 'nav full-width flex flex-center-vertical',
  navWrapper:
    'flex-center-vertical flex--justify-between nav__wrapper full-width height-inherit',
}

const NavBarTrome = () => {
  return (
    <nav className={classes.nav}>
      <div
        className={classes.navWrapper}
        style={{ backgroundColor: 'tomato' }}
      />
    </nav>
  )
}

export default NavBarTrome
