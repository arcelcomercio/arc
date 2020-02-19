/* eslint-disable radix */
import React from 'react'

const classes = {
  list: 'flex flex-row',
}
const GolList = ({ goalList = [] }) => {
  return (
    <ul className={classes.list}>
      {goalList.length > 0 &&
        goalList.map(({ timeMinSec = '', scorerName, type }) => {
          const min = parseInt(timeMinSec.split(':')[0])
          const seg = parseInt(timeMinSec.split(':')[1])

          const time = `(${type !== 'G' ? type : ''} ${min}', ${seg}'')`

          return (
            <li>
              {scorerName} <span>{time}</span>
            </li>
          )
        })}
    </ul>
  )
}

export default GolList
