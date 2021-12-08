import * as React from 'react'

// import Button from '../../../../global-components/button'
import searchQuery from '../../../../utilities/client/search'
// import SignwallComponent from '../../../signwall/main/default'
// import { slugify } from '../../../utilities/parse/slugify'

// const rutaArchivos = "https://cdna.depor.com/resources/dist/depor/premios-depor/"
const classes = {
  box: 'premios_depor__header__box',
  boxMob: 'premios_depor__header__boxMob',
  cont: 'premios_depor__header__cont',
  contLeft: 'premios_depor__header__cont__contLeft',
  flecha: 'premios_depor__header__cont__contLeft__flecha',
  logo: 'premios_depor__header__cont__contLeft__logo',
  contRight: 'premios_depor__header__cont__contRight',
  terminos: 'premios_depor__header__cont__contRight__terminos',
  buttonBef: 'premios_depor__header__cont__contRight__button--befor',
  buttonAft: 'premios_depor__header__cont__contRight__button--after',
  menu: 'premios_depor__header__cont__menu',
}

let isMobile
if (typeof window !== 'undefined')
  isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
    window.navigator.userAgent
  )

class HeaderChildPremiosDepor extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isSearchActive: false,
      searchInputText: '',
    }
    this.searchInput = React.createRef()
  }

  handleSearchInput(e) {
    this.setState({ searchInputText: e.target.value })
  }

  handleSubmit(e) {
    const { searchInputText } = this.state
    searchQuery(searchInputText)
    e.preventDefault()
  }

  toggleSearchInputs() {
    const { isSearchActive } = this.state
    this.setState({ isSearchActive: !isSearchActive })
  }

  render() {
    const { device, deviceList } = this.props

    const handleHide = () => {
      switch (device) {
        case 'desktop':
          return deviceList.showInDesktop

        case 'tablet':
          return deviceList.showInTablet

        case 'mobile':
          return deviceList.showInMobile

        default:
          return true
      }
    }

    return (
      handleHide() && (
        <div className={` ${isMobile ? classes.boxMob : classes.box} `}>
          <div className={classes.cont}>
            <div className={classes.contLeft}>
              <div className={classes.flecha}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16px"
                  height="16px"
                  style={{
                    enableBackground: 'new 0 0 24 24',
                  }}
                  xmlSpace="preserve">
                  <path
                    d="M0 0h24v24H0V0z"
                    style={{
                      fill: 'none',
                    }}
                  />
                  <path
                    d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z"
                    style={{
                      fill: '#fff',
                    }}
                  />
                </svg>
              </div>
              <div className={classes.logo}>
                <svg
                  data-name="Capa 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 28">
                  <path
                    style={{
                      fill: 'none',
                    }}
                    d="M0 0h64v28H0z"
                  />
                  <path
                    data-name="Trazado 79183"
                    d="m56.44 23.82 1.75-10c.43-2.42 1.63-3.61 3.27-3.61a4.53 4.53 0 0 1 1.37.18L64 5.48a4.67 4.67 0 0 0-1.49-.21c-1.25 0-2.57.69-3.75 2.51h-.09l.13-2.3-3.67.15-3.2 18.19Zm-12-9c.88-4.92 1.38-5.58 2.56-5.58s1.43.69.58 5.53-1.36 5.52-2.5 5.52-1.5-.65-.64-5.52m7.77 0c1.31-7.41-.3-9.5-4.51-9.5s-6.61 2.09-7.91 9.5.36 9.47 4.54 9.47 6.56-2 7.88-9.47m-17.89-.42c-.87 5-1.54 5.7-2.59 5.7-.68 0-1-.57-1.07-1.2l1.45-8.21a1.85 1.85 0 0 1 1.59-1.17c1.11 0 1.38.69.64 4.84m4.6.36c1.33-7.53-.29-9.38-3.33-9.38a5.35 5.35 0 0 0-3.53 1.4l-.44-1.28-3.14.21-3.92 22.25h4.51l.4-2.3.36-2.33h.09a3 3 0 0 0 2.25.8c3.25 0 5.66-3.13 6.75-9.35m-20.22-1.95c.59-2.84 1.05-3.41 2.15-3.41s1.32.66.87 3.41Zm.57 11.35a12.52 12.52 0 0 0 4.48-.87l.26-4a8.37 8.37 0 0 1-3.45.75c-2.21 0-2.8-.87-2.45-3.74h7.11c.22-.9.44-1.79.6-2.68 1.07-6.1-.49-8.25-4.34-8.25-4.19 0-6.56 2.78-7.68 9.17-1.18 6.66.42 9.62 5.47 9.62m-12.12-5.2A1.64 1.64 0 0 1 5.66 20c-1.16 0-1.44-.63-.66-5.29.8-4.3 1.33-5.11 2.53-5.11a1.1 1.1 0 0 1 1.14.78Zm3.64 4.93L15 .13l-4.56.21L9.81 4l-.37 2.35-.07.06a3 3 0 0 0-2.48-1.17c-3 0-5.27 2.63-6.45 9.29-1.23 7 .19 9.59 3.33 9.59a4.39 4.39 0 0 0 3.38-1.53h.09l.14 1.23Z"
                    style={{
                      fill: '#fff',
                    }}
                  />
                </svg>
              </div>
            </div>
            {isMobile ? (
              <div className={classes.menu}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24px"
                  height="24px"
                  style={{
                    enableBackground: 'new 0 0 24 24',
                  }}
                  xmlSpace="preserve">
                  <path
                    d="M0 0h24v24H0V0z"
                    style={{
                      fill: 'none',
                    }}
                  />
                  <path
                    d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
                    style={{
                      fill: '#fff',
                    }}
                  />
                </svg>
              </div>
            ) : (
              <>
                <div className={classes.contRight}>
                  <div className={classes.terminos}>
                    <span>TÉRMINOS Y CONDICIONES</span>
                  </div>
                  <div className={classes.buttonAft}>MENSAJE</div>
                </div>
              </>
            )}
          </div>
        </div>
      )
    )
  }
}

export default HeaderChildPremiosDepor
