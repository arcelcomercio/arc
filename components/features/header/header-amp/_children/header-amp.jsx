import React from 'react'

const classes = {
  header: 'amp-header w-full mx-auto',
  wrap:
    'amp-header__wrap bg-primary mx-auto flex items-center justify-between pl-20 pr-20',
  logo: 'amp-header__logo pt-5',
  linkContainer:
    'amp-header__link-container border-1 border-solid border-white text-sm rounded-sm line-h-xs flex items-center justify-center p-10',
  link: 'amp-header__link secondary-font',
  ampImg:
    'amp-header__amp-img i-amphtml-element i-amphtml-layout-fixed i-amphtml-layout-size-defined i-amphtml-layout',
  img:
    'i-amphtml-element i-amphtml-layout-fixed i-amphtml-layout-size-defined i-amphtml-layout',
}

const LayoutInvertedAmpHeader = ({
  imgLogo = '',
  widthAmp = '',
  heightAmp = '',
  arcSite = '',
}) => {
  return (
    <>
      <header className={classes.header}>
        <section className={classes.wrap}>
          <div className={classes.logo}>
            <a href="/">
              <amp-img
                src={imgLogo}
                width={widthAmp}
                height={heightAmp}
                alt={arcSite}
                tabIndex="0"
              />
            </a>
          </div>
          <div className={classes.linkContainer}>
            <a className={classes.link} href="/archivo">
              Últimas noticias
            </a>
          </div>
        </section>
      </header>
    </>
  )
}

LayoutInvertedAmpHeader.label = 'Cabecera de Página AMP - Sin Menú'

export default LayoutInvertedAmpHeader
