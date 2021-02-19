import React from 'react'

const classes = {
  container: 'covid-question-list__container flex flex-col',
  title: 'covid-question-list__title',
  box: 'covid-question-list__box',
  item: 'covid-question-list__item flex',
  question: 'covid-question-list__question',
  iconRight: 'covid-question-list__icon--right',
  btnHome: 'covid-question-list__btn--home',
}

const CovidChildQuestionList = () => {
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Más Información</h2>
      <div className={classes.box}>
        {[1, 2, 3, 4, 5, 6].map(() => {
          return (
            <a href="/" className={classes.item}>
              <span className={classes.question}>
                ¿Cómo han ido llegando las vacunas mensuales a Lima?
              </span>
              <svg
                className={classes.iconRight}
                xmlns="http://www.w3.org/2000/svg"
                width="7.678"
                height="12.686"
                viewBox="0 0 7.678 12.686">
                <path
                  d="M12,6.343,6.737,11.508l1.2,1.178,6.475-6.343L7.94,0l-1.2,1.178Z"
                  transform="translate(-6.737)"
                />
              </svg>
            </a>
          )
        })}
      </div>
      <a className={classes.btnHome} href="/mas-informacion">
        Inicio
      </a>
    </div>
  )
}

export default CovidChildQuestionList
