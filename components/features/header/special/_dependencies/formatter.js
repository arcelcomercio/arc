import { getAssetsPath } from '../../../../utilities/assets'

export default class SpecialHeader {
  constructor(
    deployment,
    contextPath = '',
    siteDomain = '',
    headerProperties = {},
    arcSite = '',
    data = {},
    customLogoTitle = '',
    customLogo = '',
    customLogoLink = '/'
  ) {
    this.deployment = deployment
    this.contextPath = contextPath
    this.siteDomain = siteDomain
    this.headerProperties = headerProperties
    this.arcSite = arcSite
    this.data = data
    this.customLogoTitle = customLogoTitle
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
          `${getAssetsPath(this.arcSite, this.contextPath)}/resources/dist/${
            this.arcSite
          }/images/${logo}?d=1`,
        link: this.customLogoLink,
        alt: this.customLogoTitle,
      },
      menuSections,
    }
  }
}
