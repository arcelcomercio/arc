import React from 'react'
import Content from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import { defaultImage } from '../../../../utilities/helpers'
import {
  includeCredits,
  includePromoItems,
} from '../../../../utilities/included-fields'

const getMultimediaIcon = multimediaType => {
  let icon = ''
  switch (multimediaType) {
    case 'basic_video':
      icon = 'icon-video'
      break
    case 'basic_gallery':
      icon = 'icon-img'
      break
    default:
      return ''
  }
  return icon
}

const ChildrenSectionColumn = ({
  sectionName,
  sectionUrl,
  contentElements = [],
}) => (
  <div className="stories-l-section bg-white flex flex-col">
    <div className="stories-l-header flex items-center w-auto pr-20 pl-20 stories-l-section__header-font-position bg-info">
      <a
        href={sectionUrl}
        className="stories-l-header__title flex items-center full-height">
        <h4 className="uppercase font-bold stories-l-section__header-font-color">
          {sectionName}
        </h4>
      </a>
    </div>

    <div
      role="list"
      className="stories-l-card__list bg-white overflow-y-auto h-full">
      {contentElements.map(
        (
          { title, storyUrl, authorName, authorUrl, imageUrl, multimediaType },
          i
        ) => (
          <article
            role="listitem"
            className="stories-l-item flex flex-col w-auto pt-10 pb-10"
            key={storyUrl}>
            {i === 0 && (
              <figure className="position-relative mb-10 overflow-hidden">
                {getMultimediaIcon(multimediaType) && (
                  <i
                    className={`${getMultimediaIcon(
                      multimediaType
                    )} position-absolute text-center multimedia__icon mx-auto rounded text-gray-100`}
                  />
                )}
                {imageUrl && (
                  <a href={storyUrl}>
                    <picture>
                      <img
                        className="stories-l-card__image w-full object-center object-cover"
                        src={imageUrl}
                        alt={title}
                      />
                    </picture>
                  </a>
                )}
              </figure>
            )}
            <div className="stories-l-item__information pr-20 pl-20">
              <div className="stories-l-item__link-box flex flex-col text-gray-300 border-b-1 border-dashed border-gray pb-10">
                <a href={storyUrl}>
                  <h3 className="stories-l-item__link mb-15 text-gray-300 line-h-sm font-bold overflow-hidden">
                    {title}
                  </h3>
                </a>
                <span>
                  <a
                    className="stories-l-item__autor text-gray-200"
                    href={authorUrl}>
                    {authorName}
                  </a>
                </span>
              </div>
            </div>
          </article>
        )
      )}
    </div>
  </div>
)

const getMultimediaType = ({ basicVideoUrl, basicGalleryUrl }) => {
  if (basicVideoUrl) return 'basic_video'
  if (basicGalleryUrl) return 'basic_gallery'
  return 'basic'
}

const formatContent = ({
  section,
  content,
  arcSite,
  deployment,
  contextPath,
}) => {
  const { content_elements: contentElements = [], section_name: sectionName } =
    content || {}
  const [
    {
      taxonomy: {
        primary_section: {
          path: primarySectionPath,
          name: primarySectionName,
        } = {},
      } = {},
    } = {},
  ] = contentElements || []
  return {
    sectionName: sectionName || primarySectionName,
    sectionUrl: `${section || primarySectionPath}/`,
    // CR: desde un tiempo para aca prefiero validar arregls con .length > 0
    contentElements: contentElements.map(
      ({
        headlines: { basic } = {},
        websites: { [arcSite]: { website_url: websiteUrl } = {} } = {},
        credits: { by: [{ name, url } = {}] = [] } = {},
        promo_items: {
          basic: { resized_urls: { mobile: basicUrl } = {} } = {},
          basic_video: {
            promo_items: {
              basic: { resized_urls: { mobile: basicVideoUrl } = {} } = {},
            } = {},
          } = {},
          basic_gallery: {
            promo_items: {
              basic: { resized_urls: { mobile: basicGalleryUrl } = {} } = {},
            } = {},
          } = {},
        } = {},
      }) => ({
        title: basic,
        storyUrl: websiteUrl,
        authorName: name,
        authorUrl: url,
        imageUrl:
          basicVideoUrl ||
          basicGalleryUrl ||
          basicUrl ||
          defaultImage({ deployment, contextPath, arcSite, size: 'md' }),
        multimediaType: getMultimediaType({
          basicVideoUrl,
          basicGalleryUrl,
        }),
      })
    ),
  }
}

export default ({ section = '' }) => {
  const { arcSite, deployment, contextPath } = useFusionContext()
  return (
    <Content
      {...{
        contentService: 'story-feed-by-section',
        contentConfigValues: {
          section,
          stories_qty: 4,
          presets: 'mobile:314x157',
          includedFields: `websites.${arcSite}.website_url,${includePromoItems},headlines.basic,${includeCredits},taxonomy.sections._id,taxonomy.sections.name`,
        },
        filter: `{
          section_name
          section_id
          content_elements {
            headlines { basic }
            websites { ${arcSite} { website_url } }
            promo_items {
              basic { resized_urls { mobile } }
              basic_video {
                promo_items {
                  basic { resized_urls { mobile } }
                }
              }
              basic_gallery {
                promo_items {
                  basic { resized_urls { mobile } }
                }
              }
              youtube_id { content }
            }
            credits { by { name url } }
            taxonomy { primary_section { name path } }
          }
        }`,
      }}>
      {content => (
        <ChildrenSectionColumn
          {...formatContent({
            section,
            content,
            arcSite,
            deployment,
            contextPath,
          })}
        />
      )}
    </Content>
  )
}
