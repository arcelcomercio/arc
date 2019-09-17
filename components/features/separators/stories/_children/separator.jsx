import React from 'react'
import { createMarkup } from '../../../../utilities/helpers'
import Icon from '../../../../global-components/multimedia-icon'

const classes = {
  separator: `separator bg-white mt-20 w-full pt-0 pr-20 pb-15 pl-20 border-t-1 border-solid`,
  title: 'separator__header-title capitalize pb-20 pt-20 text-left text-lg',
  titleLink: 'separator__header-link font-bold',
  oneline: 'separator__oneline',
  twoline: 'separator__twoline',
  threeline: 'separator__threeline',
  body: 'separator__body mt-0 mb-0 flex justify-between',

  item: 'separator__item hidden w-full h-full p-0 position-relative',
  detail: 'separator__detail position-absolute bottom-0 pr-15 pl-15 pb-15',
  text: 'separator__title overflow-hidden text-white text-md line-h-sm',
  imgBox: 'p-0 m-0 w-full h-full overflow-hidden',
  img: 'separator__img w-full h-full object-cover object-center',
  icon: `separator__icon`,
  article: `separator__article h-full`,
}

const SeparatorsBasicChildSeparator = ({
  isThreeCol,
  htmlCode,
  titleLink,
  titleSeparator,
  stories,
  isAuthorVisible,
  isAdmin,
}) => {
  return (
    <div className={`${classes.separator}${isThreeCol ? ' col-3' : ''}`}>
      {htmlCode ? (
        <div
          className={classes.title}
          dangerouslySetInnerHTML={createMarkup(htmlCode)}
        />
      ) : (
        titleSeparator && (
          <h2 className={classes.title}>
            <a href={titleLink} className={classes.titleLink}>
              {titleSeparator}
            </a>
          </h2>
        )
      )}
      <div role="list" className={classes.body}>
        {stories.map(
          ({
            title,
            websiteLink,
            multimediaLazyDefault,
            multimediaType,
            imageUrl,
            author,
            authorLink,
            imageUrlMobile,
          }) => (
            <div className={classes.item} key={titleLink}>
              <article role="listitem" className={classes.article}>
                <Icon type={multimediaType} iconClass={classes.icon} />
                <div className={classes.detail}>
                  <a href={websiteLink} title={title}>
                    <h3 className={classes.text}>{title}</h3>
                  </a>
                  {isAuthorVisible && (
                    <h2>
                      <a
                        href={authorLink}
                        className="block text-sm uppercase text-gray-200 mt-10 mb-20">
                        {author}
                      </a>
                    </h2>
                  )}
                </div>
                <a href={websiteLink}>
                  <picture className={classes.imgBox}>
                    <source
                      className={isAdmin ? '' : 'lazy'}
                      media="(max-width: 639px)"
                      type="image/jpeg"
                      srcSet={isAdmin ? imageUrlMobile : multimediaLazyDefault}
                      data-srcset={imageUrlMobile}
                    />
                    <img
                      src={isAdmin ? imageUrl : multimediaLazyDefault}
                      data-src={imageUrl}
                      alt={title}
                      className={`${isAdmin ? '' : 'lazy'} ${classes.img}`}
                    />
                  </picture>
                </a>
              </article>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default SeparatorsBasicChildSeparator
