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
    const newest = {
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
      sections: [newest, ...sections],
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
          this.deployment(
            `${this.contextPath}/resources/dist/${this.arcSite}/images/${logo}`
          ),
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
      // TODO: Reemplazar por el nuevo formato de url para las busquedas (sin querystrings)
      searchUrl: query => {
        window.location.href = `/buscar?query=${query}`
      },
    }
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
    return formatDayMonthYear(new Date(), true)
  }
  // TODO: Crear función para formatear data de secciones con subsecciones
}
