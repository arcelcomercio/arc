import schemaFilter from './schema-filter'

export default class NavbarFormater {
  constructor(props, customFields) {
    const {
      deployment,
      contextPath = '',
      siteDomain = '',
      nav,
      arcSite = '',
      getContent,
    } = props
    const { selectDesing = 'standard' } = customFields
    this.deployment = deployment
    this.contextPath = contextPath
    this.siteDomain = siteDomain
    this.navProperties = nav
    this.arcSite = arcSite
    this.getContent = getContent

    this.selectDesing = selectDesing
    // this.deviceList = { showInDesktop, showInTablet, showInMobile }
    this.schemaFilter = schemaFilter
  }

  get main() {
    return {
      initParams: this[this.selectDesing].initParams(),
      fetch: this[this.selectDesing].fetch()
        ? this[this.selectDesing].fetch()
        : false,
    }
  }

  get somos() {
    const { logoSomos } = this.navProperties
    return {
      initParams: () => {
        return {
          back: {
            logo: this.deployment(
              `${this.contextPath}/resources/dist/${
                this.arcSite
              }/images/${logoSomos}`
            ),
            link: this.contextPath,
            alt: this.siteDomain,
          },
          // TODO: Reemplazar por la función reutilizable
          searchUrl: query => {
            window.location.href = `${this.contextPath}/buscar?query=${query}`
          },
        }
      },
      fetch: () => {
        return false
      },
    }
  }

  get standard() {
    const { logoSomos } = this.navProperties
    return {
      initParams: () => {
        return {
          logo: this.deployment(
            `${this.contextPath}/resources/dist/${
              this.arcSite
            }/images/${logoSomos}`
          ),
        }
      },
      fetch: () => {
        const source = 'navigation-by-hierarchy'
        const params = {
          hierarchy: 'navbar-header-sections',
        }
        return {
          config: {
            source,
            params,
          },
          // colocar si se necesita modelar el reponse
          /* formatResponse: response => {
            return response
          }, */
        }
      },
    }
  }

  getSchema() {
    return this.schemaFilter
  }
}
