/* eslint-disable camelcase */
import React from 'react'
import { useAppContext } from 'fusion:context'
import { useContent } from 'fusion:content'

import StoryData from '../../../../utilities/story-data'
import { formatDayMonthYearBasic } from '../../../../utilities/date-time/dates'

const placeholderSrc = (width, height) =>
  `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`

const ImageRatioElement = ({ list = [] }) => {
  const data =
    useContent({
      source: 'photos-by-id-list',
      query: {
        idList: list.map(({ id }) => id).join(','),
      },
    }) || []

  const getSizesByRatio = ratio => {
    const sizes = {
      width: '860px',
      height: '484px',
    }
    switch (ratio) {
      case '1:1':
        sizes.width = '580px'
        sizes.height = '580px'
        break

      case '4:3':
        sizes.width = '640px'
        sizes.height = '360px'
        break

      case '2:3':
        sizes.width = '320px'
        sizes.height = '480px'
        break

      default:
        break
    }
    return sizes
  }
  return (
    <div
      className="parallax-el__ratio-cont"
      style={{ maxWidth: 'none', margin: 0 }}>
      {data.map((item, i) => (
        <div>
          <img
            style={{
              height: getSizesByRatio(list[i]?.ratio).height,
              width: getSizesByRatio(list[i]?.ratio).width,
              maxWidth: getSizesByRatio(list[i]?.ratio).width,
            }}
            className="lazy"
            data-src={item?.url}
            src={placeholderSrc(item?.width, item?.height)}
            alt={item?.caption}
          />
          <figcaption
            style={{
              maxWidth: getSizesByRatio(list[i]?.ratio).width,
              textAlign: list[i]?.ratio === '2:3' ? 'right' : 'left',
            }}>
            {item?.caption}
          </figcaption>
        </div>
      ))}
    </div>
  )
}

export default function StoryContentsChildParallaxElements({ config, id }) {
  const { block, data } = config || {}

  const { globalContent, arcSite, contextPath, deployment } = useAppContext()

  const { displayDate, authorLink, author, locality } = new StoryData({
    data: globalContent,
    contextPath,
    deployment,
    arcSite,
  })

  const displayLoc = locality === '' ? 'Lima' : locality

  return (
    <>
      {block === 'image' ? (
        <div style={{ padding: '64px 0', margin: 0, maxWidth: 'none' }}>
          <div id={id} className="parallax-image lazy-background">
            <h3>{data?.title}</h3>
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html: `[id="${id}"].visible{background-image:url("${data?.url_mobile}")}@media screen and (min-width:640px){[id="${id}"].visible{background-image:url("${data?.url}")}}`,
            }}></style>
        </div>
      ) : null}

      {block === 'author' ? (
        <div className="parallax-el__cont">
          <div className="parallax-el__author-desc">
            {data?.text_type === 'custom' ? (
              <div>{data?.text}</div>
            ) : (
              <time dateTime={displayDate}>
                {displayDate &&
                  `${displayLoc && `${displayLoc}, `} ${formatDayMonthYearBasic(
                    displayDate,
                    false,
                    true
                  )}`}
              </time>
            )}
          </div>
          <a
            className="parallax-el__author"
            href={data?.author_type === 'custom' ? data?.url : authorLink}>
            {data?.author_type === 'custom' ? data?.name : author}
          </a>
        </div>
      ) : null}

      {block === 'credits' ? (
        <div style={{ padding: '40px 0' }}>
          <div className="parallax-el__credits">
            <h5 className="parallax-el__credits-title">Créditos</h5>
            <div
              className="parallax-el__credits-text"
              dangerouslySetInnerHTML={{
                __html: data?.html,
              }}></div>
          </div>
        </div>
      ) : null}

      {block === 'image_ratio' ? <ImageRatioElement list={data} /> : null}
    </>
  )
}
