/* eslint-disable react/no-unused-state */
import React from 'react'
import { useContent, useEditableContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'

const classes = {
  breakingnews: `breaking-news secondary-font flex justify-between mt-20 md:mt-0 pt-15 pb-15 pl-20 pr-20 text-white`,
  close: 'breaking-news__btn-close text-right text-white',
  icon: 'breaking-news__btn-icon icon-close-circle title-sm text-white',
  text: 'breaking-news__text m-0 title-xs line-h-xs items-center',
  tag: 'breaking-news__tag uppercase mr-5 font-bold',
  link: 'breaking-news__link mr-5 text-white font-bold',
  envivo: 'breaking-news__envivo',
  envivoborder: 'breaking-news__envivo-border',
}

/* requestIdle(() => {
  document.getElementById('close-breaking-news').addEventListener('click', () => {
    document.getElementById('breaking-news').remove()
  })
}) */
const handleClose = `"use strict";requestIdle(function(){document.getElementById("close-breaking-news").addEventListener("click",function(){document.getElementById("breaking-news").remove()})});`

const BreakingNewsFeat = props => {
  const {
    customFields: {
      title,
      subTitle,
      showBreakingNews,
      storyLink = '',
      tags = 'Lo último',
      backgroundColor = 'color-1',
      showIcon = '',
    },
  } = props

  const { arcSite, outputType } = useFusionContext()
  const { editableField } = useEditableContent()

  const article = useContent(
    storyLink
      ? {
          source: 'story-by-url',
          query: {
            website_url: storyLink,
            website: arcSite,
            presets: 'no-presets',
            includedFields: `headlines.basic,subheadlines.basic,website,website_url`,
          },
          filter: schemaFilter,
        }
      : {}
  )

  const objContent = {
    title: title || (article && article.headlines && article.headlines.basic),
    subTitle:
      subTitle ||
      (article && article.subheadlines && article.subheadlines.basic),
    link: storyLink,
  }

  return (
    <>
      {showBreakingNews && outputType !== 'amp' && (
        <>
          <div
            id="breaking-news"
            className={`
            breaking-news--bg${backgroundColor} 
          ${classes.breakingnews}
          `}>
            <h2 itemProp="name" className={classes.text}>
              {showIcon && (
                <>
                  <span className={classes.envivoborder}></span>
                  <span className={classes.envivo}></span>
                </>
              )}
              <span
                className={classes.tag}
                {...editableField('tags')}
                suppressContentEditableWarning>
                {tags}
              </span>
              <span>
                <a
                  itemProp="url"
                  className={classes.link}
                  href={`${objContent.link}?ref=article&source=cintillo`}
                  rel="noopener noreferrer"
                  {...editableField('title')}
                  suppressContentEditableWarning>
                  {objContent.title}
                </a>
              </span>
            </h2>
            <button
              id="close-breaking-news"
              type="button"
              className={classes.close}
              tabIndex={0}
              aria-label="Ocultar noticia urgente">
              {outputType === 'lite' ? (
                <svg width="40.2" height="40.2" viewBox="0 0 40.2 40.2">
                  <g transform="translate(-335 -854)">
                    <path
                      d="M23,3A20.1,20.1,0,1,0,43.1,23.1,20.1,20.1,0,0,0,23,3Zm9.7,26.9c.2.1.2.3.2.5s0,.4-.2.5l-1.9,1.9a.551.551,0,0,1-.5.2c-.2,0-.4,0-.5-.2L23,26l-6.8,6.8c-.1.2-.3.2-.5.2a.551.551,0,0,1-.5-.2l-1.9-1.9c-.2-.1-.2-.3-.2-.5s0-.4.2-.5l6.8-6.8-6.8-6.8a.668.668,0,0,1,0-1l1.9-1.9a.567.567,0,0,1,1,0L23,20.1l6.8-6.7a.567.567,0,0,1,1,0l2,1.9a.908.908,0,0,1,0,1l-6.9,6.8Zm0,0"
                      transform="translate(332.1 851)"
                    />
                  </g>
                </svg>
              ) : (
                <i className={classes.icon} aria-hidden="true" />
              )}
            </button>
          </div>
          <script dangerouslySetInnerHTML={{ __html: handleClose }}></script>
        </>
      )}
    </>
  )
}

BreakingNewsFeat.propTypes = {
  customFields,
}

BreakingNewsFeat.label = 'Cintillo Urgente - Beta'
BreakingNewsFeat.static = true

export default BreakingNewsFeat
