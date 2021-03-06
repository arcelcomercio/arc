import schemaFilter from './schema-filter'
import { getAssetsPath } from '../../../../utilities/assets'

const CONTENT_SOURCE = 'navigation-by-hierarchy'
const DEFAULT_HIERARCHY = 'menu-default'

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
    const { customLogoTitle = '', selectDesing = 'standard' } = customFields
    this.deployment = deployment
    this.contextPath = contextPath
    this.siteDomain = siteDomain
    this.navProperties = nav
    this.arcSite = arcSite
    this.getContent = getContent

    this.customLogoTitle = customLogoTitle
    this.selectDesing = selectDesing
    // this.deviceList = { showInDesktop, showInTablet, showInMobile }
    this.schemaFilter = schemaFilter
  }

  get main() {
    return {
      initParams:
        this[this.selectDesing] && this[this.selectDesing].initParams(),
      fetch:
        this[this.selectDesing] && this[this.selectDesing].fetch()
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
            logo: `${getAssetsPath(
              this.arcSite,
              this.contextPath
            )}/resources/dist/${this.arcSite}/images/${logoSomos}?d=1`,
            link: '/',
            alt: this.customLogoTitle,
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
          logo: `${getAssetsPath(
            this.arcSite,
            this.contextPath
          )}/resources/dist/${this.arcSite}/images/${logo}?d=1`,
          logoLeft: {
            src: `${getAssetsPath(
              this.arcSite,
              this.contextPath
            )}/resources/dist/${this.arcSite}/images/otorongo.png?d=1`,
            alt: this.customLogoTitle,
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
