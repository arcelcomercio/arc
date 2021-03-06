import schemaFilter from './schema-filter'
import { formatDayMonthYear } from '../../../../utilities/date-time/dates'
import { getAssetsPath } from '../../../../utilities/assets'

export default class StandardHeader {
  constructor(
    deployment,
    contextPath = '',
    siteDomain = '',
    headerProperties = {},
    arcSite = '',
    data = {},
    headerType = 'standard',
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
    this.data = data
    this.headerType = headerType
    this.customLogo = customLogo
    this.customLogoLink = customLogoLink
    this.schema = schemaFilter(headerType)
    this.tags = tags
    this.showDate = showDate
  }

  getSchema() {
    return this.schema
  }

  setData(data) {
    this.data = data
  }

  getParams() {
    return this[this.headerType]()
  }

  standard() {
    const sections = this.formatSections()

    const { logo } = this.headerProperties
    return {
      logo: {
        src:
          this.customLogo ||
          `${getAssetsPath(this.arcSite, this.contextPath)}/resources/dist/${
            this.arcSite
          }/images/${logo}?d=1`,
        link: this.customLogoLink,
        alt: this.siteDomain,
      },
      sections,
      date: {
        active: this.showDate,
        value: this.getDate(),
      },
      tags: this.tags,
    }
  }

  somos() {
    const { logo } = this.headerProperties
    return {
      logo: {
        src:
          this.customLogo ||
          `${getAssetsPath(this.arcSite, this.contextPath)}/resources/dist/${
            this.arcSite
          }/images/${logo}?d=1`,
        link: this.customLogoLink,
        alt: this.siteDomain,
      },
      logoIcon: {
        link: '/',
      },
      firstSection: {
        url: '/somos',
      },
      sections: this.formatSections(),
      date: {
        active: this.showDate,
        value: this.getDate(),
      },
      tags: this.tags,
    }
  }

  // Funci??n para formatear data de las secciones
  formatSections = () => {
    const link = 'link'
    const { children = [] } = this.data || {}
    return children.map(el => {
      let name = el.node_type === link ? el.display_name : el.name
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
        url: el.node_type === link ? el.url : el._id,
        styles: match,
      }
    })
  }

  getDate = () => {
    return formatDayMonthYear(new Date(), false)
  }
  // TODO: Crear funci??n para formatear data de secciones con subsecciones
}
