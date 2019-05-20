export default class StandardHeader {
  constructor(
    contextPath = '',
    deployment,
    siteDomain = '',
    arcSite = '',
    data = {}
  ) {
    this.contextPath = contextPath
    this.deployment = deployment
    this.siteDomain = siteDomain
    this.arcSite = arcSite
    this.data = data
  }

  getParams(headerType) {
    return this[headerType]()
  }

  standard() {
    const link = 'link'
    const { children = [] } = this.data || {}
    const sections = children.map(el => {
      return {
        name: el.node_type === link ? el.display_name : el.name,
        url: el.node_type === link ? el.url : `${this.contextPath}${el._id}`,
      }
    })
    const newest = {
      name: 'Lo último',
      url: `${this.contextPath}/archivo`,
    }
    const params = {
      logo: {
        src: this.deployment(
          `${this.contextPath}/resources/dist/${this.arcSite}/images/logo.png`
        ),
        link: this.contextPath,
        alt: this.siteDomain,
      },
      sections: [newest, ...sections],
    }
    return params
  }

  somos() {
    const params = {
      contextPath: this.contextPath,
      deployment: this.deployment,
      siteDomain: this.siteDomain,
      arcSite: this.arcSite,
      sections: this.sections,
    }
    return params
  }
}
