// import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import { setDevice } from '../../../utilities/resizer'

const classes = {
  footer: 'footer full-width',
  info: 'footer__info footer__footer-background-color padding-normal',
  sections: 'footer__sections footer__footer-background-color',
  contact: 'footer__contact footer__footer-background-color',
  sites: 'footer__sites flex justify-center',
  sitesList: 'footer__sites-list flex justify-center flex-wrap full-width',
  sitesItem: 'footer__sites-list-element',
  sitesLink: 'footer__sites-link',
  legalList: 'footer__legal-list',
  legalItem: 'footer__legal-item',
  logoContainer: 'footer__logo footer__logo-container',
  logoImg: 'full-width',
  list: 'footer__list padding-normal',
  listItem: 'footer__list-item',
  listTitle: 'footer__list-item footer__list-item--title',
  listLink: 'footer__list-link capitalize',
}

@Consumer
class LayoutFooter extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      device: setDevice(),
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

    const source = 'navigation-by-hierarchy'
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
        const { children = [] } = response || {}
        const auxList = children.map(el => {
          if (el.node_type === 'link') {
            return {
              name: el.display_name,
              url: el.url,
              node_type: el.node_type,
            }
          }
          return {
            name: el.name,
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
      .catch(e => {
        throw new Error(e)
      })
  }

  render() {
    const {
      deployment,
      contextPath,
      requestUri,
      arcSite,
      siteProperties: {
        gecSites,
        footer,
        assets: {
          footer: { logo },
        },
      },
    } = this.props

    const logoUrl =
      deployment(`${contextPath}/resources/dist/${arcSite}/images/${logo}`) ||
      ''

    const { device, legalList, sectionsList } = this.state

    const querys = requestUri.split('?')[1]
    const queryString = querys !== undefined ? `?${querys}` : ''

    return (
      <footer className={classes.footer}>
        <div className={classes.info}>
          <a
            href={`${contextPath || ''}/${queryString}`}
            className={classes.logoContainer}>
            <img className={classes.logoImg} src={logoUrl} alt="" />
          </a>
          <ul className={classes.legalList}>
            {footer.siteLegal.map(el => (
              <li className={classes.legalItem} key={el}>
                {el}
              </li>
            ))}
          </ul>
        </div>
        {device === 'desktop' && (
          <div className={classes.sections}>
            <ul className={classes.list}>
              <li className={classes.listTitle}>Nuestras secciones</li>
              {sectionsList.map(el => (
                <li className={classes.listItem} key={el.url}>
                  <a
                    className={classes.listLink}
                    href={`${contextPath}${el.url}${requestUri}`}>
                    {el.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={classes.contact}>
          <ul className={classes.list}>
            <li className={classes.listTitle}>Contacto</li>
            {legalList.map(el => (
              <li className={classes.listItem} key={el.url}>
                <a
                  className={classes.listLink}
                  href={
                    el.node_type === 'link'
                      ? el.url
                      : `${contextPath}${el.url}${requestUri}`
                  }>
                  {el.name}
                </a>
              </li>
            ))}
          </ul>
          <ul className={classes.list}>
            <li className={classes.listTitle}>Síguenos</li>
            {footer.socialNetworks.map(el => (
              <li className={classes.listItem} key={el.url}>
                <a className={classes.listLink} href={el.url}>
                  {el.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={classes.sites}>
          <ul className={classes.sitesList}>
            <li className={classes.sitesItem}>Visite también:</li>
            {gecSites.map(site => {
              if (site.arcSite !== arcSite) {
                return (
                  <li className={classes.sitesItem} key={site.url}>
                    <a className={classes.sitesLink} href={site.url}>
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

LayoutFooter.label = 'Pie de Página'

export default LayoutFooter
