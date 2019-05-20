import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import Image from '@arc-core-components/element_image'
import schemaFilter from '../../separator/_dependencies/schema-filter'

// Basic flex stuff
const classes = {
  related: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  wordWrap: 'break-word',
}
@Consumer
class RelatedContent extends Component {
  constructor(props) {
    super(props)
    console.log(props.data.basic)
    this.state = {
      basicRelatedContent: props.data.basic,
    }
  }

  getContentApi = id => {
    let newsNumber = 7
    const { device } = this.state

    if (device === 'mobile') newsNumber = 0

    const { arcSite } = this.props
    const { fetched } = this.getContent(
      'story-by-id',
      {
        website: arcSite,
        id,
        news_number: newsNumber,
      },
      schemaFilter
    )
    fetched.then(response => {
      const { content_elements: contentElements } = response || {}
      return contentElements || []
    })
  }

  renderRelatedContentElement(item, index) {
    const log = this.getContentApi(item.id)
    console.log(this.getContentApi(item.id))
    debugger
    const {
      credits,
      headlines = {},
      canonical_url: url,
      promo_items = { basic: {} },
      taxonomy = { primary_section: {} },
    } = this.getContentApi(item)

    debugger

    const authors = credits.by
    const { basic: basicHeadline } = headlines
    const { basic: basicImage } = promo_items
    const { url: imageUrl } = basicImage
    const { name: sectionName } = taxonomy.primary_section

    // eslint-disable-next-line consistent-return
    return (
      <Fragment>
        <div className={classes.related}>
          <div>{sectionName}</div>
          <h3>
            <a href={url}>{basicHeadline}</a>
          </h3>
          <div>
            <Image url={imageUrl} />
          </div>
          <div>
            {authors.map(author => (
              <div>{author.name}</div>
            ))}
          </div>
          <div>{date}</div>
        </div>
      </Fragment>
    )
  }

  render() {
    return (
      <div>
        {this.state.basicRelatedContent.map((item, index) =>
          this.renderRelatedContentElement(item.referent, index)
        )}
      </div>
    )
  }
}

export default RelatedContent
