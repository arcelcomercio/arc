import schemaFilter from './schema-filter'

const CONTENT_SOURCE = 'navigation-by-hierarchy'
const DEFAULT_HIERARCHY = 'navbar-default'

export default class NavbarFormater {
  constructor(props, customFields) {
    const {
      deployment,
      nav,
      getContent,
      contextPath = '',
      siteDomain = '',
      arcSite = '',
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
            link: '/',
            alt: this.siteDomain,
          },
        }
      },
      fetch: () => {
        return false
      },
    }
  }

  get standard() {
    const { logo } = this.navProperties
    return {
      initParams: () => {
        return {
          logo: this.deployment(
            `${this.contextPath}/resources/dist/${this.arcSite}/images/${logo}`
          ),
          logoLeft: {
            src: this.deployment(
              `${this.contextPath}/resources/dist/${
                this.arcSite
              }/images/otorongo.png`
            ),
            alt: this.arcSite,
          },
        }
      },
      fetch: () => {
        const source = CONTENT_SOURCE
        const params = {
          hierarchy: DEFAULT_HIERARCHY,
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
