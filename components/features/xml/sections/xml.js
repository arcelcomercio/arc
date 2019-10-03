// import React from 'react'
// import CustomElement from '../../../global-components/new-element'
/* import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import get from 'lodash.get'

const WEBSITE_ID = 'your_website_id'
 
@Consumer */
class XmlSections {
  constructor(props) {
    this.props = props
    /* const {
      customFields: {
        section,
        size = 3
      } = {}
    } = props

    this.fetchContent({
      section: {
        source: 'section',
        query: {
          website: WEBSITE_ID,
          id: section
        }
      },
      result: {
        source: 'stories-by-section',
        query: {
          website: WEBSITE_ID,
          section,
          size
        }
      }
    }) */
  }

  render() {
    /* const {
      section,
      result
    } = this.state || {}

    if (!section || !result) {
      return null
    } */

    // For the example, we will only include id, headline, and description for each story
    /* const xmlProps = {
      xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
      'xmlns:news': 'http://www.google.com/schemas/sitemap-news/0.9',
      'xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1',
    }

    return (
      <CustomElement nameElement="image:image" propsNewElement={xmlProps}>
        <CustomElement nameElement="test" />
      </CustomElement>
    ) */ /* {
      section: {
        id: section._id,
        name: section.name,
        stories: result.content_elements.map(story => ({
          story: {
            id: story._id,
            headline: get(story, 'headlines.basic', ''),
            description: get(story, 'description.basic', ''),
          },
        })),
      },
    } */

    return {
      person: {
        name: 'John',
        '@age': 35,
        address: {
          city: 'Istanbul',
        },
        phone: [
          { '#text': '555-1234', '@type': 'home' },
          { '#text': '555-1235', '@type': 'mobile' },
        ],
        id() {
          return 42
        },
      },
    }
  }
}

/* XmlSections.propTypes = {
  customFields: PropTypes.shape({
    section: PropTypes.string.tag({
      label: 'Section ID'
    }).isRequired,
    size: PropTypes.number.tag({
      label: '# of Stories',
      defaultValue: 3
    })
  })
} */

export default XmlSections
