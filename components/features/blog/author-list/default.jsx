import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import PostItem from './_children/post-item'
import Pagination from '../../../global-components/pagination'
import { customFields } from '../_dependencies/custom-fields'
import { defaultImage, getFullDateIso8601 } from '../../../utilities/helpers'
import Ads from '../../../global-components/ads'

const classes = {
  adsBox: 'flex items-center flex-col no-desktop pb-20',
}
@Consumer
class BlogAuthorList extends PureComponent {
  hasAds = (index, adsList) => adsList.filter(el => el.pos === index)

  render() {
    const {
      contextPath,
      deployment,
      requestUri,
      globalContent,
      globalContentConfig,
      arcSite = '',
      customFields: customFieldsProps = {},
      siteProperties: { isDfp = false },
    } = this.props

    const {
      posts = [],
      user: { first_name: author = 'Gestion' } = {},
      blog: { count_posts: countPosts = '' } = {},
    } = globalContent || {}

    const {
      query: {
        posts_limit: postsLimit = '',
        posts_offset: postsOffset = '',
      } = {},
    } = globalContentConfig || {}

    const activeAds = Object.keys(customFieldsProps)
      .filter(prop => prop.match(/adsMobile(\d)/))
      .filter(key => customFieldsProps[key] === true)

    const typeSpace = isDfp ? 'caja' : 'movil'

    const activeAdsArray = activeAds.map(el => {
      return {
        name: `${typeSpace}${el.slice(-1)}`,
        pos: customFieldsProps[`adsMobilePosition${el.slice(-1)}`] || 0,
        inserted: false,
      }
    })

    return (
      <div>
        {posts.map((post, i) => {
          const key = `post-${i}-${post.ID}`
          const ads = this.hasAds(i + 1, activeAdsArray)
          const {
            post_title: postTitle,
            post_permalink: postPermaLink,
            post_date: postDate,
            post_thumbnail: {
              guid: image = defaultImage({
                deployment,
                contextPath,
                arcSite,
                size: 'sm',
              }),
            } = {},
          } = post
          const { day, month, fullYear } = getFullDateIso8601(postDate)
          const data = {
            postTitle,
            postPermaLink: `/blog/${postPermaLink}`,
            postDate: `${day}/${month}/${fullYear}`,
            image,
            author,
          }
          return (
            <>
              <PostItem key={key} {...data} />
              {ads.length > 0 && (
                <div className={classes.adsBox}>
                  <Ads
                    adElement={ads[0].name}
                    isDesktop={false}
                    isMobile
                    isDfp={isDfp}
                  />
                </div>
              )}
            </>
          )
        })}
        <Pagination
          totalElements={countPosts}
          storiesQty={postsLimit}
          currentPage={postsOffset || 1}
          requestUri={requestUri}
        />
      </div>
    )
  }
}

BlogAuthorList.propTypes = {
  customFields,
}

BlogAuthorList.label = 'Blog - Posts por autor'
BlogAuthorList.static = true

export default BlogAuthorList
