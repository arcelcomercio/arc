import { formatDayMonthYear } from '../../../../utilities/helpers'

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
    tags = '',
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

  formatBandData = () => {
    const link = 'link'
    const { children = [] } = this.bandData || {}
    return children.map(el => {
      return {
        name: el.node_type === link ? el.display_name : el.name,
        url: el.node_type === link ? el.url : el._id,
      }
    })
  }

  getDate = () => {
    return formatDayMonthYear(new Date(), false, true) // date, showTime, isStatic
  }

  getParams() {
    const bandLinks = this.formatBandData()
    const menuSections = []
    const archive = {
      name: 'Lo último',
      url: '/archivo',
    }
    const { logo } = this.headerProperties

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
      bandLinks: [archive, ...bandLinks],
      menuSections: [archive, ...menuSections],
      date: {
        active: this.showDate,
        value: this.getDate(),
      },
      tags: this.tags,
      // arcSite: this.arcSite,
    }
  }
}
