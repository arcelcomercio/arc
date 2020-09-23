import React from 'react'

const classes = {
  author: 'story-content__author flex justify-between',
  authorNameLink:
    'secondary-font font-bold story-content__author-link header__link text-lg text-gray-200 line-h-sm',
  authorDate:
    'story-content__date flex items-center secondary-font text-md text-gray-200 line-h-sm',
  authorEmail:
    'story-content__author-email secondary-font text-md text-gray-200 line-h-sm',
  authorImag: 'story-content__author-img',
  emailLink: 'story-contents__link',
}

const StorySocialChildAuthor = ({
  authorImage,
  author,
  authorLink,
  primarySection,
  authorEmail,
}) => {
  return (
    <>
      {primarySection === 'Columnistas' && (
        <div className={classes.author}>
          <div className={classes.authorImag}>
            <img src={authorImage} alt={author} />
          </div>
          <div>
            {author && (
              <a
                itemProp="url"
                href={authorLink}
                className={classes.authorNameLink}>
                {author}
              </a>
            )}
            {authorEmail && true && (
              <p itemProp="description" className={classes.authorEmail}>
                <a className={classes.authorEmail} href={`mailto:${authorEmail}`}>
                  {authorEmail}
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default StorySocialChildAuthor
