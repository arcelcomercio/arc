import React from 'react'

const classes = {
  container: 'story-google-news__container mr-20 ml-20 mt-20 mb-20',
  link: 'story-google-news__link flex justify-center items-center',
  letterContainer: 'story-google-news__letter-container mr-5 ml-5',
  letter: 'story-google-news__letter',
}

const URL_GOOGLE_NEWS =
  'https://news.google.com/publications/CAAqBggKMJGkIDCp0wM?hl=es-419&gl=PE&ceid=PE%3Aes-419'

export default ({ url, text }) => {
  return (
    <div className={classes.container}>
      <a itemProp="url" className={classes.link} href={url || URL_GOOGLE_NEWS}>
        {text !== '' ? text : 'Sigue a El Comercio en'}
        <p itemProp="description" className={classes.letterContainer}>
          <span className={`${classes.letter}--color-1`}>G</span>
          <span className={`${classes.letter}--color-2`}>o</span>
          <span className={`${classes.letter}--color-3`}>o</span>
          <span className={`${classes.letter}--color-1`}>g</span>
          <span className={`${classes.letter}--color-4`}>l</span>
          <span className={`${classes.letter}--color-2`}>e</span>
        </p>
        News
      </a>
    </div>
  )
}
