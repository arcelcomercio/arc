import React from 'react'

const classes = {
  container:
    'story-google-news__container flex justify-center items-center m-15 mr-20 ml-20',
  link: 'story-google-news__link m-25 mr-20 ml-20',
  letter: 'story-google-news__letter',
}

const URL_GOOGLE_NEWS =
  'https://news.google.com/publications/CAAqBggKMJGkIDCp0wM?hl=es-419&gl=PE&ceid=PE%3Aes-419'

function GoogleNews() {
  return (
    <div className={classes.container}>
      <a className={classes.link} href={URL_GOOGLE_NEWS}>
        Sigue a El Comercio en{' '}
        <span className={`${classes.letter}--color-1`}>G</span>
        <span className={`${classes.letter}--color-2`}>o</span>
        <span className={`${classes.letter}--color-3`}>o</span>
        <span className={`${classes.letter}--color-1`}>g</span>
        <span className={`${classes.letter}--color-4`}>l</span>
        <span className={`${classes.letter}--color-2`}>e</span> News
      </a>
    </div>
  )
}

export default GoogleNews
