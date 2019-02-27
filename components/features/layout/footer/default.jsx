// import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import { FormatClassName } from '../../../../resources/utilsJs/utilities'

const classes = FormatClassName({
  footerContainer: ['margin-top'],
  footerTop: ['flex', 'flex--justify-center', 'footer-top'],
  footerTopColumn: ['footer-top__col'],
  footerSiteLogo: ['footer-top__col__site-logo'],
  footerSiteLegal: [
    'flex',
    'flex--column',
    'footer-top__col__ul',
    'footer-top__col__site-legal',
  ],
  footerTopMenus: [
    'flex',
    'flex--column',
    'footer-top__col__ul',
    'footer-top__col__menus',
  ],
  footerBottom: ['flex', 'flex--justify-center', 'footer-bot'],
  footerBottomList: ['flex', 'flex--justify-center'],
})

@Consumer
class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = { menus: [] }
    this.fetch()
  }

  fetch() {
    const { arcSite } = this.props
    // take only section's name
    const { fetched } = this.getContent(
      'site-navigation',
      { website: arcSite },
      '{ children { name } }'
    )
    fetched.then(response => {
      // console.log(response)
      this.castSection(response)
    })
  }

  castSection(res) {
    const { siteProperties } = this.props
    // temporary menus footer data
    let { menus } = siteProperties.footer
    // temporary structure
    const auxMenu = { title: '', path: '', list: [] }
    if (res) {
      menus = menus.filter((e, i) => i !== 0)
      auxMenu.title = 'Secciones'
      auxMenu.list = res.children.map(el => {
        return { name: el.name, path: '' }
      })
      menus = [auxMenu, ...menus]
      this.setState({ menus })
    } else {
      this.setState({ menus })
    }
  }

  render() {
    const { siteProperties } = this.props
    const {
      background,
      img,
      info,
      titleColor,
      textColor,
      gecColor,
    } = siteProperties.footer
    const { gecSites, siteUrl } = siteProperties
    const styles = {
      container: {
        backgroundColor: background,
      },
      titleColor: {
        color: titleColor,
        fontWeight: 'bold',
        fontSize: '16px',
      },
      textColor: {
        color: textColor,
      },
      gecColor: {
        color: gecColor,
      },
    }
    const { menus } = this.state
    return (
      <footer className={classes.footerContainer}>
        <div className={classes.footerTop} style={styles.container}>
          <div className={classes.footerTopColumn}>
            <a href="/" className={classes.footerSiteLogo}>
              <img src={img} alt="" />
            </a>
            <ul className={classes.footerSiteLegal}>
              {info.map((el, k) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={k} style={styles.textColor}>
                  {el}
                </li>
              ))}
            </ul>
          </div>
          {menus.map((el, keyID) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div className={classes.footerTopColumn} key={keyID}>
                <ul className={classes.footerTopMenus}>
                  <li>
                    <a style={styles.titleColor} >
                      {el.title}
                    </a>
                  </li>
                  {el.list.map((e, key) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <li key={key}>
                      <a style={styles.textColor} >
                        {e.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
        <div className={classes.footerBottom}>
          <ul className={classes.footerBottomList}>
            <li style={styles.gecColor}>Visite también:</li>
            {gecSites.map((site, key) => {
              if (site.name !== siteUrl) {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={key}>
                    <a href="/">{site.name}</a>
                  </li>
                )
              }
              return ''
            })}
          </ul>
        </div>
      </footer>
    )
  }
}

export default Footer
