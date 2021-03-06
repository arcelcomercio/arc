import schemaFilter from './schema-filter'
import { formatDayMonthYear } from '../../../../utilities/date-time/dates'
import { getAssetsPath } from '../../../../utilities/assets'

export default class SomosHeader {
  constructor(
    deployment,
    contextPath = '',
    siteDomain = '',
    headerProperties = {},
    arcSite = '',
    data = {},
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
    this.customLogo = customLogo
    this.customLogoLink = customLogoLink
    this.schema = schemaFilter
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

  // Función para formatear data de las secciones
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
  // TODO: Crear función para formatear data de secciones con subsecciones
}
