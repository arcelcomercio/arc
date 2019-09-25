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

  getParams() {
    const { children: menuSections = [] } = this.data || {}
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
      menuSections,
    }
  }
}
