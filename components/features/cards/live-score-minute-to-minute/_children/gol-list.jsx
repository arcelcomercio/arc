/* eslint-disable radix */
import React from 'react'

const classes = {
  list: 'score__gol-list flex ',
  listItem: 'score__gol-item flex mr-10',
  listName: 'score__gol-name text-gray-300 font-bold mr-5',
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
            <li className={classes.listItem}>
              <p className={classes.listName}>{scorerName}</p>{' '}
              <span>{time}</span>
            </li>
          )
        })}
    </ul>
  )
}

export default GolList
