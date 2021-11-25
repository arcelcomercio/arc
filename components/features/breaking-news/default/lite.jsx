/* eslint-disable react/no-unused-state */
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'

const classes = {
  breakingnews: `b-news f`,
  close: 'b-news__close',
  icon: 'b-news__icon',
  link: 'b-news__link',
  tag: 'b-news__tag',
  hint: 'b-news__tag b-news__hint',
  title: 'b-news__title',
  envivo: 'b-news__envivo',
  envivoborder: 'b-news__envivo-border',
}

/* requestIdle(function() {document.getElementById('close-breaking-news').addEventListener('click', () => {
  document.getElementById('breaking-news').remove()
})}) */
const handleClose = `"use strict";requestIdle(function(){document.getElementById("close-breaking-news").addEventListener("click",function(){document.getElementById("breaking-news").remove()})});`

const BreakingNewsFeat = (props) => {
  const {
    customFields: {
      title,
      subTitle,
      showBreakingNews,
      storyLink = '',
      tags = 'Lo último:',
      backgroundColor = 'color-1',
      showIcon = '',
      hint = '',
    },
  } = props

  const { arcSite, metaValue } = useAppContext()

  const isStory = /^\/.*\/.*-noticia/.test(storyLink)

  const article = useContent(
    storyLink && !storyLink.includes('?') && isStory
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
      {showBreakingNews ? (
        <>
          <div
            id="breaking-news"
            className={`
            b-news--${backgroundColor} 
          ${classes.breakingnews}
          `}>
            <h2 itemProp="name">
              <a
                itemProp="url"
                className={classes.link}
                // href={`${objContent.link}${
                //   objContent.link.includes('?')
                //     ? '&ref=article&source=cintillo'
                //     : '?ref=article&source=cintillo'
                // }`}
                href={objContent.link} // Eliminado query strings por motivos de SEO
                rel="noopener noreferrer">
                {showIcon ? (
                  <>
                    <span className={classes.envivoborder} />
                    <span className={classes.envivo} />
                  </>
                ) : null}
                <span className={classes.tag}>{tags}</span>
                {metaValue('section_style') === 'story-v2-standard' && (
                  <span className={classes.hint}>{hint}</span>
                )}
                <span className={classes.title}>{objContent.title}</span>
              </a>
            </h2>
            <button
              id="close-breaking-news"
              type="button"
              className={classes.close}
              tabIndex={0}>
              <svg
                className={classes.icon}
                width="46"
                height="46"
                viewBox="0 0 46 46">
                <path d="M23 3C11.9 3 2.9 12 2.9 23.1 2.9 34.2 11.9 43.2 23 43.2 34.1 43.2 43.1 34.2 43.1 23.1 43.1 12 34.1 3 23 3ZM32.7 29.9C32.9 30 32.9 30.2 32.9 30.4 32.9 30.6 32.9 30.8 32.7 30.9L30.8 32.8C30.6 33 30.5 33 30.3 33 30.1 33 29.9 33 29.8 32.8L23 26 16.2 32.8C16.1 33 15.9 33 15.7 33 15.5 33 15.4 33 15.2 32.8L13.3 30.9C13.1 30.8 13.1 30.6 13.1 30.4 13.1 30.2 13.1 30 13.3 29.9L20.1 23.1 13.3 16.3C13 16 13 15.6 13.3 15.3L15.2 13.4C15.3 13.2 15.5 13.1 15.7 13.1 15.9 13.1 16.1 13.2 16.2 13.4L23 20.1 29.8 13.4C29.9 13.2 30.1 13.1 30.3 13.1 30.5 13.1 30.7 13.2 30.8 13.4L32.8 15.3C33 15.6 33 16 32.8 16.3L25.9 23.1ZM32.7 29.9" />
              </svg>
            </button>
          </div>
          <script dangerouslySetInnerHTML={{ __html: handleClose }} />
        </>
      ) : null}
    </>
  )
}

BreakingNewsFeat.propTypes = {
  customFields,
}

BreakingNewsFeat.label = 'Cintillo Urgente'
BreakingNewsFeat.static = true

export default BreakingNewsFeat
