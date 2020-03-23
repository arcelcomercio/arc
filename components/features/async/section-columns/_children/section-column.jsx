import React from 'react'
import Content from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import { defaultImage } from '../../../../utilities/assets'
import getMultimediaIcon from '../../../../utilities/multimedia-icon'
import {
  includeCredits,
  includePromoItems,
} from '../../../../utilities/included-fields'

const ChildrenSectionColumn = ({
  sectionName,
  sectionUrl,
  contentElements = [],
}) => (
  <div className="sec-col bg-white flex flex-col">
    <div className="sec-col__header bg-info flex items-center w-auto pr-20 pl-20 mb-5">
      <a href={sectionUrl} className="flex items-center full-height">
        <h4 className="sec-col__title uppercase font-bold">{sectionName}</h4>
      </a>
    </div>

    <div role="list" className="sec-col__list bg-white h-full">
      {contentElements.map(
        (
          { title, storyUrl, authorName, authorUrl, imageUrl, multimediaType },
          i
        ) => (
          <>
            {i === 0 && (
              <a
                href={storyUrl}
                className="position-relative mb-10 overflow-hidden block">
                {getMultimediaIcon(multimediaType) && (
                  <i
                    className={`${getMultimediaIcon(
                      multimediaType
                    )} sec-col__icon m-icon position-absolute text-center mx-auto rounded text-gray-100`}
                  />
                )}
                <img
                  className="sec-col__image w-full object-center object-cover"
                  src={imageUrl}
                  alt={title}
                />
              </a>
            )}

            <article
              role="listitem"
              className="sec-col__story flex flex-col pb-10 mr-20 ml-20 mb-20 text-gray-300 border-b-1 border-dashed border-gray">
              <a href={storyUrl}>
                <h3 className="sec-col__link mb-15 text-gray-300 line-h-sm font-bold overflow-hidden">
                  {title}
                </h3>
              </a>

              <a className="sec-col__author text-gray-200" href={authorUrl}>
                {authorName}
              </a>
            </article>
          </>
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
