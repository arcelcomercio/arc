export default class StandardHeader {
  constructor(
    contextPath = '',
    deployment,
    siteDomain = '',
    arcSite = '',
    data = {},
    headerType = 'standard',
    customLogo,
    customLogoLink
  ) {
    this.contextPath = contextPath
    this.deployment = deployment
    this.siteDomain = siteDomain
    this.arcSite = arcSite
    this.data = data
    this.headerType = headerType
    this.customLogo = customLogo
    this.customLogoLink = customLogoLink
    this.schema = this.getSchema()
  }

  setData(data) {
    this.data = data
  }

  getSchema() {
    switch (this.headerType) {
      case 'standard':
      case 'somos':
        this.schema = `{ 
            children {
              name
              _id
              display_name
              url
              node_type
            }
          }`
        break

      default:
        break
    }
  }

  getParams() {
    return this[this.headerType]()
  }

  standard() {
    const sections = this.formatSections()
    const newest = {
      name: 'Lo último',
      url: `${this.contextPath}/archivo`,
    }
    return {
      logo: {
        src:
          this.customLogo ||
          this.deployment(
            `${this.contextPath}/resources/dist/${this.arcSite}/images/logo.png`
          ),
        link: this.customLogoLink
          ? `${this.contextPath}${this.customLogoLink}`
          : this.contextPath,
        alt: this.siteDomain,
      },
      sections: [newest, ...sections],
    }
  }

  somos() {
    return {
      logo: {
        src:
          this.customLogo ||
          this.deployment(
            `${this.contextPath}/resources/dist/${this.arcSite}/images/logo.png`
          ),
        link: this.customLogoLink
          ? `${this.contextPath}${this.customLogoLink}`
          : this.contextPath,
        alt: this.siteDomain,
      },
      logoIcon: {
        link: this.contextPath,
      },
      firstSection: {
        url: `${this.contextPath}/somos`,
      },
      sections: this.formatSections(),
    }
  }

  // Función para formatear data de las secciones
  formatSections = () => {
    const link = 'link'
    const { children = [] } = this.data || {}
    return children.map(el => {
      return {
        name: el.node_type === link ? el.display_name : el.name,
        url: el.node_type === link ? el.url : `${this.contextPath}${el._id}`,
      }
    })
  }
  // TODO: Crear función para formatear data de secciones con subsecciones
}
