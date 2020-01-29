/* eslint-disable react/no-unused-state */
import React, { useState } from 'react'
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
}

const BreakingNews = props => {
  const {
    customFields: {
      title,
      subTitle,
      showBreakingNews,
      storyLink = '',
      tags = 'Lo último',
      backgroundColor = 'breaking-news--bgcolor-1',
    },
  } = props

  const { arcSite } = useFusionContext()
  const { editableField } = useEditableContent()
  const [isVisible, setIsVisible] = useState(true)

  const article = useContent({
    source: 'story-by-url',
    query: {
      website_url: storyLink,
      website: arcSite,
    },
    filter: schemaFilter,
  })

  const handleOnclickClose = () => {
    setIsVisible(false)
  }

  const objContent = {
    title: title || (article && article.headlines && article.headlines.basic),
    subTitle:
      subTitle ||
      (article && article.subheadlines && article.subheadlines.basic),
    link: storyLink,
  }

  return (
    <>
      {showBreakingNews && (
        <div
          className={`${isVisible ? '' : 'hidden'}
          ${backgroundColor} 
          ${classes.breakingnews}
          `}>
          <h2 className={classes.text}>
            <span
              className={classes.tag}
              {...editableField('tags')}
              suppressContentEditableWarning>
              {tags}
            </span>
            <span>
              <a
                className={classes.link}
                href={objContent.link}
                rel="noopener noreferrer"
                {...editableField('title')}
                suppressContentEditableWarning>
                {objContent.title}
              </a>
            </span>
          </h2>
          <button
            type="button"
            className={classes.close}
            onClick={handleOnclickClose}
            onKeyPress={handleOnclickClose}
            tabIndex={0}>
            <i className={classes.icon} />
          </button>
        </div>
      )}
    </>
  )
}

BreakingNews.propTypes = {
  customFields,
}

BreakingNews.label = 'Cintillo Urgente'

export default BreakingNews
