import React from 'react'

const classes = {
  title: `text-center position-relative font-bold text-xl line-h-xs pt-10 pb-10 mt-15`,
  subtitle: 'text-center text-black font-bold  title-lg line-h-xs pb-20',
  titleConfirmation: 'newsletter__title--confirmation',
  description: 'newsletter__description secondary-font title-sm line-h-md',
  row: 'newsletter__row mb-20',
  textCenter: 'text-center',
  button: 'newsletter__button bg-gray-300 font-bold w-full border-0 text-white',
  strong: 'newsletter__strong block font-xbold text-gray-300',
}

const StaticsNewsletterChildConfirmation = () => {
  return (
    <>
      <p className={classes.textCenter}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          viewBox="0 0 48 24.33">
          <path
            id="Trazado_79132"
            data-name="Trazado 79132"
            d="M47.16,24.31h.1l.05,0,0,0,0,0,.05,0,0,0,0,0,0,0,0,0,.06-.06h0l0-.07,0,0,0,0,0-.05,0,0a.17.17,0,0,1,0-.05l0,0,0-.05a.17.17,0,0,1,0-.05.11.11,0,0,1,0-.05s0,0,0,0,0,0,0-.06v-.05s0-.06,0-.1V1a1,1,0,0,0-1-1h-33l0,0h0l-.05,0,0,0-.05,0,0,0,0,0,0,0-.05,0,0,0,0,0s0,0,0,0l0,0h0l0,0,0,0,0,0,0,0,0,0a.08.08,0,0,0,0,0l0,.05a.08.08,0,0,0,0,0,.06.06,0,0,0,0,0s0,0,0,.05a.07.07,0,0,1,0,0v6.6a1,1,0,0,0,2.08,0h0V3.35l9.25,8.2-.14.11-9.11,9.12V13.94a1,1,0,0,0-2.08,0v1.27H7.76a1,1,0,0,0,0,2.08h5.38v6a1,1,0,0,0,1,1H47.11Zm-1.24-3.53L36.8,11.67l0,0,6.86-5.82a1,1,0,1,0-1.35-1.58h0L30.58,14.18,16.91,2.08h29v18.7ZM25.8,13.13a1.08,1.08,0,0,0,.18-.24l3.9,3.45a1,1,0,0,0,1.36,0l4-3.37a.44.44,0,0,0,.12.15l9.12,9.12H16.68Z"
          />
          <path
            id="Trazado_79133"
            data-name="Trazado 79133"
            d="M1,11.86H18.62a1,1,0,0,0,0-2.09H1a1,1,0,0,0,0,2.09Z"
          />
          <path
            id="Trazado_79134"
            data-name="Trazado 79134"
            d="M2.86,6.12h7.9a1,1,0,0,0,0-2.08H2.86a1,1,0,0,0,0,2.08Z"
          />
          <path
            id="Trazado_79135"
            data-name="Trazado 79135"
            d="M8.68,19.61H1a1,1,0,0,0,0,2.08H8.68a1,1,0,1,0,0-2.08Z"
          />
        </svg>
      </p>
      <h3
        itemProp="name"
        className={`${classes.title} ${classes.titleConfirmation}`}>
        Estás suscrito a nuestro
      </h3>
      <p className={classes.subtitle}>Boletín</p>
      <p className={classes.textCenter}>
        <svg xmlns="http://www.w3.org/2000/svg" width="60" viewBox="0 0 64 64">
          <path
            fill="#e06438"
            d="M32 0A32 32 0 1 0 64 32 32 32 0 0 0 32 0ZM48.2 25.2 30.9 42.6a2.7 2.7 0 0 1-3.8 0h0l-8.7-8.7a2.7 2.7 0 0 1 3.8-3.8L29 36.9 44.5 21.5a2.7 2.7 0 0 1 3.8 3.8Z"
          />
        </svg>
      </p>
      <p className={`${classes.title}`}>¡Recepción exitosa!</p>
    </>
  )
}

export default StaticsNewsletterChildConfirmation
