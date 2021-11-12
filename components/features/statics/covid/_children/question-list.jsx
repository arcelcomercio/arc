import { useContent } from 'fusion:content'
import React from 'react'

const classes = {
  container: 'covid-question-list__container flex flex-col',
  title: 'covid-question-list__title',
  box: 'covid-question-list__box',
  item: 'covid-question-list__item flex',
  question: 'covid-question-list__question',
  iconRight: 'covid-question-list__icon--right',
  btnHome: 'covid-question-list__btn--home',
  average: 'covid-question-list__graph average__grafico-barras',
  embed: 'average__embed',
  titleGraph: 'average__title',
}

const CovidChildQuestionList = ({ path }) => {
  const { data = [] } =
    useContent({
      source: 'get-spreadsheet-covid',
      query: {
        title: 'Mas Informacion API',
      },
    }) || {}

  const questionList = (questionData) => {
    const dataArr = Array.from(questionData) || []
    return (
      <div className={classes.container}>
        <h2 className={classes.title}>Más Información</h2>
        <div className={classes.box}>
          {dataArr.map(({ pregunta = '', embed_chart = '' }) => (
            <a
              href={embed_chart}
              className={classes.item}
              target="_blank"
              rel="noreferrer">
              <span className={classes.question}>{pregunta}</span>
              <svg
                className={classes.iconRight}
                width="7.678"
                height="12.686"
                viewBox="0 0 7.678 12.686">
                <path
                  d="M12,6.343,6.737,11.508l1.2,1.178,6.475-6.343L7.94,0l-1.2,1.178Z"
                  transform="translate(-6.737)"
                />
              </svg>
            </a>
          ))}
        </div>
        <a className={classes.btnHome} href="/covid-19/">
          Inicio
        </a>
      </div>
    )
  }

  const graph = (questionData, slug) => {
    const dataSlug = questionData.filter((el) => el.slug === slug)
    const { titulo: title, embed_chart: urlEmbed } =
      (dataSlug && dataSlug[0]) || {}

    return (
      <section className={classes.average}>
        <div
          style={{
            right: '2px',
            'text-align': 'end',
            position: 'relative',
            top: '5px',
          }}>
          <a href="/covid-19/mas-informacion/">
            <svg width="13.979" height="13.979" viewBox="0 0 13.979 13.979">
              <g transform="translate(-314.287 -136.011)">
                <line
                  style={{ fill: '#fff', stroke: '#707070' }}
                  x2="13.272"
                  y2="13.272"
                  transform="translate(314.64 136.364)"
                />
                <line
                  style={{ fill: '#fff', stroke: '#707070' }}
                  x1="13.272"
                  y2="13.272"
                  transform="translate(314.64 136.364)"
                />
              </g>
            </svg>
          </a>
        </div>
        <h1 className={classes.titleGraph}>{title}</h1>
        <div className={classes.embed}>
          <embed
            title="Embed"
            src={urlEmbed}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen="true"
            id="embed"
            height="320"
            style={{ width: '100%' }}
          />
        </div>
      </section>
    )
  }
  return path !== '' ? graph(data, path) : questionList(data)
}

export default CovidChildQuestionList
