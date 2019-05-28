import Schema from './schema'

export default class NavbarFormater {
  constructor(
    deployment,
    contextPath = '',
    siteDomain = '',
    navProperties,
    arcSite = '',
    data = {},
    selectDesing = 'standard'
  ) {
    this.deployment = deployment
    this.contextPath = contextPath
    this.siteDomain = siteDomain
    this.navProperties = navProperties
    this.arcSite = arcSite
    this.data = data
    this.selectDesing = selectDesing

    this.schema = Schema
  }

  getSchema() {
    return this.schema
  }

  setData(data) {
    this.data = data
  }

  getParams() {
    return this[this.selectDesing]()
  }

  somos() {
    const { logoSomos } = this.navProperties
    return {
      logo: {
        src: this.deployment(
          `${this.contextPath}/resources/dist/${
            this.arcSite
          }/images/${logoSomos}`
        ),
        link: this.contextPath,
        alt: this.siteDomain,
      },
      logoIcon: {
        link: this.contextPath,
      },
      searchUrl: query => {
        window.location.href = `${this.contextPath}/buscar?query=${query}`
      },
    }
  }

  // eslint-disable-next-line class-methods-use-this
  standard() {
    return ''
  }
}
