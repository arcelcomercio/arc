import { useContent, useEditableContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import BreakingNewsFeatLite from './lite'

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

const BreakingNewsFeat = (props) => {
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

  const { arcSite, metaValue } = useAppContext()
  const { editableField } = useEditableContent()

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

  if (metaValue('section_style') === 'landing-v2-home') {
    return <BreakingNewsFeatLite customFields={props.customFields} />
  }

  return (
    <>
      {showBreakingNews ? (
        <>
          <div
            id="breaking-news"
            className={`
            breaking-news--bg${backgroundColor} 
          ${classes.breakingnews}
          `}>
            <h2 itemProp="name" className={classes.text}>
              {showIcon ? (
                <>
                  <span className={classes.envivoborder} />
                  <span className={classes.envivo} />
                </>
              ) : null}
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
                  // href={`${objContent.link}${
                  //   objContent.link.includes('?')
                  //     ? '&ref=article&source=cintillo'
                  //     : '?ref=article&source=cintillo'
                  // }`}
                  href={objContent.link} // Eliminado query strings por motivos de SEO
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
              <i className={classes.icon} aria-hidden="true" />
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
