/* eslint-disable radix */
import React from 'react'

const classes = {
  golBox: 'score__gol-box flex flex-row-reverse pl-20 pr-20',
  list: 'score__gol-list flex pl-20 pr-20 flex-wrap justify-end items-center',
  listItem: 'score__gol-item flex flex-wrap mr-10',
  listName: 'score__gol-name text-gray-300 font-bold mr-5',
  listTime: 'score__gol-time text-gray-200',
  golImg: 'score__gol-img object-cover block',
}
const GolListItem = ({ homeTeam = true, goalList = [] }) => {
  return (
    <div className={classes.golBox}>
      {homeTeam && <img src="" alt="" className={classes.golImg} />}
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
      {homeTeam === false && <img src="" alt="" className={classes.golImg} />}
    </div>
  )
}

export default GolListItem
