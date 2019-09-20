const LINK = 'link'

export default class SpecialHeader {
  constructor(
    deployment,
    contextPath = '',
    siteDomain = '',
    headerProperties = {},
    arcSite = '',
    data = {},
    customLogo = '',
    customLogoLink = '/'
  ) {
    this.deployment = deployment
    this.contextPath = contextPath
    this.siteDomain = siteDomain
    this.headerProperties = headerProperties
    this.arcSite = arcSite
    this.data = data
    this.customLogo = customLogo
    this.customLogoLink = customLogoLink
  }

  setData(data) {
    this.data = data
  }

  formatData = (data = {}) => {
    const { children = [] } = data || {}
    return children.map(child => ({
      name: child.node_type === LINK ? child.display_name : child.name,
      url: child.node_type === LINK ? child.url : child._id,
      children: child.children ? this.formatData(child) : [],
    }))
  }

  getParams() {
    const menuSections = this.formatData(this.data)
    const { special: logo } = this.headerProperties

    return {
      logo: {
        src:
          this.customLogo ||
          this.deployment(
            `${this.contextPath}/resources/dist/${this.arcSite}/images/${logo}`
          ),
        link: this.customLogoLink,
        alt: this.siteDomain,
      },
      menuSections: [...menuSections],
    }
  }
}
