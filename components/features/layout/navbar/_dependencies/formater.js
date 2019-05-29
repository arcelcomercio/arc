import Schema from './schema'

export default class NavbarFormater {
  constructor(props, selectDesing = 'standard') {
    const {
      deployment,
      contextPath = '',
      siteDomain = '',
      nav,
      arcSite = '',
      getContent,
    } = props
    this.deployment = deployment
    this.contextPath = contextPath
    this.siteDomain = siteDomain
    this.navProperties = nav
    this.arcSite = arcSite
    this.getContent = getContent

    this.selectDesing = selectDesing

    this.schema = Schema
  }

  getSchema() {
    return this.schema
  }

  setData(data) {
    this.data = data
  }

  get main() {
    return {
      fetchSections: this[this.selectDesing].fetchSections,
      getParams: this[this.selectDesing].getParams,
    }
  }

  // eslint-disable-next-line class-methods-use-this
  get somos() {
    return {
      fetchSections: () => {
        return 'fetch'
      },
      getParams: () => {
        return 'params'
      },
    }
    /* const { logoSomos } = this.navProperties
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
    } */
  }

  // eslint-disable-next-line class-methods-use-this
  get standard() {
    return {
      fetchSections: () => {
        return 'fetch'
      },
      getParams: () => {
        return 'params'
      },
    }
  }
}
