import schemaFilter from './schema-filter'
import { formatDayMonthYear } from '../../../../utilities/helpers'

export default class StandardHeader {
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

  // Función para formatear data de las secciones
  formatSections = () => {
    const link = 'link'
    const { children = [] } = this.data || {}
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
  // TODO: Crear función para formatear data de secciones con subsecciones

  getParams() {
    const sections = this.formatSections()
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
      logoLeft: {
        src: this.deployment(
          `${this.contextPath}/resources/dist/${this.arcSite}/images/otorongo.png`
        ),
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
