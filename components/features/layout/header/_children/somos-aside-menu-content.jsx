import React from 'react'

const classes = {
  headmenu: 'header-somos__content-menu',
  headerclosemenu: 'header-somos__header-close',
  closemenu: 'header-somos__btn-close',
  mobilesearch: 'header-somos__mobile-search',
  searchtext: 'header-somos__search-text',
  searchbutton: 'header-somos__search-button',
  contentformsearch: 'header-somos__content-form',

  colortmp:'header-somos__color-tmp'

}

const HeaderSomosChildContent = () => {
  return (
    <div className={classes.headmenu}>
      <div className={classes.headerclosemenu}>
        <button className={classes.closemenu}>X</button>
      </div>
      <div className={classes.mobilesearch}>
        <form action="">
          <div className={classes.contentformsearch}>
            <input
              type="text"
              placeholder="Buscar"
              className={classes.searchtext}
            />
            <button type="submit" className={classes.searchbutton}>
              B
            </button>
          </div>
        </form>
      </div>
      <div className={classes.colortmp}>
        user
      </div>
      <div className={classes.colortmp}>
        Historia
      </div>
      <div className={classes.colortmp}>
        Firmas
      </div>
      <div className={classes.colortmp}>
        Test de proust
      </div>
      <div className={classes.colortmp}>
          videos
      </div>
      <div className={classes.colortmp}>
          fotos
      </div>
      <div className={classes.colortmp}>
          somos ov
      </div>
    </div>
  )
}

export default HeaderSomosChildContent
