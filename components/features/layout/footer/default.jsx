// import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
// import withSizes from 'react-sizes'

const classes = {
  footer: 'footer w-full grid',
  info: 'footer__info p-20  bg-primary position-relative',
  sections: 'footer__sections  bg-primary position-relative md:pt-20 pb-20',
  contact: 'footer__contact  bg-primary md:pt-20 pb-20',
  sites: 'footer__sites flex flex-col mt-15 pl-30 pr-30 pb-20',
  sitesList: 'footer__sites-list flex flex-wrap w-full p-0 pt-20 bg-gray-100',
  sitesItem:
    'footer__sites-item mb-5 pr-10 text-sm text-gray-300 line-h-xs uppercase flex items-center',
  sitesItemTitle: 'text-sm text-gray-300 line-h-xs uppercase',
  sitesLink: 'footer__sites-link text-gray-200',
  legalList: 'footer__legal-list text-md',
  legalItem:
    'footer__legal-item mb-10 text-gray-200 line-h-none text-xs primary-font',
  logoContainer: 'footer__logo footer__logo-container block mb-15',
  logoImg: 'w-full',
  list: 'footer__list pt-0 pb-20 pr-20 pl-20 md:pl-30',
  listItem: 'footer__list-item pt-10',
  listTitle: 'footer__list-title  pt-10 pb-10 uppercase text-sm text-gray-200',
  listLink: 'footer__list-link capitalize text-gray-200 text-sm',
  textContent: 'pt-20 pb-0 pl-20',
  socialTitle: 'footer__social-title mb-20 uppercase text-sm',
  listSocial: 'footer__social flex pl-20',
  listSocialItem: 'footer__social-item',
  listSocialLink: 'footer__social-link',
  facebookIcon: 'footer__social-icon icon-facebook pr-15',
  twitterIcon: 'footer__social-icon icon-twitter',
}

const CONTENT_SOURCE = 'navigation-by-hierarchy'
const DEFAULT_SECTIONS_HIERARCHY = 'Navegacion-Pie_de_pagina-secciones'
const DEFAULT_CONTACTS_HIERARCHY = 'Navegacion-Pie_de_pagina-Contacto'
const SCHEMA = `{ 
  children {
    name
    _id
    display_name
    url
    node_type
  }
}`

@Consumer
class LayoutFooter extends PureComponent {
  constructor(props) {
    super(props)
    const {
      customFields: {
        sectionsHierarchyConfig: {
          contentConfigValues: { hierarchy: sectionsHierarchy = '' } = {},
        } = {},
        contactsHierarchyConfig: {
          contentConfigValues: { hierarchy: contactsHierarchy = '' } = {},
        } = {},
      } = {},
    } = this.props

    this.fetchContent({
      sections: {
        source: CONTENT_SOURCE,
        query: {
          hierarchy: sectionsHierarchy || DEFAULT_SECTIONS_HIERARCHY,
        },
        filter: SCHEMA,
      },
      contacts: {
        source: CONTENT_SOURCE,
        query: {
          hierarchy: contactsHierarchy || DEFAULT_CONTACTS_HIERARCHY,
        },
        filter: SCHEMA,
      },
    })
  }

  formatData = res => {
    const { children = [] } = res || {}
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
    return auxList
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

    const { sections: rawSections = [], contacts: rawContacts = [] } =
      this.state || {}
    const sections = this.formatData(rawSections)
    const contacts = this.formatData(rawContacts)

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

        <div className={classes.sections}>
          <ul className={classes.list}>
            <li className={classes.listTitle}>Nuestras secciones</li>
            {sections.map(el => (
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

        <div className={classes.contact}>
          <ul className={classes.list}>
            <li className={classes.listTitle}>Contacto</li>
            {contacts.map(el => (
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
          <div className={classes.textContent}>
            <p className={classes.socialTitle}>Síguenos</p>
          </div>
          <ul className={classes.listSocial}>
            <li className={classes.listSocialItem}>
              <a
                href="https://www.facebook.com/elcomercio.pe"
                className={classes.listSocialLink}>
                <i className={classes.facebookIcon} />
              </a>
            </li>
            <li className={classes.listSocialItem}>
              <a
                href="https://twitter.com/elcomercio_peru"
                className={classes.listSocialLink}>
                <i className={classes.twitterIcon} />
              </a>
            </li>
          </ul>
        </div>
        <div className={classes.sites}>
          <p className={classes.sitesItemTitle}>Red el comercio</p>
          <ul className={classes.sitesList}>
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

LayoutFooter.propTypes = {
  customFields: PropTypes.shape({
    sectionsHierarchyConfig: PropTypes.contentConfig('navigation').tag({
      name: 'Editar navegación de "secciones"',
      group: 'Configuración del contenido',
    }),
    contactsHierarchyConfig: PropTypes.contentConfig('navigation').tag({
      name: 'Editar navegación de "contactos"',
      group: 'Configuración del contenido',
    }),
  }),
}

export default LayoutFooter
