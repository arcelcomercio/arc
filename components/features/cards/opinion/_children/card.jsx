import React from 'react'

const classes = {
  opinion: 'opinion-card bg-white grid pr-10 pl-10',
  head: `opinion-card__head grid items-center border-t-1 border-solid border-gray`,
  title: 'opinion-card__title text-center m-0 title-md',
  oneline: 'opinion-card__oneline',
  twoline: 'opinion-card__twoline',
  threeline: 'opinion-card__threeline',
  body: 'opinion-card__body grid',
  item: 'opinion-card__item grid pt-10 border-t-1 border-solid border-gray',
  section: 'opinion-card__section grid items-center',
  imageContainer: `opinion-card__image-container grid items-center justify-center`,
  image: 'opinion-card__image m-0 mx-auto',
  name: 'opinion-card__section-name',
  nameLink: 'opinion-card__name-link text-xl',
  storyTitle: 'opinion-card__story-title text-xs text-left overflow-hidden',
  titleLink: 'opinion-card__title-link text-black',
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
        {/* // TODO: Se puede reducir un nodo. */}
        <div className={`${classes.storyTitle} ${linesNumber}`}>
          <h2>
            <a className={classes.titleLink} href={urlNew}>
              {title}
            </a>
          </h2>
        </div>
      </div>
      <figure className={classes.imageContainer}>
        <img className={classes.image} src={urlImg} alt={title} title={title}  />
      </figure>
    </div>
  )
}

const OpinionChildCard = ({ titleOpinion, dataList, arcSite }) => {
  let linesNumber = 'type'
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
