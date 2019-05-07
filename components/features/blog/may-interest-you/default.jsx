import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import renderHTML from 'react-render-html'
import MayInterestYouCard from './_children/card'
import { getFullDateIso8601 } from '../../../../resources/utilsJs/helpers'

@Consumer
class BlogMayInterestYou extends PureComponent {
  /* constructor(props) {
    super(props)
    this.state = {}
  } */

  render() {
    const {
      globalContent: { post, user },
    } = this.props || {}
    const { post_content: postContent, post_date: postDate } = post || {}
    const { first_name: firstName } = user || {}
    const formatDate = getFullDateIso8601(postDate)
    const { day, month, fullYear, hours, minutes } = formatDate || {}
    return (
      <div className="bm-interest-you">
        Te puede interesar
        <MayInterestYouCard />
      </div>
    )
  }
}

BlogMayInterestYou.label = 'Blog - Te puede interesar'
// BlogMayInterestYou.static = true

export default BlogMayInterestYou
