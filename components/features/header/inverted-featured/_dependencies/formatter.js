import { formatDayMonthYear } from '../../../../utilities/date-time/dates'
import { getAssetsPath } from '../../../../utilities/assets'

const LINK = 'link'

export default class StandardHeader {
  constructor(
    deployment,
    contextPath = '',
    siteDomain = '',
    headerProperties = {},
    arcSite = '',
    bandData = {},
    bandDataTema= {},
    menuData = {},
    customLogoTitle = '',
    customLogo = '',
    customLogoLink = '/',
    tags = 'HOY:',
    tagsTema = 'HOY:',
    showDate = false
  ) {
    this.deployment = deployment
    this.contextPath = contextPath
    this.siteDomain = siteDomain
    this.headerProperties = headerProperties
    this.arcSite = arcSite
    this.bandData = bandData
    this.bandDataTema = bandDataTema
    this.menuData = menuData
    this.customLogoTitle = customLogoTitle
    this.customLogo = customLogo
    this.customLogoLink = customLogoLink
    this.tags = tags
    this.tagsTema = tagsTema
    this.showDate = showDate
  }

  setBandData(bandData) {
    this.bandData = bandData
  }
  setBandDataTema(bandDataTema) {
    this.bandDataTema = bandDataTema
  }

  setMenuData(menuData) {
    this.menuData = menuData
  }

  formatData = (data = {}) => {
    const { children = [] } = data || {}
    return children.map((child) => {
      let name = child.node_type === LINK ? child.display_name : child.name
      const rawMatch = name.match(/\[#.*\]/g)
      const match =
        rawMatch === null
          ? ''
          : rawMatch[0].replace('[', '').replace(']', '').split(',')
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
    const bandLinksTema = this.formatData(this.bandDataTema)
    const { children: menuSections = [] } = this.menuData || {}

    const { inverted: logo, auxLogo } = this.headerProperties

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
      auxLogo: {
        src:
          this.customLogo ||
          `${getAssetsPath(this.arcSite, this.contextPath)}/resources/dist/${
            this.arcSite
          }/images/${auxLogo}?d=1`,
      },
      bandLinks,
      bandLinksTema,
      menuSections,
      date: {
        active: this.showDate,
        value: `LIMA - ${this.getDate()}`,
        raw: new Date(),
      },
      tags: this.tags,
      tagsTema: this.tagsTema
    }
  }
}
