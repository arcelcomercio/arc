// import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import { FormatClassName } from '../../../resources/utilsJs/utilities'

const classes = FormatClassName({
  footer: ['footer-container'],
  footerInfo: ['footer-container__info'],
  footerSections: ['footer-container__sections'],
  footerContact: ['footer-container__contact'],
  footerSites: ['footer-container__sites'],
  footerSitesList: [
    'footer-container__sites-list',
    'flex',
    'flex--justify-center',
  ],
  footerSitesListElemnt: ['footer-container__sites-list-element'],
})

@Consumer
class PieDePagina extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    // this.fetch();
  }

  fetch() {
    const { fetched } = this.getContent()
    fetched.then(response => {
      console.log(response)
    })
  }

  render() {
    const { siteProperties, arcSite } = this.props
    console.log(this.props)
    return (
      <footer className={classes.footer}>
        <div className={classes.footerInfo}>1</div>
        <div className={classes.footerSections}>2</div>
        <div className={classes.footerContact}>3</div>
        <div className={classes.footerSites}>
          <ul className={classes.footerSitesList}>
            <li className={classes.footerSitesListElemnt}>Visite también:</li>
            {siteProperties.gecSites.map(site => {
              if (site.arcSite !== arcSite) {
                return (
                  <li className={classes.footerSitesListElemnt} key={site.url}>
                    <a href>{site.name}</a>
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

export default PieDePagina
