import React from 'react'

const classes = {
  doblete: 'doblete bg-white p-10 flex flex-col justify-between',
  title: 'doblete__title text-gray-300 mt-5 font-bold block title-sm',
  author: 'doblete__author pl-5 mt-20 block text-gray-200 text-sm',
  boxIcon:
    'doblete__box-icon flex items-center mt-10 pt-10 pb-10 pl-5 pr-5 position-relative',
  sectionSmall: 'doblete__section-small',
}

export default ({
  websiteLink,
  title,
  author,
  authorLink,
  primarySection,
  primarySectionLink,
}) => {
  return (
    <div className={classes.doblete}>
      <h2>
        <a className={classes.title} href={websiteLink}>
          {title}
        </a>
      </h2>
      <div>
        <h6>
          <a className={classes.author} href={authorLink}>
            {author}
          </a>
        </h6>
        <div className={classes.boxIcon}>
          <p>
            <a className={classes.sectionSmall} href={primarySectionLink}>
              {primarySection}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
