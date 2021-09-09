import React from 'react'

const classes = {
  container: 'presidential-election-paginator',
  prev: 'presidential-election-paginator__prev',
  next: 'presidential-election-paginator__next',
  title: 'presidential-election-paginator__title',
}

const getPartidoDataFromId = (id = '', partidos = []) =>
  partidos.filter(({ id: itemId }) => itemId === id)[0] || {}

export default ({ setNewFilterPosition, filters, partidos }) => (
  <div className={classes.container}>
    <button
      type="button"
      className={classes.prev}
      onClick={() => setNewFilterPosition('prev')}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <g clipPath="url(#clip0)">
          <path
            d="M9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0Z"
            fill="black"
          />
          <path
            d="M12.5 13.5L9.03101 11.245L5.56201 8.98999L9.03101 6.73499L12.5 4.47998"
            stroke="white"
            strokeMiterlimit="10"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="18" height="18" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
    <span className={classes.title}>
      {filters?.group === 'todos_los_partidos'
        ? getPartidoDataFromId(filters?.filter, partidos)?.nombre
        : filters?.filter}
    </span>
    <button
      type="button"
      className={classes.next}
      onClick={() => setNewFilterPosition('next')}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z"
          fill="black"
        />
        <path
          d="M5.5 4.5L8.96899 6.755L12.438 9.01001L8.96899 11.265L5.5 13.52"
          stroke="white"
          strokeMiterlimit="10"
        />
      </svg>
    </button>
  </div>
)
