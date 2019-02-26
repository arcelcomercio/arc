// import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import { FormatClassName } from '../../../../resources/utilsJs/utilities'

const classes = FormatClassName({
  footer: ['footer-container', 'margin-top'],
  footerInfo: [
    'footer-container__info',
    'footer-container__footer-bacground-color',
  ],
  footerSections: [
    'footer-container__sections',
    'footer-container__footer-bacground-color',
  ],
  footerContact: [
    'footer-container__contact',
    'footer-container__footer-bacground-color',
  ],
  footerSites: ['footer-container__sites', 'flex', 'flex--justify-center'],
  footerSitesList: [
    'footer-container__sites-list',
    'flex',
    'flex--justify-center',
  ],
  footerSitesListElemnt: ['footer-container__sites-list-element'],
  footerSitesLink: ['footer-container__link', 'footer-container__sites-link'],
  footerLegalList: ['footer-container__legal-list'],
  footerLegalItem: ['footer-container__legal-item'],
  footerLogoContainer: ['footer-container__logo-container'],
  footerLogoImg: ['footer-container__logo-img'],
  footerList: ['footer-container__list'],
  footerListItem: ['footer-container__list-item'],
  footerListTitle: [
    'footer-container__list-item',
    'footer-container__list-item--title',
  ],
  footerListLink: ['footer-container__link', 'footer-container__list-link'],
})

@Consumer
class PieDePagina extends Component {
  constructor(props) {
    super(props)
    this.state = {
      device: this.setDevice(),
      legalList: [],
      sectionsList: [],
    }
  }

  componentDidMount() {
    this.addEventListener('displayChange', this.handleDevice)
    this.setState({
      legalList: [],
    })
    this.fetchByHierarchy('footer-legal-links')
    this.fetchByHierarchy('footer-sections')
  }

  setDevice = () => {
    const wsize = window.innerWidth

    if (wsize < 640) {
      return 'mobile'
    }
    if (wsize >= 640 && wsize < 1024) {
      return 'tablet'
    }
    return 'desktop'
  }

  handleDevice = device => {
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
    fetched.then(response => {
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
        case 'footer-legal-links':
          this.setState({ legalList: auxList })
          break
        case 'footer-sections':
          this.setState({ sectionsList: auxList })
          break
        default:
          break
      }
    })
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
