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
    customLogoTitle = '',
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
    this.customLogoTitle = customLogoTitle
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
    return formatDayMonthYear(new Date(), false, true) // date, showTime, isStatic
  }
  // TODO: Crear función para formatear data de secciones con subsecciones

  getParams() {
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
        alt: this.customLogoTitle,
      },
      logoLeft: {
        src: `${getAssetsPath(this.arcSite, this.contextPath)}/resources/dist/${
          this.arcSite
        }/images/otorongo.png?d=1`,
        alt: this.arcSite,
      },
      sections,
      date: {
        active: this.showDate,
        value: this.getDate(),
      },
      tags: this.tags,
      arcSite: this.arcSite,
    }
  }
}
