import { formatDayMonthYear } from '../../../../utilities/helpers'

const LINK = 'link'
const BAND = 'band'
const MENU = 'menu'

export default class StandardHeader {
  constructor(
    deployment,
    contextPath = '',
    siteDomain = '',
    headerProperties = {},
    arcSite = '',
    bandData = {},
    menuData = {},
    customLogo = '',
    customLogoLink = '/',
    tags = 'HOY INTERESA',
    showDate = false
  ) {
    this.deployment = deployment
    this.contextPath = contextPath
    this.siteDomain = siteDomain
    this.headerProperties = headerProperties
    this.arcSite = arcSite
    this.bandData = bandData
    this.menuData = menuData
    this.customLogo = customLogo
    this.customLogoLink = customLogoLink
    this.tags = tags
    this.showDate = showDate
  }

  setBandData(bandData) {
    this.bandData = bandData
  }

  setMenuData(menuData) {
    this.menuData = menuData
  }

  formatData = (data = {}, type = BAND) => {
    const { children = [] } = data || {}
    return children.map(child => ({
      name: child.node_type === LINK ? child.display_name : child.name,
      url: child.node_type === LINK ? child.url : child._id,
      children:
        type === MENU && child.children ? this.formatData(child, MENU) : [],
    }))
  }

  getDate = () => {
    return formatDayMonthYear(new Date(), false, true) // date, showTime, isStatic
  }

  getParams() {
    const bandLinks = this.formatData(this.bandData, BAND)
    const menuSections = this.formatData(this.menuData, MENU)

    const { inverted: logo, auxLogo } = this.headerProperties

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
      auxLogo: {
        src:
          this.customLogo ||
          this.deployment(
            `${this.contextPath}/resources/dist/${this.arcSite}/images/${auxLogo}`
          ),
      },
      bandLinks,
      menuSections: [...menuSections],
      date: {
        active: this.showDate,
        value: `LIMA - ${this.getDate()}`,
        raw: new Date(),
      },
      tags: this.tags,
    }
  }
}
