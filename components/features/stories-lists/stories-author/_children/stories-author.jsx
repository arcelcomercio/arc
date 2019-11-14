import React from 'react'

const classes = {
  container: 'stories-author__container flex flex-col',
  section: 'stories-author__section flex justify-center items-center uppercase',
  sectionText: 'stories-author__section-text',
  author: 'stories-author__author',
  authorMain: 'stories-author__author stories-author__author--main pb-20',
  itemMain: 'stories-author__item--main flex flex-col items-center mt-30 mb-45',
  item: 'stories-author__item flex pl-10 pr-10 pt-20 pb-20',
  itemBox: 'stories-author__item-box pl-10 flex flex-col',
  storyImg: 'stories-author__img',
  storyImgMain: 'stories-author__img stories-author__img--main',
  storyImgLink: 'stories-author__img-link',
  storyPicture: '',
  occupation: 'stories-author__occupation uppercase position-relative pb-10',
  title: 'stories-author__title',
  titleMain:
    'stories-author__title stories-author__title--main text-center pt-10',
}
const StoriesAuthor = ({ data, dataList, isAdmin, section, sectionLink }) => {
  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <a className={classes.sectionText} href={sectionLink || data.primarySectionLink}>
          {section || data.primarySection}
        </a>
      </div>
      <div className={classes.itemMain}>
        <a className={classes.storyImgLink} href={data.authorLink}>
          <picture className={classes.storyPicture}>
            <source
              className={isAdmin ? '' : 'lazy'}
              media="(max-width: 639px)"
              type="image/jpeg"
              srcSet={isAdmin ? data.authorImage : data.multimediaLazyDefault}
              data-srcset={data.authorImage}
            />
            <img
              className={`${isAdmin ? '' : 'lazy'} ${classes.storyImgMain}`}
              data-src={data.authorImage}
              src={isAdmin ? data.authorImage : data.multimediaLazyDefault}
              alt={data.title}
            />
          </picture>
        </a>
        <a className={classes.authorMain} href={data.authorLink}>
          {data.author}
        </a>
        <div className={classes.occupation}>{data.authorOccupation}</div>
        <a className={classes.titleMain} href={data.websiteLink}>
          {data.title}
        </a>
      </div>
      {dataList &&
        dataList.map(el => {
          return (
            <div className={classes.item}>
              <a className={classes.storyImgLink} href={el.authorLink}>
                <picture className={classes.storyPicture}>
                  <source
                    className={isAdmin ? '' : 'lazy'}
                    media="(max-width: 639px)"
                    type="image/jpeg"
                    srcSet={isAdmin ? el.authorImage : el.multimediaLazyDefault}
                    data-srcset={el.authorImage}
                  />
                  <img
                    className={`${isAdmin ? '' : 'lazy'} ${classes.storyImg}`}
                    data-src={el.authorImage}
                    src={isAdmin ? el.authorImage : el.multimediaLazyDefault}
                    alt={el.title}                    
                  />
                </picture>
              </a>
              <div className={classes.itemBox}>
                <a className={classes.author} href={el.authorLink}>
                  {el.author}
                </a>
                <a className={classes.title} href={el.websiteLink}>
                  {el.title}
                </a>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default StoriesAuthor
