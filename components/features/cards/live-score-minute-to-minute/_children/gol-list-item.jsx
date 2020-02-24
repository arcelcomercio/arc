/* eslint-disable radix */
import React from 'react'

const classes = {
  list: 'score__gol-list flex pl-20 pr-20',
  listItem: 'score__gol-item flex mr-10',
  listName: 'score__gol-name text-gray-300 font-bold mr-5',
  listTime: 'score__gol-time text-gray-200',
}
const GolListItem = ({ goalList = [] }) => {
  return (
    <ul className={classes.list}>
      {goalList.length > 0 &&
        goalList.map(({ timeMinSec = '', scorerName, type }) => {
          const min = parseInt(timeMinSec.split(':')[0])
          const seg = parseInt(timeMinSec.split(':')[1])

          const time = `(${type !== 'G' ? type : ''} ${min}', ${seg}'')`

          return (
            <li className={classes.listItem}>
              <p className={classes.listName}>{scorerName}</p>
              <span className={classes.listTime}>{time}</span>
            </li>
          )
        })}
    </ul>
  )
}

export default GolListItem
