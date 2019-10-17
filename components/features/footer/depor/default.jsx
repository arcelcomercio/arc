import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import FooterDeporContent from './_children/Footer'

const DEFAULT_HIERARCHY = 'footer-default'

const CONTENT_SOURCE = 'navigation-by-hierarchy'

const SCHEMA = `{ 
  children {
    name
    _id
    display_name
    url
    node_type
    children {
      display_name
      url
    }
  }
}`
@Consumer
class FooterDepor extends PureComponent {
  constructor(props) {
    super(props)

    this.fetchContent({
      sections: {
        source: CONTENT_SOURCE,
        query: {
          website: 'depor',
          hierarchy: DEFAULT_HIERARCHY,
        },
        filter: SCHEMA,
      },
    })
  }

  render() {
    const { sections = {} } = this.state
    console.log(sections)
    return <FooterDeporContent />
  }
}

FooterDepor.label = 'Pié de página - Depor'
// FooterDepor.static = true

export default FooterDepor
