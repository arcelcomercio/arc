/* eslint-disable radix */
import React from 'react'

const classes = {
  golBox: 'score__gol-box flex flex-row-reverse items-start pl-20 pr-20',
  list: 'score__gol-list flex pl-10 pr-10 flex-wrap justify-end items-center',
  listItem: 'score__gol-item flex flex-wrap mb-5 md:mr-10',
  listName: 'score__gol-name font-bold mr-5 secondary-font',
  listTime: 'score__gol-time font-bold secondary-font',
  golImg: 'score__gol-img object-cover block',
}
const GolListItem = ({ homeTeam = true, goalList = [] }) => {
  return (
    <div className={classes.golBox}>
      {homeTeam && goalList.length > 0 && (
        <img src="" alt="" className={classes.golImg} />
      )}
      <ul className={classes.list}>
        {goalList.length > 0 &&
          goalList.map(({ timeMinSec = '', scorerName, type }) => {
            const min = parseInt(timeMinSec.split(':')[0])
            // const seg = parseInt(timeMinSec.split(':')[1])

            const time = `(${type !== 'G' ? type : ''} ${min}' )`

            return (
              <li className={classes.listItem}>
                <p className={classes.listName}>{scorerName}</p>
                <span className={classes.listTime}>{time}</span>
              </li>
            )
          })}
      </ul>
      {homeTeam === false && goalList.length > 0 && (
        <img src="" alt="" className={classes.golImg} />
      )}
    </div>
  )
}

export default GolListItem
