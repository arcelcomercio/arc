import { formatDayMonthYear } from '../../../../utilities/date-time/dates'
import { getAssetsPath } from '../../../../utilities/constants'

const LINK = 'link'

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

  formatData = (data = {}) => {
    const { children = [] } = data || {}
    return children.map(child => {
      let name = child.node_type === LINK ? child.display_name : child.name
      const rawMatch = name.match(/\[#.*\]/g)
      const match =
        rawMatch === null
          ? ''
          : rawMatch[0]
              .replace('[', '')
              .replace(']', '')
              .split(',')
      if (match) {
        name = name.replace(/\[#.*\]/g, '')
      }
      return {
        name,
        url: child.node_type === LINK ? child.url : child._id,
        styles: match,
      }
    })
  }

  getDate = () => {
    return formatDayMonthYear(new Date(), false, true) // date, showTime, isStatic
  }

  getParams() {
    const bandLinks = this.formatData(this.bandData)
    const { children: menuSections = [] } = this.menuData || {}

    const { inverted: logo, auxLogo } = this.headerProperties

    return {
      logo: {
        src:
          this.customLogo ||
          this.deployment(
            `${getAssetsPath(this.arcSite, this.contextPath)}/resources/dist/${
              this.arcSite
            }/images/${logo}`
          ),
        link: this.customLogoLink,
        alt: this.siteDomain,
      },
      auxLogo: {
        src:
          this.customLogo ||
          this.deployment(
            `${getAssetsPath(this.arcSite, this.contextPath)}/resources/dist/${
              this.arcSite
            }/images/${auxLogo}`
          ),
      },
      bandLinks,
      menuSections,
      date: {
        active: this.showDate,
        value: `LIMA - ${this.getDate()}`,
        raw: new Date(),
      },
      tags: this.tags,
    }
  }
}
