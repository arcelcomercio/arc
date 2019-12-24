import React from 'react'

const classes = {
  authorTitle: 'story-author-title bg-white flex justify-between pt-15 pb-15',
  title: `story-author-title__box-title flex flex-grow-0 flex-shrink-0 flex-col h-full pt-10 pb-10 pl-15 border-b-1 border-t-1 border-solid border-gray md:flex-row md:items-center md:pl-15 md:p-0`,
  section: `story-author-title__section position-relative flex-grow-0 flex-shrink-0 border-b-1 border-t-1 border-solid border-gray line-h-none title-xs md:flex-shrink md:pt-10 md:mt-10 md:font-bold md:flex-grow`,
  url: 'story-author-title__url mr-15 title-sm line-h-xs mb-5',
  name: 'flex items-center text-xl',
  img: `story-author-title__img title-md bottom-0 right-0 position-absolute h-full w-full object-contain border-0 md:w-auto`,
}

const StoryAuthorTitleChildAuthorTitle = ({ name, url, urlImage }) => {
  return (
    <div className={classes.authorTitle}>
      <div className={classes.title}>
        <a href={url} className={classes.url}>
          {name}
        </a>
      </div>
      <div className={classes.section}>
        <img
          src={urlImage}
          alt={`Foto del autor: ${name}`}
          className={classes.img}
        />
      </div>
    </div>
  )
}

export default StoryAuthorTitleChildAuthorTitle
