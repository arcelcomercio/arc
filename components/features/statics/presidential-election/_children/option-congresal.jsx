import React from 'react'

const classes = {
  container: 'option-congresal',
  option: 'option-congresal__option',
}
export default ({ filters, changeFilters }) => {
  let titleLeft = 'Valla Electoral (%)'
  let keyLeft = 'valla_electoral'
  let isLeftActive = filters?.filter === keyLeft || !filters?.filter

  let titleRight = 'Por candidatos'
  let keyRight = 'por_candidatos'
  let isRightActive = filters?.filter === keyRight

  if (filters?.group !== 'general') {
    titleLeft = 'Congresistas'
    keyLeft = 'congresistas'
    isLeftActive = filters?.subFilter === keyLeft || !filters?.subFilter

    titleRight = 'Porcentaje'
    keyRight = 'porcentaje'
    isRightActive = filters?.subFilter === keyRight
  }

  return (
    <div className={classes.container}>
      <button
        type="button"
        onClick={() =>
          changeFilters(
            filters?.group === 'general'
              ? { ...filters, filter: keyLeft }
              : { ...filters, subFilter: keyLeft }
          )}
        className={`${classes.option} ${isLeftActive ? 'active' : ''}`}>
        {titleLeft}
      </button>
      <button
        type="button"
        onClick={() =>
          changeFilters(
            filters?.group === 'general'
              ? { ...filters, filter: keyRight }
              : { ...filters, subFilter: keyRight }
          )}
        className={`${classes.option} ${isRightActive ? 'active' : ''}`}>
        {titleRight}
      </button>
    </div>
  )
}
