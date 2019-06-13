import React from 'react'

const classes = {
  opinion: 'opinion-card grid pr-10 pl-10',
  head: 'opinion-card__head grid item-center',
  title: 'opinion-card__title text-center m-0 text-xl',
  oneline: 'opinion-card__oneline',
  twoline: 'opinion-card__twoline',
  threeline: 'opinion-card__threeline',
  body: 'opinion-card__body grid',
  item: 'opinion-card__item pt-10',
  section: 'opinion-card__section grid item-center',
  imageContainer:
    'opinion-card__image-container grid item-center justify-center',
  image: 'opinion-card__image m-0 mx-auto',
  name: 'opinion-card__section-name',
  nameLink: 'opinion-card__name-link',
  storyTitle: 'opinion-card__story-title text-left overflow-hidden',
  titleLink: 'opinion-card__title-link',
  orange: 'text_orange',
}

const OpinionItem = ({
  title,
  urlImg,
  urlNew,
  sectionName,
  urlSection,
  linesNumber,
}) => {
  return (
    <div className={classes.item}>
      <div className={classes.section}>
        <h3 className={classes.name}>
          <a className={classes.nameLink} href={urlSection}>
            {sectionName}
          </a>
        </h3>
        <div className={`${classes.storyTitle} ${linesNumber}`}>
          <h2>
            <a className={classes.titleLink} href={urlNew}>
              {title}
            </a>
          </h2>
        </div>
      </div>
      <div className={classes.imageContainer}>
        <img
          className={classes.image}
          data-type="src"
          src={urlImg}
          data-src={urlImg}
          alt=""
        />
      </div>
    </div>
  )
}

const OpinionChildCard = ({ titleOpinion, dataList, arcSite }) => {
  let linesNumber = ''
  switch (arcSite) {
    case 'elcomercio':
      linesNumber = classes.twoline
      break
    case 'depor':
      linesNumber = classes.threeline
      break
    default:
      linesNumber = classes.twoline
      break
  }

  const keysList = [
    'item001',
    'item0023',
    'item043',
    'item061',
    'item254',
    'item346',
  ]

  return (
    <div className={classes.opinion}>
      <div className={classes.head}>
        <h3 className={classes.title}>{titleOpinion}</h3>
      </div>
      <div className={classes.body}>
        {dataList.map((data, index) => {
          return data.urlSection !== '' ? (
            <OpinionItem
              key={keysList[index]}
              title={data.title}
              linesNumber={linesNumber}
              urlImg={data.urlImg}
              urlNew={data.urlNew}
              sectionName={data.sectionName}
              urlSection={data.urlSection}
            />
          ) : null
        })}
      </div>
    </div>
  )
}

export default OpinionChildCard
