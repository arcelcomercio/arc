import React from 'react'
import Image from '../../../../global-components/image'

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
  occupation: 'stories-author__occupation uppercase position-relative pb-10',
  title: 'stories-author__title',
  titleMain:
    'stories-author__title stories-author__title--main text-center pt-10',
}
const StoriesAuthor = ({
  data,
  dataList,
  section,
  sectionLink,
  defaultAuthorImage,
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <a
          itemProp="url"
          className={classes.sectionText}
          href={sectionLink || data.primarySectionLink}>
          {section || data.primarySection}
        </a>
      </div>
      <div className={classes.itemMain}>
        <a
          itemProp="url"
          className={classes.storyImgLink}
          href={data.authorLink}>
          <Image
            src={data.authorImage}
            placeholder={defaultAuthorImage}
            width={100}
            height={100}
            alt={data.titleMain}
            className={classes.storyImgMain}
            loading="lazy"
          />
        </a>
        <a itemProp="url" className={classes.authorMain} href={data.authorLink}>
          {data.author}
        </a>
        <div className={classes.occupation}>{data.authorOccupation}</div>
        <a itemProp="url" className={classes.titleMain} href={data.websiteLink}>
          {data.title}
        </a>
      </div>
      {dataList &&
        dataList.map((el, i) => {
          return (
            <div className={classes.item}>
              <a
                itemProp="url"
                className={classes.storyImgLink}
                href={el.authorLink}>
                <Image
                  uid={`${el.author}${i}`}
                  src={el.authorImage}
                  placeholder={defaultAuthorImage}
                  width={65}
                  height={65}
                  alt={el.title}
                  className={classes.storyImg}
                  loading="lazy"
                />
              </a>
              <div className={classes.itemBox}>
                <a
                  itemProp="url"
                  className={classes.author}
                  href={el.authorLink}>
                  {el.author}
                </a>
                <a
                  itemProp="url"
                  className={classes.title}
                  href={el.websiteLink}>
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
