// import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import Resizer from '../../../../resources/utilsJs/resizer'

const classes = {
  footer: 'footer margin-top full-width',
  footerInfo: 'footer__info footer__footer-background-color padding-normal',
  footerSections: 'footer__sections footer__footer-background-color',
  footerContact: 'footer__contact footer__footer-background-color',
  footerSites: 'footer__sites flex flex--justify-center',
  footerSitesList: 'footer__sites-list flex flex--justify-center',
  footerSitesListElemnt: 'footer__sites-list-element',
  footerSitesLink: 'footer__link footer__sites-link',
  footerLegalList: 'footer__legal-list',
  footerLegalItem: 'footer__legal-item',
  footerLogoContainer: 'footer__logo footer__logo-container',
  footerLogoImg: 'footer__logo-img',
  footerList: 'footer__list padding-normal',
  footerListItem: 'footer__list-item',
  footerListTitle: 'footer__list-item footer__list-item--title',
  footerListLink: 'footer__link footer__list-link',
}

@Consumer
class PieDePagina extends Component {
  constructor(props) {
    super(props)
    this.state = {
      device: Resizer.setDevice(),
      legalList: [],
      sectionsList: [],
    }
  }

  componentDidMount() {
    this.addEventListener('displayChange', this._handleDevice)
    this.setState({
      legalList: [],
    })
    this.fetchByHierarchy('Navegacion-Pie_de_pagina-Contacto')
    this.fetchByHierarchy('Navegacion-Pie_de_pagina-secciones')
  }

  _handleDevice = device => {
    this.setState({
      device,
    })
  }

  fetchByHierarchy(hierarchy) {
    const { arcSite } = this.props

    const source = 'section__by-hierarchy'
    const params = {
      website: arcSite,
      hierarchy,
    }
    const schema = `{ 
      children {
        name
        _id
        display_name
        url
        node_type
      }
    }`

    const { fetched } = this.getContent(source, params, schema)
    fetched
      .then(response => {
        const auxList = response.children.map(el => {
          if (el.node_type === 'link') {
            return {
              name: el.display_name,
              url: el.url,
              node_type: el.node_type,
            }
          }
          return {
            name: el.name,
            // eslint-disable-next-line no-underscore-dangle
            url: el._id,
            node_type: el.node_type,
          }
        })
        switch (hierarchy) {
          case 'Navegacion-Pie_de_pagina-Contacto':
            this.setState({ legalList: auxList })
            break
          case 'Navegacion-Pie_de_pagina-secciones':
            this.setState({ sectionsList: auxList })
            break
          default:
            break
        }
      })
      .catch(e => console.log(e))
  }

  render() {
    const { siteProperties, arcSite, contextPath, requestUri } = this.props
    const { device, legalList, sectionsList } = this.state

    return (
      <footer className={classes.footer}>
        <div className={classes.footerInfo}>
          <a
            href={`${contextPath}${requestUri}`}
            className={classes.footerLogoContainer}
          >
            <img
              className={classes.footerLogoImg}
              src={`${contextPath}/resources/dist/${arcSite}/images/footer-logo.png`}
              alt=""
            />
          </a>
          <ul className={classes.footerLegalList}>
            {siteProperties.footer.siteLegal.map(el => (
              <li className={classes.footerLegalItem} key={el}>
                {el}
              </li>
            ))}
          </ul>
        </div>
        {device === 'desktop' && (
          <div className={classes.footerSections}>
            <ul className={classes.footerList}>
              <li className={classes.footerListTitle}>Nuestras secciones</li>
              {sectionsList.map(el => (
                <li className={classes.footerListItem} key={el.url}>
                  <a
                    className={classes.footerListLink}
                    href={`${contextPath}${el.url}${requestUri}`}
                  >
                    {el.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={classes.footerContact}>
          <ul className={classes.footerList}>
            <li className={classes.footerListTitle}>Contacto</li>
            {legalList.map(el => (
              <li className={classes.footerListItem} key={el.url}>
                <a
                  className={classes.footerListLink}
                  href={
                    el.node_type === 'link'
                      ? el.url
                      : `${contextPath}${el.url}${requestUri}`
                  }
                >
                  {el.name}
                </a>
              </li>
            ))}
          </ul>
          <ul className={classes.footerList}>
            <li className={classes.footerListTitle}>Síguenos</li>
            {siteProperties.footer.socialNetworks.map(el => (
              <li className={classes.footerListItem} key={el.url}>
                <a className={classes.footerListLink} href={el.url}>
                  {el.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={classes.footerSites}>
          <ul className={classes.footerSitesList}>
            <li className={classes.footerSitesListElemnt}>Visite también:</li>
            {siteProperties.gecSites.map(site => {
              if (site.arcSite !== arcSite) {
                return (
                  <li className={classes.footerSitesListElemnt} key={site.url}>
                    <a className={classes.footerSitesLink} href={site.url}>
                      {site.name}
                    </a>
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
